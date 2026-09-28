/**
 * Network — docs/04-content.md. Stats, cities and routes are all to come from the
 * client. Never estimate: until verified numbers arrive, the stat band shows
 * placeholders in development and is hidden in production.
 */
export type Stat = { value: string; label: string };

export const networkStats: Stat[] = [
  { value: "TODO(client): stat 1", label: "e.g. years in business" },
  { value: "TODO(client): stat 2", label: "e.g. vehicles in fleet" },
  { value: "TODO(client): stat 3", label: "e.g. cities served" },
];

/** Home base, always shown on the map. */
export const homeBase = { name: "Cuttack (Choudwar)", region: "Odisha" } as const;

export type City = { name: string; state: string };

/** TODO(client): list of cities served. */
export const citiesServed: City[] = [];

/** TODO(client): key routes / corridors, e.g. "Cuttack → Kolkata". */
export const keyRoutes: string[] = [];
