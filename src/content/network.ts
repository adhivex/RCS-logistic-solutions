import { fleet } from "./fleet";
import { services } from "./services";

/**
 * Network and numbers — docs/04-content.md. Never estimate: unverified figures stay
 * `TODO(client)` (shown as placeholders in development, omitted in production).
 */
export type Stat = { value: string; label: string };

const twoDigits = (n: number) => String(n).padStart(2, "0");

/** Homepage NumbersStrip (preview order). Service lines and vehicle classes are counted from content. */
export const numbersStrip: Stat[] = [
  // The preview shows "28+" — unverified. TODO(client): real figures (years, vehicles, loads/month)
  { value: "TODO(client): cities served (preview shows 28+)", label: "Major cities" },
  { value: twoDigits(services.length), label: "Service lines" },
  { value: twoDigits(fleet.length), label: "Vehicle classes" },
  { value: "Pan", label: "India reach" },
];

/** /network stat panel — the strongest three verified figures. */
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
