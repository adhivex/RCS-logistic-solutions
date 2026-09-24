/**
 * Confirmed-safe points only (docs/content.md → Why RCS). If the client confirms
 * specifics such as tracking, insurance or GPS, they replace these — never add them unconfirmed.
 */
export type WhyRcsIcon = "b2b" | "communication" | "flexible" | "roots";

export const whyRcs: { icon: WhyRcsIcon; title: string; body: string }[] = [
  {
    icon: "b2b",
    title: "B2B focus",
    body: "Built around the needs of businesses, not one-off parcels.",
  },
  {
    icon: "communication",
    title: "Clear communication",
    body: "One point of contact from quote to delivery.",
  },
  {
    icon: "flexible",
    title: "Flexible options",
    body: "Full loads, part loads and storage, depending on what your shipment needs.",
  },
  {
    icon: "roots",
    title: "Odisha roots, India reach",
    body: "Headquartered in Odisha, serving businesses across India.",
  },
];
