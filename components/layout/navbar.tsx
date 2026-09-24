"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { LogoLink } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { ServicesMenu } from "./services-menu";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-200",
        scrolled
          ? "border-border bg-white/95 shadow-sm shadow-navy/5 backdrop-blur supports-backdrop-filter:bg-white/85"
          : "border-transparent bg-white",
      )}
    >
      <div className="container-site flex h-18 items-center justify-between gap-6">
        <LogoLink />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <ServicesMenu />
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="inline-flex h-10 items-center rounded-md px-3 text-[0.9375rem] font-medium text-navy transition-colors hover:text-action-orange aria-[current=page]:text-action-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/get-a-quote">Get a quote</Link>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
