import "server-only";
import { Resend } from "resend";
import { company, serviceOptions } from "@/content";
import QuoteConfirmationEmail from "@/emails/quote-confirmation";
import QuoteNotificationEmail, { type QuoteEmailRow } from "@/emails/quote-notification";
import { getServerEnv } from "@/lib/env";
import type { QuoteData } from "@/lib/validation/quote";

export function serviceLabel(value: QuoteData["service"]): string {
  return serviceOptions.find((option) => option.value === value)?.label ?? value;
}

/**
 * Sends the two emails from docs/05-data-and-api.md. Submitter data goes only to
 * QUOTE_NOTIFY_TO (RCS) and — if they gave one — back to the submitter's own address.
 * Throws on failure; the caller keeps the saved submission with emailSent=false.
 */
export async function sendQuoteEmails(data: QuoteData, meta: { id: string; sourcePage?: string }) {
  const env = getServerEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const service = serviceLabel(data.service);
  const route = `${data.fromCity} → ${data.toCity}`;

  const rows: QuoteEmailRow[] = [
    { label: "Name", value: data.name },
    { label: "Company", value: data.company ?? "" },
    { label: "Phone", value: data.phone },
    { label: "Email", value: data.email ?? "" },
    { label: "Service", value: service },
    { label: "From", value: data.fromCity },
    { label: "To", value: data.toCity },
    { label: "Cargo type", value: data.cargoType ?? "" },
    { label: "Weight (tonnes)", value: data.weightTons !== undefined ? String(data.weightTons) : "" },
    { label: "Preferred pickup date", value: data.pickupDate ?? "" },
    { label: "Details", value: data.details ?? "" },
    { label: "Submitted from", value: meta.sourcePage ?? "" },
  ].filter((row) => row.value !== "");

  const title = `New quote: ${route} (${service})`;
  const { error } = await resend.emails.send({
    from: env.QUOTE_FROM_EMAIL,
    to: env.QUOTE_NOTIFY_TO,
    subject: title,
    react: QuoteNotificationEmail({ title, rows, phone: data.phone, reference: meta.id }),
    ...(data.email ? { replyTo: data.email } : {}),
  });
  if (error) throw new Error(`Resend (RCS notification): ${error.name} — ${error.message}`);

  if (data.email) {
    const confirmation = await resend.emails.send({
      from: env.QUOTE_FROM_EMAIL,
      to: data.email,
      replyTo: env.QUOTE_NOTIFY_TO[0],
      subject: `We received your quote request — ${route}`,
      react: QuoteConfirmationEmail({
        name: data.name,
        route,
        companyName: company.name,
        phone: company.phone,
        phoneHref: company.phoneHref,
      }),
    });
    // The RCS email already went out; a failed confirmation is logged, not fatal.
    if (confirmation.error) {
      console.error(`Quote ${meta.id}: confirmation email failed`, confirmation.error);
    }
  }
}
