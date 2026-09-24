import "server-only";
import { Resend } from "resend";
import { serviceOptions, vehicleOptions } from "@/content/forms";
import { getServerEnv } from "@/lib/env";
import { siteConfig } from "@/lib/site-config";

/*
 * Notification emails go ONLY to QUOTE_NOTIFICATION_EMAIL. Submitter data is never
 * sent anywhere else. `replyTo` lets the team answer the enquirer directly.
 */

type Row = [label: string, value: string | null | undefined];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function render(title: string, rows: Row[]) {
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));
  const text = [title, "", ...filled.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#0f2026">
<h2 style="margin:0 0 16px">${escapeHtml(title)}</h2>
<table cellpadding="6" style="border-collapse:collapse">${filled
    .map(
      ([label, value]) =>
        `<tr><td style="vertical-align:top;color:#667085;white-space:nowrap">${escapeHtml(label)}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table></div>`;
  return { text, html };
}

async function send(subject: string, title: string, rows: Row[], replyTo?: string | null) {
  const env = getServerEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: env.QUOTE_NOTIFICATION_EMAIL,
    subject,
    ...render(title, rows),
    ...(replyTo ? { replyTo } : {}),
  });
  if (error) throw new Error(`Resend: ${error.name} — ${error.message}`);
}

const label = <T extends string>(options: { value: T; label: string }[], value: T) =>
  options.find((option) => option.value === value)?.label ?? value;

export type QuoteEmailData = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  pickupLocation: string;
  deliveryLocation: string;
  serviceType: (typeof serviceOptions)[number]["value"];
  approxLoad: string | null;
  vehicleType: (typeof vehicleOptions)[number]["value"];
  pickupDate: string | null;
  message: string | null;
  sourcePage: string | null;
};

export async function sendQuoteNotification(data: QuoteEmailData) {
  const service = label(serviceOptions, data.serviceType);
  await send(
    `New quote request — ${data.company} (${service})`,
    `New quote request · ${siteConfig.name} website`,
    [
      ["Name", data.name],
      ["Company", data.company],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Pickup", data.pickupLocation],
      ["Delivery", data.deliveryLocation],
      ["Service", service],
      ["Approx. load", data.approxLoad],
      ["Vehicle type", label(vehicleOptions, data.vehicleType)],
      ["Preferred pickup date", data.pickupDate],
      ["Message", data.message],
      ["Submitted from", data.sourcePage],
      ["Reference", data.id],
    ],
    data.email,
  );
}

export type ContactEmailData = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
};

export async function sendContactNotification(data: ContactEmailData) {
  await send(
    `New website message — ${data.name}`,
    `New contact message · ${siteConfig.name} website`,
    [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Message", data.message],
      ["Reference", data.id],
    ],
    data.email,
  );
}
