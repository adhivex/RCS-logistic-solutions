/**
 * Cookie consent (docs/09-cookie-consent.md). The choice lives in a first-party
 * cookie so the server can read it too (e.g. before sending a server-side
 * analytics event). Bump CONSENT_VERSION when categories or vendors change —
 * an older stored version means "ask again".
 */
export const CONSENT_COOKIE = "rcs-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE = 15_552_000; // 6 months, in seconds

/** Window event that reopens the preferences dialog (footer "Cookie settings"). */
export const OPEN_COOKIE_SETTINGS = "rcs:cookie-settings";

export type Consent = {
  v: number;
  analytics: boolean;
  marketing: boolean;
  ts: string;
};

/** Parse a stored cookie value; null when missing, malformed or an old version. */
export function parseConsent(value: string | undefined | null): Consent | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<Consent>;
    if (parsed?.v !== CONSENT_VERSION) return null;
    return {
      v: CONSENT_VERSION,
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      ts: typeof parsed.ts === "string" ? parsed.ts : "",
    };
  } catch {
    return null;
  }
}

export function makeConsent(analytics: boolean, marketing: boolean, now = new Date()): Consent {
  return { v: CONSENT_VERSION, analytics, marketing, ts: now.toISOString() };
}

export function serializeConsent(consent: Consent): string {
  return encodeURIComponent(JSON.stringify(consent));
}

/* ── Browser store: read/write the cookie and notify subscribers ───────────── */

type Listener = () => void;
const listeners = new Set<Listener>();
let cachedRaw: string | undefined;
let cachedConsent: Consent | null = null;

function readCookie(): string | undefined {
  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
}

/** Current consent in the browser (stable object between changes, for useSyncExternalStore). */
export function getConsentSnapshot(): Consent | null {
  const raw = readCookie();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedConsent = parseConsent(raw);
  }
  return cachedConsent;
}

export function subscribeConsent(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function saveConsent(analytics: boolean, marketing: boolean): Consent {
  const consent = makeConsent(analytics, marketing);
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${serializeConsent(consent)}; Max-Age=${CONSENT_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  for (const listener of listeners) listener();
  return consent;
}
