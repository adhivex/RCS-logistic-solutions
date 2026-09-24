import { AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { legalDraftNotice, legalLastUpdated, type LegalSection } from "@/content/legal";

/** Renders a legal page with the visible draft notice required until client approval. */
export function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHeader title={title} breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]} />
      <div className="container-site section-y pt-12! lg:pt-16!">
        <div className="max-w-3xl">
          <p
            role="note"
            className="flex items-start gap-3 rounded-md border border-brand-orange bg-[#fff4ec] px-4 py-3 font-semibold text-navy"
          >
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-action-orange" aria-hidden="true" />
            {legalDraftNotice}
          </p>

          <div className="mt-10 grid gap-10">
            {sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={`legal-${index}`}>
                <h2 id={`legal-${index}`} className="font-wide text-xl font-bold lg:text-2xl">
                  {index + 1}. {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-navy/90">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 grid list-disc gap-2 pl-6 text-navy/90 marker:text-action-orange">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
            Last updated: {legalLastUpdated}
          </p>
        </div>
      </div>
    </>
  );
}
