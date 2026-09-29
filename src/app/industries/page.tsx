import { CtaSection } from "@/components/ui/cta-section";
import { industryIcons } from "@/components/ui/icons";
import { PageHero } from "@/components/ui/page-hero";
import { industries, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: pages.industries.title,
  description: pages.industries.description,
  path: "/industries",
});

// TODO(client): confirm which industries RCS serves (src/content/industries.ts)
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        path="/industries"
        {...pages.industries.hero}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <section aria-label="Industries" className="bg-paper section-y">
        <ul className="container-site grid gap-4 sm:grid-cols-2 wide:grid-cols-3">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <li
                key={industry.slug}
                id={industry.slug}
                data-reveal
                className="scroll-mt-28 rounded-2xl border border-line bg-white p-[26px]"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-orange-soft text-orange">
                  <Icon className="size-6" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-xl tracking-[-0.02em]">{industry.name}</h2>
                <p className="mt-2 mb-0 text-[15px]">{industry.description}</p>
              </li>
            );
          })}
        </ul>
      </section>
      <CtaSection />
    </>
  );
}
