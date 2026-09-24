/**
 * Homepage copy. Approved direction from docs/content.md — client approval of
 * hero, founder message and service descriptions is tracked in docs/open-questions.md.
 */

export const hero = {
  headline: "Reliable logistics for a stronger tomorrow",
  supporting:
    "RCS Logistic Solutions helps businesses move goods with dependable, efficient logistics support — from full truck loads to warehousing.",
} as const;

export type CapabilityIcon = "odisha" | "b2b" | "loads" | "warehousing";

/** Non-numeric, confirmed facts only. Replaced by the metrics strip when `features.metrics` is on. */
export const capabilities: { icon: CapabilityIcon; label: string }[] = [
  { icon: "odisha", label: "Based in Odisha" },
  { icon: "b2b", label: "Built for B2B" },
  { icon: "loads", label: "Full & part truck loads" },
  { icon: "warehousing", label: "Warehousing & supply chain" },
];

export const servicesIntro = {
  heading: "Logistics support shaped around your shipment",
  body: "Choose a dedicated vehicle, share space on one, or add storage and planning between production and delivery.",
} as const;

export const whyRcsIntro = {
  heading: "Why businesses work with RCS",
  body: "A logistics partner built for business shipments — clear, flexible and rooted in Odisha.",
} as const;

export const processIntro = {
  heading: "How it works",
  body: "From your first message to a confirmed delivery, in four steps.",
} as const;

export const quoteCta = {
  heading: "Tell us what you need to move",
  body: "Share pickup, delivery and load details, and our team will get back to you with a quote.",
} as const;
