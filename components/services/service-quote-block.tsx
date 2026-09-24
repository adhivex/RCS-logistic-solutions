import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Service } from "@/content/services";

/** "Request a quote" band — opens the quote form with this service pre-selected. */
export function ServiceQuoteBlock({ service, href }: { service: Service; href: string }) {
  return (
    <section aria-labelledby="service-quote-heading" className="bg-navy text-white">
      <div className="container-site flex flex-col gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 id="service-quote-heading" className="font-display text-3xl text-white sm:text-4xl">
            Request a quote for {service.name}
          </h2>
          <p className="mt-4 text-muted-on-dark lg:text-lg">
            Share your pickup, delivery and load details. The form opens with {service.name} already selected.
          </p>
        </div>
        {/* Navy text on brand-orange (5.86:1) — the design system's alternative bright button for dark sections. */}
        <Button asChild size="lg" className="bg-brand-orange text-navy hover:bg-white hover:text-navy">
          <Link href={href}>Request quote</Link>
        </Button>
      </div>
    </section>
  );
}
