/**
 * Industries — docs/04-content.md. TODO(client): confirm which of these RCS actually
 * serves; remove any that don't apply before launch.
 */
export type IndustryIcon = "steel" | "mining" | "cement" | "fmcg" | "agri" | "chemicals";

export type Industry = { slug: string; name: string; icon: IndustryIcon; description: string };

export const industries: Industry[] = [
  {
    slug: "steel-metals",
    name: "Steel & Metals",
    icon: "steel",
    description: "Coils, plates, bars and fabricated steel moved between plants, stockyards and buyers.",
  },
  {
    slug: "mining-minerals",
    name: "Mining & Minerals",
    icon: "mining",
    description: "Bulk minerals and ores moved from mines and processing units to where they're needed.",
  },
  {
    slug: "cement-construction",
    name: "Cement & Construction",
    icon: "cement",
    description: "Cement, building materials and site supplies delivered to projects and dealers.",
  },
  {
    slug: "fmcg-retail",
    name: "FMCG & Retail Distribution",
    icon: "fmcg",
    description: "Packaged goods moved from manufacturers and depots to distributors and retailers.",
  },
  {
    slug: "agriculture-food",
    name: "Agriculture & Food",
    icon: "agri",
    description: "Agricultural produce and food products moved from source to market.",
  },
  {
    slug: "chemicals-industrial",
    name: "Chemicals & Industrial Goods",
    icon: "chemicals",
    description: "Industrial goods and packaged chemicals moved between suppliers, plants and customers.",
  },
];
