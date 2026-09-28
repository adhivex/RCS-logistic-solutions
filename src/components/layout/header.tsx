"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";
import { mainNav } from "@/content";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * docs/02-design-system.md → Header: sticky, white, shadow after 40px of scroll,
 * active link underlined in orange. Below 860px: hamburger → drawer, while
 * "Get a Quote" stays visible in the bar.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-shadow duration-200",
        (scrolled || open) && "shadow-header",
      )}
    >
      <div className="container-site flex h-[76px] items-center justify-between gap-6">
        <Link href="/" className="shrink-0 rounded-sm" aria-label="RCS Logistic — home">
          <Logo eager className="h-9! w-auto! nav:h-11!" />
        </Link>

        <nav aria-label="Main" className="hidden nav:block">
          <ul className="flex items-center gap-5 text-sm font-medium text-brand-ink lg:gap-[30px]">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center py-1.5 transition-colors hover:text-action",
                      "after:absolute after:right-0 after:bottom-1.5 after:left-0 after:h-0.5 after:bg-brand-orange after:opacity-0",
                      active && "after:opacity-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <QuoteButton size="sm" arrow={false} className="nav:hidden">
            Get a Quote
          </QuoteButton>
          <QuoteButton className="hidden nav:inline-flex" />
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls={drawerId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-button text-brand-ink nav:hidden"
          >
            {open ? (
              <X className="size-[26px]" aria-hidden="true" />
            ) : (
              <Menu className="size-[26px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <nav
        id={drawerId}
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-brand-line bg-white nav:hidden"
      >
        <ul className="container-site grid pt-2 pb-5">
          {mainNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex min-h-12 items-center border-b border-brand-line font-medium text-brand-ink",
                    active && "text-action",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
