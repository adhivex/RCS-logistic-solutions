import Link from "next/link";
import { serviceIcons } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { services, servicesIntro } from "@/content";

/**
 * docs/02-design-system.md → ServiceItem: icon, title, one-liner, "Learn more".
 * A row with vertical dividers on desktop; 2 columns on tablet, 1 on phones.
 */
export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="bg-brand-mist section-y">
      <div className="container-site">
        <SectionHeading
          id="services-heading"
          eyebrow={servicesIntro.eyebrow}
          heading={servicesIntro.heading}
          description={servicesIntro.description}
          link={servicesIntro.link}
        />
        <ul className="grid border-t border-brand-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <li
                key={service.slug}
                className="border-b border-brand-line sm:border-b-0 lg:mr-[26px] lg:border-r lg:last:mr-0 lg:last:border-r-0 sm:[&:nth-child(odd)]:mr-[26px] sm:[&:nth-child(odd)]:border-r"
              >
                <Link href={`/services/${service.slug}`} className="group block py-8 pr-[26px]">
                  <Icon className="mb-[18px] size-[34px] text-brand-orange" aria-hidden="true" />
                  <h3 className="mb-2 text-[19px] font-semibold transition-colors group-hover:text-action">
                    {service.name}
                  </h3>
                  <p className="mb-4 text-[14.5px]">{service.oneLiner}</p>
                  <span className="text-sm font-semibold text-action group-hover:underline group-hover:underline-offset-4">
                    Learn more<span className="sr-only"> about {service.name}</span>
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
