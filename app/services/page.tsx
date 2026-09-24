import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { QuoteCta } from "@/components/home/quote-cta";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Full Truck Load, Part Truck Load, Warehousing & Storage and Supply Chain Solutions for businesses, from RCS Logistic Solutions.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        intro="Four ways to move and hold your goods — choose the one that fits your shipment, or combine them."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section aria-label="All services" className="section-y">
        <div className="container-site">
          <ol className="border-t border-border">
            {services.map((service, index) => (
              <li key={service.slug} className="border-b border-border">
                <Link
                  href={service.href}
                  className="group grid gap-3 py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-[5rem_1fr_1.2fr] lg:gap-10 lg:py-10"
                >
                  <span className="font-display text-2xl text-action-orange" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="font-display block text-2xl text-navy underline-offset-4 group-hover:underline lg:text-3xl">
                      {service.name}
                    </span>
                    <span className="mt-1 block font-semibold text-muted-foreground">{service.shortLabel}</span>
                  </span>
                  <span className="text-muted-foreground sm:col-start-2 lg:col-start-3 lg:text-lg">
                    {service.intro}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <QuoteCta />
    </>
  );
}
