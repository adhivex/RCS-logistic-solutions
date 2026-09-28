/**
 * Inner-page copy (docs/03-pages.md). Short intros are drafts — TODO(client): review.
 * Meta descriptions follow docs/06-seo-launch.md (140–160 chars, Odisha B2B terms).
 */
export const pages = {
  about: {
    description:
      "RCS Logistic Solutions is a B2B transport company from Choudwar, Cuttack, founded by Satya Sankar Swain to move goods for businesses in Odisha and across India.",
  },
  fleet: {
    title: "Our Fleet",
    intro: "Semi-trailers, box trucks and light commercial vehicles — matched to what you're moving.",
    description:
      "Semi-trailer trucks, box trucks and light commercial vehicles for full and part truck loads from Odisha. Tell us your load and RCS Logistic matches the vehicle.",
    cta: {
      heading: "Not sure which vehicle you need?",
      line: "Tell us the load — what it is, how much, and where it's going. We'll suggest the right vehicle.",
    },
  },
  services: {
    title: "Our Services",
    intro:
      "Full and part truck loads, warehousing and supply chain support for businesses in Odisha and across India.",
    description:
      "Full truck load, part truck load, warehousing and supply chain solutions from RCS Logistic, a B2B transport company in Cuttack, Odisha serving all of India.",
  },
  industries: {
    title: "Industries We Serve",
    intro: "What we move for steel, mining, cement, FMCG, agriculture and industrial businesses.",
    description:
      "Truck transport for steel, mining, cement, FMCG, agriculture and chemical businesses in Odisha and eastern India, from RCS Logistic in Cuttack.",
  },
  network: {
    title: "Our Network",
    intro: "Headquartered in Choudwar, Cuttack — moving goods from Odisha to markets across India.",
    description:
      "RCS Logistic's road network from Cuttack, Odisha to markets across India: coverage map, cities served and key freight routes for B2B truck transport.",
    mapHeading: "Coverage",
    routesHeading: "Key routes",
  },
  contact: {
    title: "Contact & Get a Quote",
    intro: "Call, WhatsApp or send the form — tell us what you're moving and where.",
    description:
      "Contact RCS Logistic in Choudwar, Cuttack, Odisha: call or WhatsApp +91 99388 74147, email info@rcsls.in, or request a truck transport quote online.",
    detailsHeading: "Talk to us",
    formHeading: "Request a quote",
  },
  thankYou: {
    title: "Quote request received",
    body: "Thank you. Our team will review your requirement and contact you on the phone number you gave us.",
    nextHeading: "What happens next",
    next: [
      "We review your pickup, delivery and load details.",
      "We call you to confirm anything we need and share a quote.",
      "Once you confirm, we schedule the pickup.",
    ],
    urgent: "Need to talk sooner? Call us:",
  },
  notFound: {
    title: "This stop isn't on our route",
    body: "The page may have moved, or the link may be mistyped. Try one of these instead:",
  },
} as const;
