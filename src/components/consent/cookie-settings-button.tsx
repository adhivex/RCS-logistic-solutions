"use client";

import { OPEN_COOKIE_SETTINGS } from "@/lib/consent";

/**
 * Footer "Cookie settings" (docs/09-cookie-consent.md): reopens the preferences
 * dialog at any time, so withdrawing consent is as easy as giving it.
 */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      className="cursor-pointer text-left transition-colors hover:text-white"
    >
      Cookie settings
    </button>
  );
}
