/**
 * Candidate list from docs/content.md — NOT confirmed. The client must say which
 * they actually serve; move those into `industriesServed` and set
 * `features.industries = true` in lib/site-config.ts.
 */
export const candidateIndustries = [
  "Steel & metals",
  "Cement",
  "FMCG",
  "Manufacturing",
  "Agriculture",
  "Construction",
  "E-commerce & retail",
  "Other B2B industries",
] as const;

export const industriesServed: string[] = [];

export const industriesIntro = {
  heading: "Industries we work with",
  body: "Logistics support for businesses across these sectors.",
} as const;
