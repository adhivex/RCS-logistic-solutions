/**
 * UTM capture (docs/05-data-and-api.md → Analytics): the first visit's utm_source,
 * utm_medium and utm_campaign are stored in a first-party cookie and attached to
 * the quote submission.
 */
export const UTM_COOKIE = "rcs_utm";
export const UTM_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export type Utm = { source?: string; medium?: string; campaign?: string };

const clean = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, 120) : undefined;

export function utmFromSearch(search: string): Utm | null {
  const params = new URLSearchParams(search);
  const utm: Utm = {
    source: clean(params.get("utm_source")),
    medium: clean(params.get("utm_medium")),
    campaign: clean(params.get("utm_campaign")),
  };
  return utm.source || utm.medium || utm.campaign ? utm : null;
}

export function parseUtmCookie(value: string | undefined): Utm {
  if (!value) return {};
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Record<string, unknown>;
    return { source: clean(parsed.source), medium: clean(parsed.medium), campaign: clean(parsed.campaign) };
  } catch {
    return {};
  }
}
