import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceIcons } from "@/components/ui/icons";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { pages, services } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description: pages.services.description,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={pages.services.title}
        intro={pages.services.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section aria-label="All services" className="section-y">
        <ul className="container-site grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-card border border-brand-line p-8 transition-colors hover:border-brand-orange md:p-10"
                >
                  <Icon className="size-11 text-brand-orange" aria-hidden="true" />
                  <h2 className="mt-6 text-2xl font-semibold transition-colors group-hover:text-action">
                    {service.name}
                  </h2>
                  <p className="mt-3 text-[1.0625rem]">{service.oneLiner}</p>
                  <ul className="mt-5 grid gap-1.5 text-[15px]">
                    {service.included.slice(0, 3).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 bg-brand-orange" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-7 font-semibold text-action">
                    View {service.name}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
