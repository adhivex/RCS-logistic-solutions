/**
 * The four confirmed services — single source for names, slugs and copy.
 * Use these exact names everywhere (nav, cards, page titles, schema, form options).
 * Do not add services without client confirmation.
 *
 * Page copy describes what each service type is. It deliberately contains no
 * capacity figures, coverage lists, transit times or vehicle counts — add those
 * only once the client confirms them.
 */
export type ServiceType = "FTL" | "PTL" | "WAREHOUSING" | "SUPPLY_CHAIN";

export type Service = {
  type: ServiceType;
  /** Display name, e.g. "Full Truck Load" */
  name: string;
  /** Short label, e.g. "FTL" */
  shortLabel: string;
  /** URL segment under /services */
  slug: string;
  href: `/services/${string}`;
  /** Value for `/get-a-quote?service=…` */
  param: string;
  summary: string;
  /** Service page intro paragraph */
  intro: string;
  whoFor: string[];
  steps: { title: string; body: string }[];
};

export const services = [
  {
    type: "FTL",
    name: "Full Truck Load",
    shortLabel: "FTL",
    slug: "full-truck-load",
    href: "/services/full-truck-load",
    param: "ftl",
    summary: "Dedicated vehicles for full consignments, moving directly from pickup to delivery.",
    intro:
      "With Full Truck Load, your consignment has a vehicle to itself. It is loaded at your pickup point and moves directly to the delivery point, without sharing space with other cargo.",
    whoFor: [
      "Businesses with consignments large enough to use a whole vehicle",
      "Shipments that should travel directly, without stops to load other cargo",
      "Goods that are better kept separate from other consignments",
    ],
    steps: [
      { title: "Share your requirement", body: "Pickup and delivery locations, load details and preferred date." },
      { title: "Get a quote", body: "We review the requirement and respond with a quote." },
      { title: "Loading & transit", body: "A vehicle is arranged, loaded at pickup and moved to destination." },
      { title: "Delivery", body: "The consignment is delivered and delivery is confirmed." },
    ],
  },
  {
    type: "PTL",
    name: "Part Truck Load",
    shortLabel: "PTL",
    slug: "part-truck-load",
    href: "/services/part-truck-load",
    param: "ptl",
    summary: "Share vehicle space and pay for the capacity your shipment uses.",
    intro:
      "Part Truck Load is for shipments that don't need a whole vehicle. Your goods share space with other consignments, so you pay for the capacity your shipment actually uses.",
    whoFor: [
      "Businesses whose shipments don't fill a vehicle",
      "Regular smaller consignments where a dedicated vehicle isn't cost-effective",
      "Palletised or packed goods that can travel alongside other cargo",
    ],
    steps: [
      { title: "Share your requirement", body: "Pickup and delivery locations, and the size and weight of your load." },
      { title: "Get a quote", body: "We review the requirement and respond with a quote." },
      { title: "Pickup & transit", body: "Your goods are collected and moved with other consignments." },
      { title: "Delivery", body: "The consignment is delivered and delivery is confirmed." },
    ],
  },
  {
    type: "WAREHOUSING",
    name: "Warehousing & Storage",
    shortLabel: "Warehousing",
    slug: "warehousing",
    href: "/services/warehousing",
    param: "warehousing",
    summary: "Storage support for goods between production, transit and delivery.",
    intro:
      "Warehousing & Storage gives your goods a place to wait between production, transit and delivery — so stock can be held until it is needed and dispatched when you are ready.",
    whoFor: [
      "Businesses that need to hold stock between production and delivery",
      "Consignments that arrive before they can be delivered",
      "Businesses combining storage with onward transport",
    ],
    steps: [
      { title: "Share your requirement", body: "What you need stored, how much, and for roughly how long." },
      { title: "Get a quote", body: "We review the requirement and respond with a quote." },
      { title: "Receiving & storage", body: "Goods are received and stored until they are needed." },
      { title: "Dispatch", body: "Goods are dispatched for onward delivery when you request it." },
    ],
  },
  {
    type: "SUPPLY_CHAIN",
    name: "Supply Chain Solutions",
    shortLabel: "Supply chain",
    slug: "supply-chain",
    href: "/services/supply-chain",
    param: "supply-chain",
    summary: "Coordinated transport and storage planning around your business's supply needs.",
    intro:
      "Supply Chain Solutions brings transport and storage together into one plan, built around how your business moves goods — rather than arranging each shipment on its own.",
    whoFor: [
      "Businesses moving goods regularly between several points",
      "Operations that combine transport and storage",
      "Teams that want one point of contact for planning their logistics",
    ],
    steps: [
      { title: "Share your requirement", body: "How your goods move today and what you need from a partner." },
      { title: "Plan together", body: "We review your requirement and discuss a plan and quote with you." },
      { title: "Transport & storage", body: "Shipments and storage are arranged according to the plan." },
      { title: "Ongoing coordination", body: "One point of contact stays with you as requirements change." },
    ],
  },
] as const satisfies readonly Service[];

export function getService(slug: string): Service {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Unknown service slug: ${slug}`);
  return service;
}

/** Map a `?service=` query value to a service type, if valid. */
export function serviceTypeFromParam(param: string | string[] | undefined): ServiceType | undefined {
  const value = Array.isArray(param) ? param[0] : param;
  return services.find((item) => item.param === value?.toLowerCase())?.type;
}
