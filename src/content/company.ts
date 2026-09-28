/**
 * Company facts — single source for contact details, founder and brand names.
 * Confirmations are dated; see docs/04-content.md → "Client answers".
 */
export const company = {
  name: "RCS Logistic Solutions",
  shortName: "RCS Logistic",
  tagline: "Right Cargo, Right Stop",
  founder: "Satya Sankar Swain",
  founderRole: "Founder", // TODO(client): "Founder" or "CEO & Founder" (old site said "CEO - Founder")
  phone: "+91 99388 74147", // confirmed 2026-09-29
  phoneHref: "tel:+919938874147",
  whatsapp: "919938874147", // confirmed 2026-09-29
  email: "info@rcsls.in", // confirmed 2026-09-29
  address: {
    street: "Kapaleswar, Choudwar", // from old site; PIN confirmed 2026-09-29
    city: "Cuttack",
    region: "Odisha",
    postalCode: "754071",
    country: "IN",
  },
  hours: "Mon–Sat, 10:00 am – 7:30 pm", // from old site — TODO(client): confirm
  gstin: "TODO(client): GSTIN (optional, footer)",
  social: {
    linkedin: "TODO(client): LinkedIn URL",
    facebook: "TODO(client): Facebook URL",
    instagram: "TODO(client): Instagram URL",
  },
} as const;

export const whatsappMessage = `Hello ${company.name}, I'd like a quote for a shipment.`;

export const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;

export const mailtoHref = `mailto:${company.email}`;

/** One-line postal address for display. */
export function formatAddress(): string {
  const { street, city, region, postalCode } = company.address;
  return `${street}, ${city}, ${region} ${postalCode}`;
}
