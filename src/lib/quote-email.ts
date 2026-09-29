import "server-only";
import { Resend } from "resend";
import { company } from "@/content/company";
import { customerTypeOptions, serviceOptions } from "@/content/quote";
import QuoteConfirmationEmail from "@/emails/quote-confirmation";
import QuoteNotificationEmail, { type QuoteEmailRow } from "@/emails/quote-notification";
import { getResendConfig } from "@/lib/env";
import type { QuoteData } from "@/lib/validation/quote";

export function serviceLabel(value: QuoteData["service"]): string {
  return serviceOptions.find((option) => option.value === value)?.label ?? value;
}

export function quoteEmailRows(data: QuoteData, sourcePage?: string): QuoteEmailRow[] {
  const customerType = customerTypeOptions.find((option) => option.value === data.customerType)?.label ?? "";
  return [
    { label: "Customer", value: customerType },
    { label: "Name", value: data.name },
    { label: "Company", value: data.company ?? "" },
    { label: "Phone", value: data.phone },
    { label: "Email", value: data.email ?? "" },
    { label: "Service", value: serviceLabel(data.service) },
    { label: "From", value: data.fromCity },
    { label: "To", value: data.toCity },
    { label: "Cargo type", value: data.cargoType ?? "" },
    { label: "Weight (tonnes)", value: data.weightTons !== undefined ? String(data.weightTons) : "" },
    { label: "Preferred pickup date", value: data.pickupDate ?? "" },
    { label: "Details", value: data.details ?? "" },
    { label: "Submitted from", value: sourcePage ?? "" },
  ].filter((row) => row.value !== "");
}

/**
 * Sends the two emails from docs/05-data-and-api.md. Submitter data goes only to
 * QUOTE_NOTIFY_TO (RCS) and — if they gave one — back to the submitter's own address.
 * Returns false in local mode (no RESEND_API_KEY: the email is logged instead).
 * Throws on failure; the caller keeps the saved submission with email_sent = false.
 */
export async function sendQuoteEmails(data: QuoteData, meta: { id: string; sourcePage?: string }) {
  const service = serviceLabel(data.service);
  const route = `${data.fromCity} → ${data.toCity}`;
  const title = `New quote: ${route} (${service})`;
  const rows = quoteEmailRows(data, meta.sourcePage);

  const config = getResendConfig();
  if (!config) {
    const table = rows.map((row) => `  ${row.label}: ${row.value}`).join("\n");
    console.info(`[local mode] Would email RCS — "${title}" (ref ${meta.id})\n${table}`);
    if (data.email) console.info(`[local mode] Would send a confirmation to ${data.email}`);
    return false;
  }

  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to: config.notifyTo,
    subject: title,
    react: QuoteNotificationEmail({ title, rows, phone: data.phone, reference: meta.id }),
    ...(data.email ? { replyTo: data.email } : {}),
  });
  if (error) throw new Error(`Resend (RCS notification): ${error.name} — ${error.message}`);

  if (data.email) {
    const confirmation = await resend.emails.send({
      from: config.from,
      to: data.email,
      replyTo: config.notifyTo[0],
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
  return true;
}
