import type { Heading } from "./home";

/**
 * About page — docs/03-pages.md and 04-content.md. Mission lines are "adapt after
 * client review". Milestones are omitted until the client provides dated ones.
 */
export const aboutPage = {
  storyLabel: "Our Founder",
  storyHeading: { lead: "Driven by purpose, built for a", accent: "bigger tomorrow." } satisfies Heading,
  // Long version from docs/04-content.md. TODO(client): review; add year founded and early milestones when supplied
  story: [
    "RCS Logistic Solutions was founded by Satya Sankar Swain with a clear vision to build a dependable and modern logistics network from Odisha to businesses across India.",
    "With a strong focus on reliability, operational excellence and long-term partnerships, we are committed to keeping India's supply chain moving.",
  ],
  quote: "Building a dependable logistics network from Odisha for businesses across India.",
  missionLabel: "What drives us",
  missionHeading: { lead: "Mission, partnership and", accent: "vision." } satisfies Heading,
  mission: [
    { title: "Mission", body: "Deliver every load safely and on time, with clear updates at every step." },
    { title: "Partnership", body: "Build long-term partnerships with the businesses we serve." },
    { title: "Vision", body: "Grow a modern logistics network from Odisha that serves all of India." },
  ],
  /** Dated milestones — section renders only when this has entries. TODO(client) */
  milestones: [] as { year: string; text: string }[],
  whyLabel: "Why RCS",
  whyHeading: { lead: "Why customers choose", accent: "RCS." } satisfies Heading,
  // TODO(client): review — one sentence per trust item
  whyChoose: [
    { title: "Pan India Reach", body: "Headquartered in Odisha, moving goods for customers across India." },
    { title: "Safe & Secure", body: "Your cargo is handled with care from loading to delivery." },
    {
      title: "Reliable Partner",
      body: "One point of contact and clear communication from quote to delivery.",
    },
    { title: "Sustainable Growth", body: "A growing network built on long-term relationships." },
  ],
};
