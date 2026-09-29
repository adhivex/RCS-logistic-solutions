"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { track } from "@vercel/analytics/server";
import { quoteCopy } from "@/content/quote";
import { CONSENT_COOKIE, parseConsent } from "@/lib/consent";
import { isProductionDeploy } from "@/lib/env";
import { getClientIp, hashIp } from "@/lib/hash";
import { sendQuoteEmails } from "@/lib/quote-email";
import { isRateLimited } from "@/lib/rate-limit";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";
import { UTM_COOKIE, parseUtmCookie } from "@/lib/utm";
import { quoteSchema, type QuoteData, type QuoteField, type QuoteFormValues } from "@/lib/validation/quote";

export type QuoteResult =
  { ok: true } | { ok: false; fieldErrors?: Partial<Record<QuoteField, string>>; formError?: string };

/**
 * docs/05-data-and-api.md → Submission:
 * honeypot → validate → rate limit → insert → emails (non-fatal) → analytics → ok.
 * The client then redirects to /thank-you. Never throws to the client.
 *
 * Local mode (CLAUDE.md): without Supabase credentials the request is validated and
 * logged to the server console, and the visitor still reaches /thank-you. Not on
 * the Vercel production deployment, where a lead must never be silently dropped.
 */
export async function submitQuote(values: QuoteFormValues, sourcePage?: string): Promise<QuoteResult> {
  try {
    // Honeypot filled: pretend success, store nothing.
    if (values.website) return { ok: true };

    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<QuoteField, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as QuoteField;
        fieldErrors[key] ??= issue.message;
      }
      return { ok: false, fieldErrors };
    }
    const data = parsed.data;
    const page = sourcePage?.slice(0, 200);
    const cookieStore = await cookies();

    if (!isSupabaseConfigured()) {
      if (isProductionDeploy) throw new Error("Supabase is not configured on production");
      const id = `local-${randomUUID()}`;
      console.info(`[local mode] Quote request not stored (no Supabase env) — ${id}`, { ...data, sourcePage: page });
      await sendQuoteEmails(data, { id, sourcePage: page });
      return { ok: true };
    }

    const db = getSupabaseAdmin();
    const ipHash = hashIp(await getClientIp());
    if (await isRateLimited(db, ipHash)) {
      return { ok: false, formError: quoteCopy.errors.rateLimited };
    }

    const utm = parseUtmCookie(cookieStore.get(UTM_COOKIE)?.value);
    const { data: row, error } = await db
      .from("quote_requests")
      .insert(toRow(data, { sourcePage: page, ipHash, utm }))
      .select("id")
      .single();
    if (error) throw new Error(`Insert failed: ${error.message}`);

    // Don't fail the submission if email fails — log it and keep email_sent = false.
    try {
      if (await sendQuoteEmails(data, { id: row.id, sourcePage: page })) {
        const { error: updateError } = await db.from("quote_requests").update({ email_sent: true }).eq("id", row.id);
        if (updateError) console.error(`Quote ${row.id}: email_sent update failed`, updateError);
      }
    } catch (emailError) {
      console.error(`Quote ${row.id}: email failed`, emailError);
    }

    // Server-side analytics event only with analytics consent (docs/09-cookie-consent.md).
    if (parseConsent(cookieStore.get(CONSENT_COOKIE)?.value)?.analytics) {
      try {
        await track("quote_submitted", { service: data.service, customer: data.customerType });
      } catch (analyticsError) {
        console.error("Analytics event failed", analyticsError);
      }
    }

    return { ok: true };
  } catch (error) {
    // Database outage, missing production env, etc.
    console.error("submitQuote failed", error);
    return { ok: false, formError: quoteCopy.errors.unavailable };
  }
}

function toRow(
  data: QuoteData,
  meta: { sourcePage?: string; ipHash: string; utm: ReturnType<typeof parseUtmCookie> },
) {
  return {
    customer_type: data.customerType,
    name: data.name,
    company: data.company ?? null,
    phone: data.phone,
    email: data.email ?? null,
    service: data.service,
    from_city: data.fromCity,
    to_city: data.toCity,
    cargo_type: data.cargoType ?? null,
    weight_tons: data.weightTons ?? null,
    pickup_date: data.pickupDate ?? null,
    details: data.details ?? null,
    source_page: meta.sourcePage ?? null,
    utm_source: meta.utm.source ?? null,
    utm_medium: meta.utm.medium ?? null,
    utm_campaign: meta.utm.campaign ?? null,
    ip_hash: meta.ipHash,
  };
}
