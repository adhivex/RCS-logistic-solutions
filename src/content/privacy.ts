import { company, formatAddress } from "./company";

/**
 * Privacy policy — docs/03-pages.md: plain, short and honest, covering the quote form.
 * Written for India's DPDP Act 2023. TODO(client): review before launch.
 */
export type PolicySection = { heading: string; paragraphs?: string[]; list?: string[] };

export const privacyUpdated = "29 September 2026";

export const privacyPolicy: PolicySection[] = [
  {
    heading: "Who we are",
    paragraphs: [`${company.name}, ${formatAddress()}. Email: ${company.email}. Phone: ${company.phone}.`],
  },
  {
    heading: "What we collect",
    paragraphs: ["When you request a quote we collect only what you type into the form:"],
    list: [
      "Name, phone number, and — if you give them — company and email.",
      "The service you need, pickup and delivery cities, and optional cargo type, weight, pickup date and details.",
      "The page you sent the form from and, if present, campaign tags in the link you followed (UTM parameters).",
    ],
  },
  {
    heading: "Why we use it",
    paragraphs: [
      "To reply to your request, prepare a quote and follow up about it. We do not sell your data or use it for unrelated marketing.",
      "To prevent spam we keep a one-way scrambled (hashed) version of your IP address for a short time. We never store the IP address itself.",
    ],
  },
  {
    heading: "Who processes it for us",
    list: [
      "Vercel — website hosting and privacy-friendly, cookie-free visit statistics.",
      "Neon — the database that stores quote requests.",
      "Resend — delivery of quote emails to our team and, if you gave an email address, a confirmation to you.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "TODO(client): retention period — e.g. quote requests are kept for 24 months after our last contact, then deleted.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      `Under India's Digital Personal Data Protection Act, 2023 you can ask to see, correct or delete the personal data we hold about you, or withdraw your consent. Email ${company.email} and we will respond promptly.`,
    ],
  },
];
