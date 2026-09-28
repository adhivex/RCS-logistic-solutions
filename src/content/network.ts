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

export type City = { name: string; state: string; lon: number; lat: number };

/** Home base, always shown on the map (Choudwar, Cuttack district). */
export const homeBase: City = { name: "Choudwar, Cuttack", state: "Odisha", lon: 85.93, lat: 20.52 };

/** TODO(client): list of cities served — add name, state and coordinates for each. */
export const citiesServed: City[] = [];

/** TODO(client): key routes / corridors, e.g. "Cuttack → Kolkata". */
export const keyRoutes: string[] = [];
