/**
 * Services — docs/04-content.md → Services. Detail-page lists and FAQs are drafts:
 * every one is marked for client review and must avoid unconfirmed claims
 * (no capacities, transit times, tracking or insurance promises).
 */
import type { ServiceTypeValue } from "./quote";

export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  type: Exclude<ServiceTypeValue, "NOT_SURE">;
  name: string;
  oneLiner: string;
  /** Meta description, 140–160 chars (docs/06-seo-launch.md). */
  metaDescription: string;
  icon: "truck" | "boxes" | "warehouse" | "network";
  included: string[];
  whoFor: string[];
  faqs: Faq[];
};

/** "How it works" — the same four-step sequence on every service page. */
export const serviceSteps = [
  { title: "Request", body: "Share pickup and delivery cities, what you're moving and when." },
  { title: "Plan", body: "We confirm the vehicle, route and schedule, and send you a quote." },
  { title: "Move", body: "Your goods are loaded and moved to destination." },
  { title: "Deliver & confirm", body: "The consignment is delivered and delivery is confirmed with you." },
];

const quoteFaq: Faq = {
  question: "What details do you need for a quote?",
  answer:
    "Pickup and delivery cities, the type of cargo, approximate weight or volume, and your preferred pickup date. The more we know, the more accurate the quote.",
};

export const services: Service[] = [
  {
    slug: "full-truck-load",
    metaDescription:
      "Full truck load transport from Cuttack, Odisha: a dedicated vehicle for your cargo, point to point, with no transfers. Serving businesses across India.",
    type: "FULL_TRUCK_LOAD",
    name: "Full Truck Load",
    oneLiner: "A dedicated vehicle for your cargo, point to point, with no transfers along the way.",
    icon: "truck",
    // TODO(client): review "included" and FAQs
    included: [
      "A vehicle dedicated to your consignment",
      "Direct movement from pickup to delivery, without transfers",
      "Vehicle type matched to your load",
      "One point of contact from quote to delivery",
    ],
    whoFor: ["Steel & Metals", "Mining & Minerals", "Cement & Construction", "Chemicals & Industrial Goods"],
    faqs: [
      quoteFaq,
      {
        question: "When should I choose Full Truck Load over Part Truck Load?",
        answer:
          "When your consignment is large enough to use most of a vehicle, or when it should travel directly without sharing space with other cargo.",
      },
      {
        question: "Do you move loads outside Odisha?",
        answer: "Yes. We are based in Odisha and serve businesses across India.",
      },
    ],
  },
  {
    slug: "part-truck-load",
    metaDescription:
      "Part truck load (PTL) transport from Odisha: share space on scheduled routes and pay only for the capacity you use. B2B service across India.",
    type: "PART_TRUCK_LOAD",
    name: "Part Truck Load",
    oneLiner: "Share space on scheduled routes and pay only for the capacity you use.",
    icon: "boxes",
    // TODO(client): review "included" and FAQs
    included: [
      "Space on a shared vehicle for smaller consignments",
      "Pay for the capacity your shipment uses",
      "Suited to regular, smaller loads",
      "One point of contact from quote to delivery",
    ],
    whoFor: ["FMCG & Retail Distribution", "Agriculture & Food", "Chemicals & Industrial Goods"],
    faqs: [
      quoteFaq,
      {
        question: "How is Part Truck Load priced?",
        answer:
          "By the space and weight your shipment takes on the vehicle, and the route. Share your load details and we'll quote accordingly.",
      },
      {
        question: "Can I switch to a full truck if my volumes grow?",
        answer: "Yes. Tell us your new volumes and we'll quote for a dedicated vehicle instead.",
      },
    ],
  },
  {
    slug: "warehousing",
    metaDescription:
      "Warehousing and storage in Cuttack, Odisha from RCS Logistic: secure storage with inventory handling, ready to dispatch when your orders come in.",
    type: "WAREHOUSING",
    name: "Warehousing & Storage",
    oneLiner: "Secure storage with inventory handling, ready to dispatch when your orders come in.",
    icon: "warehouse",
    // TODO(client): review "included" and FAQs; confirm warehouse location(s)
    included: [
      "Storage for goods between production, transit and delivery",
      "Inventory handling",
      "Dispatch when your orders come in",
      "Storage combined with onward transport",
    ],
    whoFor: ["FMCG & Retail Distribution", "Agriculture & Food", "Cement & Construction"],
    faqs: [
      quoteFaq,
      {
        question: "Can storage be combined with transport?",
        answer: "Yes. Goods can be stored and then dispatched on our vehicles when you're ready.",
      },
      {
        question: "Where is the warehouse?",
        answer: "TODO(client): warehouse location(s)",
      },
    ],
  },
  {
    slug: "supply-chain",
    metaDescription:
      "Supply chain solutions from RCS Logistic in Cuttack, Odisha: route planning and coordination across vendors, plants and distributors in India.",
    type: "SUPPLY_CHAIN",
    name: "Supply Chain Solutions",
    oneLiner: "Route planning and coordination across vendors, plants and distributors.",
    icon: "network",
    // TODO(client): review "included" and FAQs
    included: [
      "Route planning across vendors, plants and distributors",
      "Coordinated transport and storage",
      "A plan built around your recurring loads",
      "One point of contact as requirements change",
    ],
    whoFor: ["Steel & Metals", "FMCG & Retail Distribution", "Mining & Minerals"],
    faqs: [
      quoteFaq,
      {
        question: "What does supply chain support involve?",
        answer:
          "We look at how your goods move today — between vendors, plants and distributors — and plan transport and storage around it.",
      },
      {
        question: "Is this only for large businesses?",
        answer: "No. It suits any business with recurring loads between several points.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
