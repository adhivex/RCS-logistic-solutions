"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mainNav } from "@/content/navigation";
import { services } from "@/content/services";
import { siteConfig, talkToTeamHref, whatsappUrl } from "@/lib/site-config";
import { Logo } from "./logo";

const linkClass =
  "flex min-h-12 items-center rounded-md px-3 text-base font-medium text-navy transition-colors hover:bg-surface aria-[current=page]:bg-surface aria-[current=page]:text-action-orange";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-6" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="gap-0 overflow-y-auto bg-white data-[side=right]:w-full data-[side=right]:sm:max-w-sm">
        <div className="flex h-18 items-center border-b border-border px-4">
          <Logo height={32} />
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation for {siteConfig.name}</SheetDescription>

        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-6 px-2 py-6">
          <div>
            <p className="px-3 pb-1 text-sm font-semibold text-muted-foreground" id="mobile-services-heading">
              Services
            </p>
            <ul aria-labelledby="mobile-services-heading">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={service.href} onClick={close} aria-current={current(service.href)} className={linkClass}>
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" onClick={close} aria-current={current("/services")} className={linkClass}>
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <ul className="border-t border-border pt-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} aria-current={current(item.href)} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-3 border-t border-border p-4">
          <Button asChild>
            <Link href="/get-a-quote" onClick={close}>
              Get a quote
            </Link>
          </Button>
          <Button asChild variant="secondary">
            {whatsappUrl ? (
              <a href={talkToTeamHref} target="_blank" rel="noopener noreferrer" onClick={close}>
                <MessageCircle aria-hidden="true" />
                Talk to our team
                <span className="sr-only">(opens WhatsApp)</span>
              </a>
            ) : (
              <Link href={talkToTeamHref} onClick={close}>
                Talk to our team
              </Link>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
