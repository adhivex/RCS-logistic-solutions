import { industryIcons } from "@/components/ui/icons";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { industries, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description: pages.industries.description,
  path: "/industries",
});

// TODO(client): confirm which industries RCS serves (src/content/industries.ts)
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title={pages.industries.title}
        intro={pages.industries.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <section aria-label="Industries" className="section-y">
        <ul className="container-site grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <li
                key={industry.slug}
                id={industry.slug}
                className="scroll-mt-28 rounded-card border border-brand-line p-7"
              >
                <Icon className="size-10 text-brand-orange" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-semibold">{industry.name}</h2>
                <p className="mt-2">{industry.description}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
