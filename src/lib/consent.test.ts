import { describe, expect, it } from "vitest";
import { CONSENT_VERSION, makeConsent, parseConsent, serializeConsent } from "./consent";

describe("cookie consent value", () => {
  it("round-trips through the cookie encoding", () => {
    const consent = makeConsent(true, false, new Date("2026-09-29T10:00:00Z"));
    expect(parseConsent(serializeConsent(consent))).toEqual({
      v: CONSENT_VERSION,
      analytics: true,
      marketing: false,
      ts: "2026-09-29T10:00:00.000Z",
    });
  });

  it("treats a missing or malformed cookie as no choice", () => {
    expect(parseConsent(undefined)).toBeNull();
    expect(parseConsent("")).toBeNull();
    expect(parseConsent("not-json")).toBeNull();
  });

  it("asks again when the stored version is old", () => {
    const old = encodeURIComponent(JSON.stringify({ v: CONSENT_VERSION - 1, analytics: true, marketing: true }));
    expect(parseConsent(old)).toBeNull();
  });

  it("only grants a category on an explicit true", () => {
    const loose = encodeURIComponent(JSON.stringify({ v: CONSENT_VERSION, analytics: "yes", marketing: 1 }));
    expect(parseConsent(loose)).toMatchObject({ analytics: false, marketing: false });
  });
});
