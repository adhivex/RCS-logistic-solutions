"use server";

import { formCopy } from "@/content/forms";
import { getDb } from "@/lib/db";
import { sendQuoteNotification } from "@/lib/email";
import { getClientIp, hashIp } from "@/lib/hash";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  normalizeIndianMobile,
  quoteSchema,
  toFieldErrors,
  type ActionResult,
  type QuoteInput,
} from "@/lib/validations";

export type QuoteField = keyof QuoteInput;

/**
 * Quote submission flow (docs/architecture.md):
 * honeypot → schema → Turnstile → rate limit → store → notify → ok.
 * Always returns a typed result; never throws to the client.
 */
export async function submitQuote(
  input: QuoteInput,
  turnstileToken: string | undefined,
  sourcePage: string | undefined,
): Promise<ActionResult<QuoteField>> {
  try {
    // 1. Honeypot filled → pretend success, store nothing.
    if (input.website) return { ok: true };

    // 2. Validate again on the server.
    const parsed = quoteSchema.safeParse(input);
    if (!parsed.success) return { ok: false, fieldErrors: toFieldErrors<QuoteField>(parsed.error) };
    const data = parsed.data;

    // 3. Turnstile.
    const ip = await getClientIp();
    if (!(await verifyTurnstile(turnstileToken, ip))) return { ok: false, formError: formCopy.spamCheckError };

    // 4. Rate limit by hashed IP.
    const ipHash = hashIp(ip);
    if (await isRateLimited(ipHash)) return { ok: false, formError: formCopy.rateLimitError };

    // 5. Store.
    const db = getDb();
    const record = await db.quoteRequest.create({
      data: {
        name: data.name,
        company: data.company,
        email: data.email,
        phone: normalizeIndianMobile(data.phone),
        pickupLocation: data.pickupLocation,
        deliveryLocation: data.deliveryLocation,
        serviceType: data.serviceType,
        approxLoad: data.approxLoad || null,
        vehicleType: data.vehicleType,
        pickupDate: data.pickupDate ? new Date(`${data.pickupDate}T00:00:00Z`) : null,
        message: data.message || null,
        consentAt: new Date(),
        ipHash,
        sourcePage: sourcePage?.slice(0, 200) || null,
      },
    });

    // 6. Notify. If email fails the submission is still saved.
    try {
      await sendQuoteNotification({
        id: record.id,
        name: record.name,
        company: record.company,
        email: record.email,
        phone: record.phone,
        pickupLocation: record.pickupLocation,
        deliveryLocation: record.deliveryLocation,
        serviceType: record.serviceType,
        approxLoad: record.approxLoad,
        vehicleType: record.vehicleType,
        pickupDate: data.pickupDate || null,
        message: record.message,
        sourcePage: record.sourcePage,
      });
      await db.quoteRequest.update({ where: { id: record.id }, data: { emailStatus: "SENT" } });
    } catch (error) {
      console.error(`Quote ${record.id}: notification email failed`, error);
      await db.quoteRequest
        .update({ where: { id: record.id }, data: { emailStatus: "FAILED" } })
        .catch((updateError) => console.error(`Quote ${record.id}: could not record email failure`, updateError));
    }

    // 7. Done.
    return { ok: true };
  } catch (error) {
    console.error("submitQuote failed", error);
    return { ok: false, formError: formCopy.genericError };
  }
}
