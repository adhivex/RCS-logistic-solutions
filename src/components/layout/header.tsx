"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";
import { MenuIcon } from "@/components/ui/icons";
import { company } from "@/content/company";
import { mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { LogoImage, logoWidth } from "./logo";

const LOGO_HEIGHT = 44;

/** Routes without a navy hero get the solid header from the start. */
const SOLID_ROUTES = ["/styleguide"];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * docs/02-design-system.md → Header: fixed and transparent over the navy hero
 * (white links, light logo); after 60px of scroll it turns frosted paper with dark
 * links and the dark logo (cross-faded), 84 → 70px. Below 880px: hamburger →
 * full-width drawer with large links and Get a Quote.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close the drawer on navigation.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || SOLID_ROUTES.some((route) => pathname.startsWith(route));
  const dark = solid || open; // dark text and logo

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-60 pt-[env(safe-area-inset-top)] transition-[background-color,box-shadow] duration-400 ease-brand",
        solid && "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-[14px]",
        open && "max-nav:bg-paper",
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-6 transition-[height] duration-400 ease-brand",
          solid ? "h-[70px]" : "h-[84px]",
        )}
      >
        <Link
          href="/"
          aria-label={`${company.name} home`}
          className="relative block h-11 shrink-0"
          style={{ width: logoWidth(LOGO_HEIGHT) }}
        >
          <LogoImage
            on="dark"
            height={LOGO_HEIGHT}
            eager
            className={cn("absolute inset-0 transition-opacity duration-300", dark && "opacity-0")}
          />
          <LogoImage
            on="light"
            height={LOGO_HEIGHT}
            eager
            decorative
            className={cn("absolute inset-0 transition-opacity duration-300", !dark && "opacity-0")}
          />
        </Link>

        <nav aria-label="Main" className="max-nav:hidden">
          <ul
            className={cn(
              "flex gap-[22px] text-sm font-medium transition-colors wide:gap-[34px]",
              solid ? "text-slate" : "text-white/86",
            )}
          >
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center py-1.5 transition-colors",
                      "after:absolute after:inset-x-0 after:bottom-2.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-350 after:ease-brand hover:after:scale-x-100",
                      active && (solid ? "text-ink after:scale-x-100" : "text-white after:scale-x-100"),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <QuoteButton size="sm" className="max-nav:hidden" />

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={open}
          aria-controls={drawerId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            "-mr-2 inline-flex size-11 items-center justify-center rounded-full nav:hidden",
            dark ? "text-ink" : "text-white",
          )}
        >
          {open ? (
            <X className="size-[26px]" strokeWidth={1.8} aria-hidden="true" />
          ) : (
            <MenuIcon className="size-[26px]" />
          )}
        </button>
      </div>

      <nav
        id={drawerId}
        aria-label="Mobile"
        hidden={!open}
        className="max-h-[calc(100dvh-84px)] overflow-y-auto border-t border-line bg-paper nav:hidden"
      >
        <div className="container-site grid pt-2 pb-[26px]">
          <ul>
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block border-b border-line py-3.5 font-display text-[22px] font-semibold tracking-[-0.02em] text-ink",
                      active && "text-orange-deep",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <QuoteButton className="mt-5 justify-between" onClick={() => setOpen(false)} />
        </div>
      </nav>
    </header>
  );
}
