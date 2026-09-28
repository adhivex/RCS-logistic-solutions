/**
 * Homepage copy — docs/04-content.md → Home. A heading's `highlight` is the last
 * phrase, rendered in orange (docs/02-design-system.md → headline pattern).
 */
export type Heading = { lead: string; highlight: string };

export const hero = {
  eyebrow: "B2B Logistics Partner",
  titleLines: ["Moving", "Business"],
  titleHighlight: "Forward",
  tag: "Reliable. Efficient. Pan India.",
  lead: "RCS Logistic delivers dependable B2B transportation solutions across Odisha and India, keeping your business moving—every day, every mile.",
  corner: { lines: ["From", "Odisha", "to a stronger", "India"], emphasis: ["Odisha", "India"] },
  primaryCta: "Get a Quote",
  secondaryCta: { label: "Our Fleet", href: "/fleet" },
} as const;

export type TrustIcon = "reach" | "secure" | "partner" | "growth";

export const trust = {
  items: [
    { icon: "reach", label: "Pan India Reach" },
    { icon: "secure", label: "Safe & Secure" },
    { icon: "partner", label: "Reliable Partner" },
    { icon: "growth", label: "Sustainable Growth" },
  ] satisfies { icon: TrustIcon; label: string }[],
  script: "Bigger Routes, Brighter Tomorrows",
};

export const founderIntro = {
  eyebrow: "Our Founder",
  heading: { lead: "Driven by Purpose, Built for a", highlight: "Bigger Tomorrow" } satisfies Heading,
  body: "RCS Logistic was founded by Satya Sankar Swain with a clear vision to build a dependable and modern logistics network from Odisha to businesses across India. With a strong focus on reliability, operational excellence and long-term partnerships, we are committed to keeping India's supply chain moving.",
  photoOverlay: ["People", "Drive", "Progress"],
  cta: { label: "Our Story", href: "/about" },
};

export const fleetIntro = {
  eyebrow: "Our Fleet",
  heading: { lead: "The Right Vehicle for", highlight: "Every Business Need" } satisfies Heading,
  description:
    "A diversified fleet to handle a wide range of cargo requirements, from heavy industrial goods to time-sensitive deliveries.",
  link: { label: "View All Vehicles", href: "/fleet" },
};

// Draft section headings — not in 04-content.md. TODO(client): review
export const servicesIntro = {
  eyebrow: "Our Services",
  heading: { lead: "Logistics Built Around", highlight: "Your Business" } satisfies Heading,
  description: "Four ways to move and hold your goods — choose one, or combine them.",
  link: { label: "All Services", href: "/services" },
};

export const industriesIntro = {
  eyebrow: "Industries",
  heading: { lead: "Moving Goods for", highlight: "Core Industries" } satisfies Heading,
  link: { label: "See All Industries", href: "/industries" },
};

export const networkIntro = {
  eyebrow: "Our Network",
  heading: { lead: "From Odisha", highlight: "to Every Major Market" } satisfies Heading,
  cta: { label: "Explore Network", href: "/network" },
};

export const ctaBand = {
  heading: "Need a dependable logistics partner?",
  line: "Tell us what you're moving and where. We'll come back with a quote.",
  button: "Get a Quote",
};
