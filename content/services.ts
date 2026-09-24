/**
 * The four confirmed services — single source for names, slugs and copy.
 * Use these exact names everywhere (nav, cards, page titles, schema, form options).
 * Do not add services without client confirmation.
 */
export type ServiceType = "FTL" | "PTL" | "WAREHOUSING" | "SUPPLY_CHAIN";

export type Service = {
  type: ServiceType;
  /** Display name, e.g. "Full Truck Load" */
  name: string;
  /** Short label, e.g. "FTL" */
  shortLabel: string;
  /** URL segment under /services, also used as the `?service=` query value */
  slug: string;
  href: `/services/${string}`;
  summary: string;
};

export const services = [
  {
    type: "FTL",
    name: "Full Truck Load",
    shortLabel: "FTL",
    slug: "full-truck-load",
    href: "/services/full-truck-load",
    summary: "Dedicated vehicles for full consignments, moving directly from pickup to delivery.",
  },
  {
    type: "PTL",
    name: "Part Truck Load",
    shortLabel: "PTL",
    slug: "part-truck-load",
    href: "/services/part-truck-load",
    summary: "Share vehicle space and pay for the capacity your shipment uses.",
  },
  {
    type: "WAREHOUSING",
    name: "Warehousing & Storage",
    shortLabel: "Warehousing",
    slug: "warehousing",
    href: "/services/warehousing",
    summary: "Storage support for goods between production, transit and delivery.",
  },
  {
    type: "SUPPLY_CHAIN",
    name: "Supply Chain Solutions",
    shortLabel: "Supply chain",
    slug: "supply-chain",
    href: "/services/supply-chain",
    summary: "Coordinated transport and storage planning around your business's supply needs.",
  },
] as const satisfies readonly Service[];
