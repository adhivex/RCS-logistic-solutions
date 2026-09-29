/**
 * Homepage copy — docs/04-content.md → Home, matching
 * docs/reference/homepage-preview.html. A heading's `accent` is its last phrase,
 * set in italic serif orange.
 */
export type Heading = { lead: string; accent: string };

export const hero = {
  label: "B2B & B2C Logistics · Est. in Odisha",
  titleLines: ["Moving", "Business"],
  titleAccent: "Forward",
  lead: "From Odisha to a stronger India. Dependable road transport for businesses and individuals, keeping your cargo moving every day, every mile.",
  aside: {
    heading: "From Odisha to a stronger India.",
    body: "Right Cargo, Right Stop. Reliable. Efficient. Pan India.",
  },
  primaryCta: "Get a Quote",
  secondaryCta: { label: "Explore the Fleet", href: "/fleet" },
} as const;

export type TrustIcon = "reach" | "secure" | "partner" | "growth";

export const trust: { icon: TrustIcon; label: string }[] = [
  { icon: "reach", label: "Pan India Reach" },
  { icon: "secure", label: "Safe & Secure" },
  { icon: "partner", label: "Reliable Partner" },
  { icon: "growth", label: "Sustainable Growth" },
];

export const servicesIntro = {
  label: "What We Do",
  heading: { lead: "Logistics built around", accent: "your supply chain." } satisfies Heading,
  link: { label: "All services", href: "/services" },
};

/** Short card lines for the homepage (the detail pages use the longer one-liners). */
export const serviceCardLines: Record<string, string> = {
  "full-truck-load": "A dedicated vehicle, point to point, no transfers.",
  "part-truck-load": "Share space and pay only for what you use.",
  warehousing: "Secure storage, ready to dispatch on demand.",
  "supply-chain": "Planning across vendors, plants and distributors.",
};

export const fleetIntro = {
  label: "Our Fleet",
  heading: { lead: "The right vehicle for", accent: "every load." } satisfies Heading,
  description:
    "A diversified fleet to handle a wide range of cargo requirements, from heavy industrial goods to time-sensitive deliveries.",
  link: { label: "View fleet", href: "/fleet" },
};

export const founderStrip = {
  quote: "Building a dependable logistics network from Odisha for businesses across India.",
  link: { label: "Our story", href: "/about" },
};

export const ctaSection = {
  label: "Start a Shipment",
  heading: { lead: "Ready to move your", accent: "business forward?" } satisfies Heading,
  line: "Tell us what you're moving and where. We'll come back with a clear quote.",
  primary: "Get a Quote",
  call: "Call the Team",
};

export const footerCopy = {
  tagline: "Bigger routes, brighter tomorrows.",
  about: "Dependable B2B & B2C road transport from Odisha across India.",
};
