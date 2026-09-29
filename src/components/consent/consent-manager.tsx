"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { CookieIcon } from "@/components/ui/icons";
import { cookieConsentCopy as copy } from "@/content/consent";
import { getConsentSnapshot, OPEN_COOKIE_SETTINGS, saveConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";
import { ConsentScripts } from "./consent-scripts";
import { useConsent, useIsClient } from "./use-consent";

const choiceButton =
  "h-11 cursor-pointer rounded-full border border-ink font-body text-sm font-semibold transition-colors";
const outline = `${choiceButton} bg-white text-ink hover:bg-paper`;
const solid = `${choiceButton} bg-ink text-white hover:bg-[#0f1a28]`;

/**
 * Cookie consent (docs/09-cookie-consent.md), ported from the preview:
 * - banner on first visit (after a short delay) until the visitor chooses;
 *   "Reject optional" and "Accept all" are equal in size and weight;
 * - "Customise preferences" / footer "Cookie settings" open the preferences dialog;
 * - while the banner is visible, body.ck-open hides the mobile quick bar;
 * - optional scripts load only for granted categories (ConsentScripts).
 */
export function ConsentManager() {
  const consent = useConsent();
  const isClient = useIsClient();
  const [delayed, setDelayed] = useState(false);
  const [shown, setShown] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const undecided = isClient && consent === null;
  const bannerOpen = undecided && delayed;

  // Show the banner shortly after load (preview: 900ms), then slide it in.
  useEffect(() => {
    if (!undecided) return;
    const timer = window.setTimeout(() => setDelayed(true), 900);
    return () => window.clearTimeout(timer);
  }, [undecided]);

  useEffect(() => {
    document.body.classList.toggle("ck-open", bannerOpen);
    if (!bannerOpen) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
    return () => cancelAnimationFrame(frame);
  }, [bannerOpen]);

  // Footer "Cookie settings" (and the privacy page) reopen the preferences.
  useEffect(() => {
    const open = () => {
      const current = getConsentSnapshot();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, open);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, open);
  }, []);

  function decide(nextAnalytics: boolean, nextMarketing: boolean) {
    saveConsent(nextAnalytics, nextMarketing);
    dialogRef.current?.close();
  }

  return (
    <>
      <ConsentScripts />

      {bannerOpen && (
        <div
          role="region"
          aria-label={copy.bannerLabel}
          className={cn(
            "fixed inset-x-2.5 bottom-2.5 z-70 rounded-2xl border border-line bg-white px-[18px] pt-[18px] pb-3.5 text-slate shadow-cookie transition-[transform,opacity] duration-500 ease-brand sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[min(420px,calc(100%-48px))] sm:rounded-[18px] sm:px-[22px] sm:pt-[22px] sm:pb-[18px]",
            shown ? "translate-y-0 opacity-100" : "translate-y-[calc(100%+40px)] opacity-0",
          )}
        >
          <div className="mb-2 flex items-center gap-2.5">
            <CookieIcon className="size-[22px] text-orange" />
            <h2 className="text-[17px] tracking-[-0.01em]">{copy.title}</h2>
          </div>
          <p className="mt-0 mb-4 text-sm leading-[1.55]">
            {copy.body}{" "}
            <Link href="/privacy#cookies" className="text-ink underline underline-offset-2">
              {copy.policyLink}
            </Link>
            .
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className={outline} onClick={() => decide(false, false)}>
              {copy.reject}
            </button>
            <button type="button" className={solid} onClick={() => decide(true, true)}>
              {copy.accept}
            </button>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
            className="mx-auto mt-3 block min-h-6 cursor-pointer text-[13px] font-semibold text-slate underline underline-offset-[3px] hover:text-ink"
          >
            {copy.customise}
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-prefs-title"
        onClick={(event) => {
          if (event.target === dialogRef.current) dialogRef.current.close();
        }}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(560px,calc(100%-32px))] overflow-y-auto rounded-2xl bg-white p-0 text-slate shadow-dialog"
      >
        <div className="flex items-start justify-between gap-5 px-6 pt-[26px] pb-1 sm:px-8 sm:pt-[30px]">
          <div>
            <h2 id="cookie-prefs-title" className="text-[32px] tracking-[-0.04em]">
              {copy.prefsTitle}
            </h2>
            <p className="mt-1.5 mb-0 text-sm">{copy.prefsIntro}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-[38px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-line"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="px-6 pt-2.5 pb-1 sm:px-8 sm:pt-3.5 sm:pb-2">
          {copy.categories.map((category) => {
            const locked = category.key === "essential";
            const checked = locked ? true : category.key === "analytics" ? analytics : marketing;
            const id = `cookie-${category.key}`;
            return (
              <div
                key={category.key}
                className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-1.5 border-b border-line py-4 last:border-b-0"
              >
                <label htmlFor={id} className="font-display text-base font-bold text-ink">
                  {category.title}
                </label>
                <span className="relative col-start-2 row-span-2 h-[26px] w-[46px]">
                  <input
                    id={id}
                    type="checkbox"
                    role="switch"
                    checked={checked}
                    disabled={locked}
                    aria-describedby={`${id}-desc`}
                    onChange={(event) =>
                      category.key === "analytics"
                        ? setAnalytics(event.target.checked)
                        : setMarketing(event.target.checked)
                    }
                    className="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-field transition-colors duration-250 peer-checked:bg-orange-deep peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-orange peer-disabled:opacity-55 after:absolute after:top-[3px] after:left-[3px] after:size-5 after:rounded-full after:bg-white after:shadow-[0_1px_3px_rgb(0_0_0/0.2)] after:transition-transform after:duration-250 after:ease-brand peer-checked:after:translate-x-5"
                  />
                </span>
                <p id={`${id}-desc`} className="col-start-1 m-0 text-[13.5px] leading-normal">
                  {category.body}
                </p>
              </div>
            );
          })}
        </div>
        <div className="grid gap-2 px-6 pt-3 pb-6 sm:grid-cols-2 sm:px-8 sm:pb-7">
          <button type="button" className={outline} onClick={() => decide(false, false)}>
            {copy.reject}
          </button>
          <button type="button" className={solid} onClick={() => decide(analytics, marketing)}>
            {copy.save}
          </button>
        </div>
      </dialog>
    </>
  );
}
