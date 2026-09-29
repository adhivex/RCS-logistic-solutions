import { company, formatAddress } from "./company";

/**
 * Privacy & cookie policy — docs/03-pages.md and 09-cookie-consent.md: plain, short
 * and honest. Written for India's DPDP Act 2023.
 * TODO(client): have the final privacy and cookie text reviewed by your legal advisor.
 */
export type PolicySection = { id?: string; heading: string; paragraphs?: string[]; list?: string[] };

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
      "Whether you're a business or an individual, your name, phone number and — if you give them — company and email.",
      "The service you need, pickup and delivery cities, and optional cargo type, weight, pickup date and details.",
      "The page you sent the form from and, if you allowed analytics cookies, campaign tags in the link you followed (UTM parameters).",
    ],
  },
  {
    heading: "Why we use it",
    paragraphs: [
      "To reply to your request, prepare a quote and follow up about it. We do not sell your data or use it for unrelated marketing.",
      "To prevent spam we keep a one-way scrambled (hashed) version of your IP address with the request. We never store the IP address itself.",
    ],
  },
  {
    heading: "Who processes it for us",
    list: [
      "Vercel — website hosting and, only if you allow analytics cookies, anonymous visit statistics.",
      "Supabase — the database (Mumbai region) that stores quote requests.",
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

export type CookieRow = { name: string; category: string; purpose: string; duration: string };

export const cookiePolicy = {
  id: "cookies",
  heading: "Cookies",
  intro: [
    "Essential cookies keep the site and the quote form working and are always on. Analytics and marketing cookies load only if you allow them — nothing optional runs before you choose.",
    "You can change your choice at any time with “Cookie settings” at the bottom of every page. Withdrawing consent is as easy as giving it.",
  ],
  rows: [
    {
      name: "rcs-consent",
      category: "Essential",
      purpose: "Remembers your cookie choice.",
      duration: "6 months",
    },
    {
      name: "rcs_utm",
      category: "Analytics",
      purpose: "Remembers the campaign link (UTM tags) that brought you here, attached to a quote request.",
      duration: "30 days",
    },
    {
      name: "Vercel Web Analytics",
      category: "Analytics",
      purpose: "Anonymous page-view statistics. Sets no cookies; loads only with analytics consent.",
      duration: "—",
    },
    {
      name: "Google Maps",
      category: "Third party",
      purpose:
        "The map on the contact page loads only when you click “Show map”; Google may then set its own cookies.",
      duration: "Set by Google",
    },
  ] satisfies CookieRow[],
  // No marketing tags are installed yet. TODO(client): list vendors (Google Ads, Meta Pixel, LinkedIn) if added.
  marketingNote: "We don't use any marketing or advertising cookies at the moment.",
};
