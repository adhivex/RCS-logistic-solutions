/**
 * Single source of truth for every company fact shown on the site.
 *
 * Rules (see CLAUDE.md):
 * - Unconfirmed values use the exact format `[[TBC: description]]`.
 * - Never replace a placeholder with a realistic-looking guess.
 * - Sections that depend on unconfirmed data stay behind a `features` flag.
 * - Update this file as answers arrive in docs/open-questions.md.
 */
export const siteConfig = {
  name: "RCS Logistic Solutions",
  legalName: "[[TBC: registered legal entity name]]",
  founder: { name: "Satya Swain", designation: "Founder" /* [[TBC]] */ },
  contact: {
    phone: "[[TBC: phone]]",
    email: "[[TBC: email]]",
    address: "[[TBC: head office address]]",
    hours: "[[TBC: working hours]]",
  },
  social: {} as Partial<Record<"linkedin" | "facebook" | "instagram" | "x", string>>,
  features: {
    metrics: false,
    industries: false,
    testimonials: false,
    clientLogos: false,
    founderPortrait: false,
    founderSignature: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** False for placeholders such as `[[TBC: phone]]`, empty strings and missing values. */
export function isConfirmed(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim() !== "" && !value.trim().startsWith("[[TBC");
}

/**
 * In production, unconfirmed values are hidden entirely.
 * In development they render as-is, so gaps stay visible while building.
 */
export function shouldDisplay(value: string | null | undefined): value is string {
  if (isConfirmed(value)) return true;
  return process.env.NODE_ENV !== "production" && typeof value === "string" && value !== "";
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

const whatsappMessage = `Hello ${siteConfig.name}, I'd like to discuss a logistics requirement.`;

/** WhatsApp click-to-chat URL, or `null` when NEXT_PUBLIC_WHATSAPP_NUMBER is unset. */
export const whatsappUrl: string | null = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
  : null;

/** Destination for "Talk to our team": WhatsApp when configured, else the contact page. */
export const talkToTeamHref: string = whatsappUrl ?? "/contact";
