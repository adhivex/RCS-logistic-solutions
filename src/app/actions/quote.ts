"use server";

import { cookies } from "next/headers";
import { track } from "@vercel/analytics/server";
import { quoteCopy } from "@/content/quote";
import { getDb } from "@/lib/db";
import { getClientIp, hashIp } from "@/lib/hash";
import { sendQuoteEmails } from "@/lib/quote-email";
import { hitRateLimit } from "@/lib/rate-limit";
import { UTM_COOKIE, parseUtmCookie } from "@/lib/utm";
import { quoteSchema, type QuoteField, type QuoteFormValues } from "@/lib/validation/quote";

export type QuoteResult =
  { ok: true } | { ok: false; fieldErrors?: Partial<Record<QuoteField, string>>; formError?: string };

/**
 * docs/05-data-and-api.md → Submission:
 * honeypot → validate → rate limit → save → emails (non-fatal) → analytics → ok.
 * The client then redirects to /thank-you. Never throws to the client.
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

    if (await hitRateLimit(hashIp(await getClientIp()))) {
      return { ok: false, formError: quoteCopy.errors.rateLimited };
    }

    const utm = parseUtmCookie((await cookies()).get(UTM_COOKIE)?.value);
    const db = getDb();
    const record = await db.quoteRequest.create({
      data: {
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
        service: data.service,
        fromCity: data.fromCity,
        toCity: data.toCity,
        cargoType: data.cargoType,
        weightTons: data.weightTons,
        pickupDate: data.pickupDate ? new Date(`${data.pickupDate}T00:00:00Z`) : undefined,
        details: data.details,
        sourcePage: sourcePage?.slice(0, 200),
        utmSource: utm.source,
        utmMedium: utm.medium,
        utmCampaign: utm.campaign,
      },
    });

    // Don't fail the submission if email fails — log it and keep emailSent=false.
    try {
      await sendQuoteEmails(data, { id: record.id, sourcePage });
      await db.quoteRequest.update({ where: { id: record.id }, data: { emailSent: true } });
    } catch (error) {
      console.error(`Quote ${record.id}: email failed`, error);
    }

    try {
      await track("quote_submitted", { service: data.service });
    } catch (error) {
      console.error("Analytics event failed", error);
    }

    return { ok: true };
  } catch (error) {
    // Missing env (no DB/Resend yet), database outage, etc.
    console.error("submitQuote failed", error);
    return { ok: false, formError: quoteCopy.errors.unavailable };
  }
}
