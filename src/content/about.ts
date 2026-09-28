/**
 * About page — docs/03-pages.md and 04-content.md. Mission lines are "adapt after
 * client review". Milestones are omitted until the client provides dated ones.
 */
export const aboutPage = {
  title: "About RCS Logistic",
  intro:
    "An Odisha-based road transport and logistics company, built to give businesses across India a dependable partner for every load.",
  // TODO(client): review — longer founder story; add real details (year founded, early milestones) when supplied
  story: [
    "RCS Logistic was founded by Satya Sankar Swain with a clear vision to build a dependable and modern logistics network from Odisha to businesses across India.",
    "With a strong focus on reliability, operational excellence and long-term partnerships, we are committed to keeping India's supply chain moving.",
  ],
  mission: [
    { title: "Mission", body: "Deliver every load safely and on time, with clear updates at every step." },
    { title: "Partnership", body: "Build long-term partnerships with the businesses we serve." },
    { title: "Vision", body: "Grow a modern logistics network from Odisha that serves all of India." },
  ],
  /** Dated milestones — section renders only when this has entries. TODO(client) */
  milestones: [] as { year: string; text: string }[],
  // TODO(client): review — one sentence per trust item
  whyChoose: [
    { title: "Pan India Reach", body: "Headquartered in Odisha, moving goods for businesses across India." },
    { title: "Safe & Secure", body: "Your cargo is handled with care from loading to delivery." },
    {
      title: "Reliable Partner",
      body: "One point of contact and clear communication from quote to delivery.",
    },
    { title: "Sustainable Growth", body: "A growing network built on long-term relationships." },
  ],
};
