"use client";

import { useEffect } from "react";
import { UTM_COOKIE, UTM_MAX_AGE, utmFromSearch } from "@/lib/utm";

/**
 * Stores UTM parameters in a cookie (first touch wins). Rendered only with analytics
 * consent (ConsentScripts), so nothing is stored before the visitor opts in.
 * Renders nothing.
 */
export function UtmCapture() {
  useEffect(() => {
    if (document.cookie.split("; ").some((entry) => entry.startsWith(`${UTM_COOKIE}=`))) return;
    const utm = utmFromSearch(window.location.search);
    if (!utm) return;
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${UTM_COOKIE}=${encodeURIComponent(JSON.stringify(utm))}; Max-Age=${UTM_MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  }, []);
  return null;
}
