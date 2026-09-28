import Link from "next/link";
import { industryIcons } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries, industriesIntro } from "@/content";

/** docs/03-pages.md → Home 6. Compact row of six industry chips linking to /industries. */
export function IndustriesStrip() {
  return (
    <section aria-labelledby="industries-heading" className="section-y">
      <div className="container-site">
        <SectionHeading
          id="industries-heading"
          eyebrow={industriesIntro.eyebrow}
          heading={industriesIntro.heading}
          link={industriesIntro.link}
        />
        <ul className="flex flex-wrap gap-3">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <li key={industry.slug}>
                <Link
                  href={`/industries#${industry.slug}`}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-brand-line bg-white px-5 py-2.5 text-[15px] font-medium text-brand-ink transition-colors hover:border-brand-orange hover:text-action"
                >
                  <Icon className="size-5 text-brand-orange" aria-hidden="true" />
                  {industry.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
