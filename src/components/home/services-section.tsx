import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceIcons } from "@/components/ui/icons";
import { SectionHead } from "@/components/ui/section-head";
import { serviceCardLines, services, servicesIntro } from "@/content";

/**
 * docs/02-design-system.md → ServiceCard: white card, orange-soft icon tile, title,
 * one line, arrow circle; hover lifts 4px with an orange border. Mobile: compact rows.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="bg-paper section-y">
      <div className="container-site">
        <SectionHead
          id="services-heading"
          label={servicesIntro.label}
          heading={servicesIntro.heading}
          link={servicesIntro.link}
        />
        <ul className="grid gap-2.5 nav:grid-cols-2 nav:gap-4 wide:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li key={service.slug} data-reveal>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full items-center gap-4 rounded-[14px] border border-line bg-white px-[18px] py-4 transition-[border-color,transform,box-shadow] duration-400 ease-brand hover:-translate-y-1 hover:border-orange hover:shadow-soft nav:flex-col nav:items-start nav:gap-[18px] nav:rounded-2xl nav:p-[26px]"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-soft text-orange nav:size-12">
                    <Icon className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="mb-0.5 block font-display text-[17px] font-bold tracking-[-0.02em] text-ink nav:mb-1.5 nav:text-xl">
                      {service.shortName}
                    </span>
                    <span className="block text-[13.5px] leading-normal nav:text-[14.5px]">
                      {serviceCardLines[service.slug] ?? service.oneLiner}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-ink transition-all duration-350 ease-brand group-hover:-rotate-45 group-hover:bg-orange-deep group-hover:text-white nav:mt-auto nav:size-9"
                  >
                    <ArrowUpRight className="size-[15px]" strokeWidth={2.2} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
