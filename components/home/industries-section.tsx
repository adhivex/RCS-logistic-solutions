import { SectionHeading } from "@/components/shared/section-heading";
import { industriesIntro, industriesServed } from "@/content/industries";
import { siteConfig } from "@/lib/site-config";

/** Hidden until the client confirms which industries they serve (`features.industries`). */
export function IndustriesSection() {
  if (!siteConfig.features.industries || industriesServed.length === 0) return null;

  return (
    <section aria-labelledby="industries-heading" className="section-y border-t border-border">
      <div className="container-site">
        <SectionHeading id="industries-heading" heading={industriesIntro.heading} body={industriesIntro.body} />
        <ul className="mt-10 flex flex-wrap gap-3">
          {industriesServed.map((industry) => (
            <li key={industry} className="rounded-md border border-border px-4 py-2.5 font-medium text-navy">
              {industry}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
