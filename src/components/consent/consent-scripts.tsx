"use client";

import { Analytics } from "@vercel/analytics/next";
import { UtmCapture } from "@/components/quote/utm-capture";
import { useConsent } from "./use-consent";

/**
 * Optional scripts render only for the granted category (docs/09-cookie-consent.md).
 * Analytics: Vercel Web Analytics and first-visit UTM capture. Marketing: nothing is
 * installed yet — add ad pixels here behind `consent.marketing` (and, for Google
 * tags, Consent Mode v2 defaults set to "denied"), then list them on /privacy.
 */
export function ConsentScripts() {
  const consent = useConsent();
  if (!consent?.analytics) return null;
  return (
    <>
      <Analytics />
      <UtmCapture />
    </>
  );
}
