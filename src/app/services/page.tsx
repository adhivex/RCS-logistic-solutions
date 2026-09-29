import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CtaSection } from "@/components/ui/cta-section";
import { serviceIcons } from "@/components/ui/icons";
import { PageHero } from "@/components/ui/page-hero";
import { Todo } from "@/components/ui/todo";
import { individualServicesNote, pages, services } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: pages.services.title,
  description: pages.services.description,
  path: "/services",
});

/** docs/03-pages.md → /services: intro + 4 large cards linking to the detail pages. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        path="/services"
        {...pages.services.hero}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section aria-label="All services" className="bg-paper section-y">
        <div className="container-site">
          <ul className="grid gap-4 nav:grid-cols-2">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              return (
                <li key={service.slug} data-reveal>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-[border-color,transform,box-shadow] duration-400 ease-brand hover:-translate-y-1 hover:border-orange hover:shadow-soft nav:p-9"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span className="grid size-12 place-items-center rounded-xl bg-orange-soft text-orange">
                        <Icon className="size-6" />
                      </span>
                      <span aria-hidden="true" className="font-serif text-[22px] text-orange-deep italic">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <h2 className="mt-7 text-[clamp(24px,2.6vw,32px)] tracking-[-0.03em]">{service.name}</h2>
                    <p className="mt-3 mb-0">{service.oneLiner}</p>
                    <ul className="mt-5 grid gap-1.5 text-[15px]">
                      {service.included.slice(0, 3).map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-orange" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-auto flex items-center justify-between pt-8 font-semibold text-ink">
                      View {service.shortName}
                      <span
                        aria-hidden="true"
                        className="grid size-10 place-items-center rounded-full bg-paper transition-all duration-350 ease-brand group-hover:-rotate-45 group-hover:bg-orange-deep group-hover:text-white"
                      >
                        <ArrowUpRight className="size-4" strokeWidth={2.2} />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 max-w-[640px] text-[15px]">
            Moving goods for yourself rather than a business? You can request a quote as an individual too.{" "}
            <Todo value={individualServicesNote} />
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
