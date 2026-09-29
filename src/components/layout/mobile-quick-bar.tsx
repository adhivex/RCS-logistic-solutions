"use client";

import { useEffect, useState } from "react";
import { QUOTE_HREF } from "@/components/quote/quote-button";
import { PhoneIcon } from "@/components/ui/icons";
import { company } from "@/content/company";
import { cn } from "@/lib/utils";

/**
 * docs/02-design-system.md → MobileQuickBar: mobile only, fixed bottom, Call +
 * Get a Quote. Slides in after scrolling past ~70% of the viewport (the hero),
 * stays hidden while the cookie banner is open (body.ck-open), and clears the
 * iOS home indicator.
 */
export function MobileQuickBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const item =
    "flex h-12 items-center justify-center gap-2 rounded-full font-body text-[15px] font-semibold [&_svg]:size-[18px]";

  return (
    <div
      aria-label="Quick contact"
      role="region"
      inert={!show}
      className={cn(
        "fixed inset-x-0 bottom-0 z-55 grid grid-cols-[1fr_1.4fr] gap-2.5 border-t border-line bg-white/94 px-3.5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-400 ease-brand nav:hidden",
        show ? "translate-y-0" : "translate-y-[110%]",
        "in-[.ck-open]:translate-y-[110%]",
      )}
    >
      <a href={company.phoneHref} className={cn(item, "border border-line bg-paper text-ink")}>
        <PhoneIcon />
        Call
      </a>
      <a
        href={QUOTE_HREF}
        data-quote=""
        aria-haspopup="dialog"
        className={cn(item, "bg-orange-deep text-white")}
      >
        Get a Quote
      </a>
    </div>
  );
}
