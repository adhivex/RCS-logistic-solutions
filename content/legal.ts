import { siteConfig } from "@/lib/site-config";

/*
 * DRAFT legal templates — must be reviewed and approved by RCS Logistic Solutions
 * (ideally with legal advice) before launch. `[[TBC: …]]` values are intentionally
 * rendered as-is on these pages so gaps are obvious; the pre-launch grep catches them.
 */

export type LegalSection = { heading: string; paragraphs?: string[]; list?: string[] };

export const legalDraftNotice = "Draft — pending review by RCS Logistic Solutions";
export const legalLastUpdated = "[[TBC: date of approval]]";

const entity = siteConfig.legalName;
const address = siteConfig.contact.address;
const email = siteConfig.contact.email;
const grievance = "[[TBC: grievance officer name, email and phone]]";

export const privacyPolicy: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      `This website is operated by ${entity} ("${siteConfig.name}", "we", "us"), ${address}. We are the Data Fiduciary for the personal data described here, under India's Digital Personal Data Protection Act, 2023 ("DPDP Act").`,
    ],
  },
  {
    heading: "What we collect",
    paragraphs: ["We collect only what you enter in our forms, plus limited technical data needed to protect them:"],
    list: [
      "Quote form: name, company, email, mobile number, pickup and delivery locations, service type, and — if you choose to give them — approximate load, vehicle type, preferred pickup date and a message.",
      "Contact form: name, email and/or mobile number, and your message.",
      "The date and time of your submission and of your consent.",
      "A one-way, salted hash of your IP address, used only to limit repeated submissions. We do not store your IP address itself.",
    ],
  },
  {
    heading: "Why we use it",
    list: [
      "To respond to your enquiry, prepare a quote and follow up about it.",
      "To protect our forms from spam and abuse.",
    ],
    paragraphs: ["We do not use your data for marketing, and we do not sell it."],
  },
  {
    heading: "Legal basis",
    paragraphs: [
      "We process your personal data on the basis of the consent you give when you tick the consent box on our forms (Section 6 of the DPDP Act). You can withdraw consent at any time by contacting us; this does not affect processing already carried out.",
    ],
  },
  {
    heading: "Who processes it for us",
    paragraphs: [
      "We use service providers who process data on our behalf, only to run this website and its forms:",
    ],
    list: [
      "Vercel — website hosting and privacy-friendly, cookie-free visitor analytics.",
      "Neon — database storage for form submissions.",
      "Resend — delivery of form notifications to our team.",
      "Cloudflare Turnstile — spam protection on our forms.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep enquiry data for [[TBC: retention period, e.g. 24 months after the last contact]], unless we need it longer for an ongoing business relationship or a legal obligation. After that it is deleted.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: ["Under the DPDP Act you have the right to:"],
    list: [
      "Access a summary of the personal data we hold about you and how it is processed.",
      "Correct, complete, update or erase your personal data.",
      "Withdraw your consent.",
      "Have your grievances addressed.",
      "Nominate another person to exercise these rights in the event of your death or incapacity.",
    ],
  },
  {
    heading: "Grievance officer",
    paragraphs: [
      `For questions, requests or complaints about your personal data, contact: ${grievance}. We will respond within [[TBC: response period]]. If you are not satisfied with our response, you may complain to the Data Protection Board of India.`,
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "This website is intended for businesses. We do not knowingly collect personal data from anyone under 18.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: ["If we change this policy, we will update it on this page and change the date below."],
  },
  {
    heading: "Contact",
    paragraphs: [`${entity}, ${address}. Email: ${email}.`],
  },
];

export const terms: LegalSection[] = [
  {
    heading: "About these terms",
    paragraphs: [
      `These terms apply to your use of this website, operated by ${entity} ("${siteConfig.name}", "we", "us"), ${address}. By using the website you accept them.`,
    ],
  },
  {
    heading: "Information on this website",
    paragraphs: [
      "The website describes our services in general terms. We try to keep it accurate and up to date, but it is not an offer and does not form a contract.",
    ],
  },
  {
    heading: "Quotes and enquiries",
    paragraphs: [
      "Submitting a quote request does not create a booking or a contract. Any quote we provide is based on the details you give us and is subject to confirmation. Transport, storage and related services are governed by the terms agreed in writing for each engagement.",
      "Please make sure the information you submit is accurate. You are responsible for having the right to share any details you give us.",
    ],
  },
  {
    heading: "Acceptable use",
    list: [
      "Do not submit false, misleading or unlawful information.",
      "Do not attempt to disrupt, overload or gain unauthorised access to the website or its systems.",
      "Do not use automated tools to submit forms.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      `The ${siteConfig.name} name, logo and website content belong to us or our licensors. You may not use them without our written permission.`,
    ],
  },
  {
    heading: "Links to other websites",
    paragraphs: ["Links to other websites, such as WhatsApp, are provided for convenience. We are not responsible for their content or practices."],
  },
  {
    heading: "Liability",
    paragraphs: [
      "To the extent permitted by law, we are not liable for any loss arising from use of, or inability to use, this website or reliance on its content. Nothing in these terms limits liability that cannot be limited under applicable law.",
    ],
  },
  {
    heading: "Privacy",
    paragraphs: ["How we handle personal data is explained in our Privacy Policy."],
  },
  {
    heading: "Governing law",
    paragraphs: [
      "These terms are governed by the laws of India. Courts at [[TBC: city for jurisdiction, e.g. Bhubaneswar, Odisha]] have exclusive jurisdiction.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [`${entity}, ${address}. Email: ${email}.`],
  },
];
