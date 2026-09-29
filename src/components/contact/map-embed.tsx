"use client";

import { useState } from "react";
import { MapPinned } from "lucide-react";
import { PinIcon } from "@/components/ui/icons";

/**
 * Click-to-load Google Map (docs/12-decisions.md → D-23). The embed pulls ~500 KB of
 * Google scripts and sets Google's own cookies, so it loads only when the visitor
 * asks for it; until then a plain link opens the location in Google Maps.
 */
export function MapEmbed({
  query,
  title,
  address,
  copy,
}: {
  query: string;
  title: string;
  address: string;
  copy: { show: string; note: string; open: string };
}) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(query);

  if (loaded) {
    return (
      <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-white">
        <iframe
          title={title}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full border-0"
        />
      </div>
    );
  }

  return (
    <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-line bg-[radial-gradient(circle_at_30%_30%,var(--color-orange-soft),transparent_60%),#fff] p-6 text-center">
      <div>
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-orange-soft text-orange">
          <PinIcon className="size-7" />
        </span>
        <p className="m-0 font-medium text-ink">{address}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-2"
          >
            <MapPinned className="size-4" aria-hidden="true" />
            {copy.show}
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
          >
            {copy.open}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <p className="mt-3 mb-0 text-xs text-muted">{copy.note}</p>
      </div>
    </div>
  );
}
