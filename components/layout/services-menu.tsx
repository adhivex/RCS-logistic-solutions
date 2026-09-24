"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * Desktop "Services" disclosure. Uses the disclosure pattern (button + list of
 * links) rather than an ARIA menu, which is the recommended pattern for site navigation.
 */
export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isActive = pathname.startsWith("/services");

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        // Close when keyboard focus leaves the whole disclosure.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-10 items-center gap-1 rounded-md px-3 text-[0.9375rem] font-medium text-navy transition-colors hover:text-action-orange",
          isActive && "text-action-orange",
        )}
      >
        Services
        <ChevronDown
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 z-50 mt-2 w-[26rem] -translate-x-1/2 rounded-lg border border-border bg-white p-2 shadow-lg shadow-navy/5"
      >
        <ul className="grid gap-1">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={service.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === service.href ? "page" : undefined}
                className="group block rounded-md px-3 py-2.5 transition-colors hover:bg-surface aria-[current=page]:bg-surface"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-navy">{service.name}</span>
                  <span className="text-xs font-semibold tracking-wide text-muted-foreground">
                    {service.shortLabel}
                  </span>
                </span>
                <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
                  {service.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-1 border-t border-border px-3 pt-2.5 pb-1.5">
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="text-sm font-semibold text-action-orange underline-offset-4 hover:underline"
          >
            All services
          </Link>
        </div>
      </div>
    </div>
  );
}
