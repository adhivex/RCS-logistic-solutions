"use server";

import { formCopy } from "@/content/forms";
import { getDb } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { getClientIp, hashIp } from "@/lib/hash";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import {
  contactSchema,
  normalizeIndianMobile,
  toFieldErrors,
  type ActionResult,
  type ContactInput,
} from "@/lib/validations";

export type ContactField = keyof ContactInput;

/** Same flow and protections as submitQuote. */
export async function submitContact(
  input: ContactInput,
  turnstileToken: string | undefined,
): Promise<ActionResult<ContactField>> {
  try {
    if (input.website) return { ok: true };

    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) return { ok: false, fieldErrors: toFieldErrors<ContactField>(parsed.error) };
    const data = parsed.data;

    const ip = await getClientIp();
    if (!(await verifyTurnstile(turnstileToken, ip))) return { ok: false, formError: formCopy.spamCheckError };

    const ipHash = hashIp(ip);
    if (await isRateLimited(ipHash)) return { ok: false, formError: formCopy.rateLimitError };

    const db = getDb();
    const record = await db.contactMessage.create({
      data: {
        name: data.name,
        email: data.email || null,
        phone: data.phone ? normalizeIndianMobile(data.phone) : null,
        message: data.message,
        consentAt: new Date(),
        ipHash,
      },
    });

    try {
      await sendContactNotification(record);
      await db.contactMessage.update({ where: { id: record.id }, data: { emailStatus: "SENT" } });
    } catch (error) {
      console.error(`Contact ${record.id}: notification email failed`, error);
      await db.contactMessage
        .update({ where: { id: record.id }, data: { emailStatus: "FAILED" } })
        .catch((updateError) => console.error(`Contact ${record.id}: could not record email failure`, updateError));
    }

    return { ok: true };
  } catch (error) {
    console.error("submitContact failed", error);
    return { ok: false, formError: formCopy.genericError };
  }
}
