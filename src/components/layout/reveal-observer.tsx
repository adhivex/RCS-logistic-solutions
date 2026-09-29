"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal on scroll (docs/02-design-system.md → Motion): elements with
 * [data-reveal] fade and rise 24px as they enter the viewport, staggered 80ms in
 * groups of four. The `js` class on <html> (set inline before paint) enables the
 * hidden state, so content is always visible without JS. Reduced motion: the CSS
 * shows everything immediately.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    elements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 4) * 80}ms`;
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
