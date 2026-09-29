import type { Heading } from "./home";

/**
 * Inner-page copy (docs/03-pages.md). Each page hero has a label and an H1 with a
 * serif accent phrase. Short intros are drafts — TODO(client): review.
 * Meta descriptions follow docs/06-seo-launch.md (140–160 chars, Odisha B2B/B2C terms).
 */
export type PageHeroCopy = { label: string; heading: Heading; intro?: string };

export const pages = {
  about: {
    title: "About",
    hero: {
      label: "About Us",
      heading: { lead: "About RCS", accent: "Logistic Solutions" },
      intro:
        "An Odisha-based road transport and logistics company, built to give businesses and individuals across India a dependable partner for every load.",
    } satisfies PageHeroCopy,
    description:
      "RCS Logistic Solutions is a road transport company from Choudwar, Cuttack, founded by Satya Sankar Swain to move goods for businesses and people across India.",
  },
  fleet: {
    title: "Our Fleet",
    hero: {
      label: "Our Fleet",
      heading: { lead: "The right vehicle for", accent: "every load." },
      intro: "Semi-trailers, box trucks and light commercial vehicles — matched to what you're moving.",
    } satisfies PageHeroCopy,
    description:
      "Semi-trailer trucks, box trucks and light commercial vehicles for full and part truck loads from Odisha. Tell us your load and RCS matches the right vehicle.",
    cta: {
      label: "Not sure?",
      heading: { lead: "Not sure which vehicle", accent: "you need?" } satisfies Heading,
      line: "Tell us the load — what it is, how much, and where it's going. We'll suggest the right vehicle.",
    },
  },
  services: {
    title: "Services",
    hero: {
      label: "What We Do",
      heading: { lead: "Logistics built around", accent: "your supply chain." },
      intro:
        "Full and part truck loads, warehousing and supply chain support for businesses and individuals in Odisha and across India.",
    } satisfies PageHeroCopy,
    description:
      "Full truck load, part truck load, warehousing and supply chain solutions from RCS Logistic Solutions, a transport company in Cuttack, Odisha serving all India.",
  },
  industries: {
    title: "Industries",
    hero: {
      label: "Industries",
      heading: { lead: "Moving goods for", accent: "core industries." },
      intro: "What we move for steel, mining, cement, FMCG, agriculture and industrial businesses.",
    } satisfies PageHeroCopy,
    description:
      "Truck transport for steel, mining, cement, FMCG, agriculture and chemical businesses in Odisha and eastern India, from RCS Logistic Solutions in Cuttack.",
  },
  network: {
    title: "Network",
    hero: {
      label: "Our Network",
      heading: { lead: "From Odisha to every", accent: "major market." },
      intro: "Headquartered in Choudwar, Cuttack — moving goods from Odisha to markets across India.",
    } satisfies PageHeroCopy,
    description:
      "Road network of RCS Logistic Solutions from Cuttack, Odisha to markets across India: coverage map, cities served and key routes for truck transport.",
    mapLabel: "Coverage",
    mapHeading: { lead: "Rooted in Odisha,", accent: "reaching India." } satisfies Heading,
    routesHeading: "Key routes",
  },
  contact: {
    title: "Contact",
    hero: {
      label: "Contact",
      heading: { lead: "Tell us what you're", accent: "moving." },
      intro: "Call, WhatsApp or send the form — tell us what you're moving and where.",
    } satisfies PageHeroCopy,
    description:
      "Contact RCS Logistic Solutions in Choudwar, Cuttack, Odisha: call or WhatsApp +91 99388 74147, email info@rcsls.in, or request a transport quote online.",
    detailsLabel: "Talk to us",
    detailsHeading: { lead: "Call, WhatsApp or", accent: "email us." } satisfies Heading,
  },
  thankYou: {
    title: "Quote request received",
    label: "Thank you",
    heading: { lead: "Request", accent: "received." } satisfies Heading,
    body: "Our team will review your requirement and contact you on the phone number you gave us.",
    nextHeading: "What happens next",
    next: [
      "We review your pickup, delivery and load details.",
      "We call you to confirm anything we need and share a quote.",
      "Once you confirm, we schedule the pickup.",
    ],
    urgent: "Need to talk sooner?",
  },
  privacy: {
    title: "Privacy & Cookie Policy",
    hero: {
      label: "Privacy",
      heading: { lead: "Privacy &", accent: "cookies." },
    } satisfies PageHeroCopy,
    description:
      "How RCS Logistic Solutions handles the details you send with a quote request, which cookies the site uses, and how to change your cookie choices at any time.",
  },
  notFound: {
    label: "404",
    heading: { lead: "This stop isn't", accent: "on our route." } satisfies Heading,
    body: "The page may have moved, or the link may be mistyped. Try one of these instead:",
  },
} as const;
