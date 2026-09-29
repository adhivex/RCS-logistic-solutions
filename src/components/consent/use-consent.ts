"use client";

import { useSyncExternalStore } from "react";
import { getConsentSnapshot, subscribeConsent, type Consent } from "@/lib/consent";

/**
 * The visitor's stored cookie choice (docs/09-cookie-consent.md), or null when they
 * haven't chosen yet. Always null during server rendering and hydration, so nothing
 * optional is ever rendered before the browser has read the cookie.
 */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribeConsent, getConsentSnapshot, () => null);
}

/** True once mounted in the browser (the banner must not flash for returning visitors). */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
