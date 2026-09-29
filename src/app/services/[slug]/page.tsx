import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Plus } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";
import { JsonLd } from "@/components/seo/json-ld";
import { AccentHeading } from "@/components/ui/accent-heading";
import { CtaSection } from "@/components/ui/cta-section";
import { serviceIcons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/ui/page-hero";
import { Todo } from "@/components/ui/todo";
import { getService, industries, isTodo, serviceSteps, services } from "@/content";
import { faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

const isDev = process.env.NODE_ENV !== "production";

/** docs/03-pages.md → /services/[slug]: included, who it's for, how it works, FAQ, related. */
export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const related = services.filter((item) => item.slug !== service.slug);
  const faqs = service.faqs.filter((faq) => isDev || !isTodo(faq.answer));
  const whoFor = industries.filter((industry) => service.whoFor.includes(industry.name));
  const words = service.name.split(" ");

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd data={faqJsonLd(service.faqs)} />
      <PageHero
        path={`/services/${service.slug}`}
        label="Service"
        heading={{ lead: words.slice(0, -1).join(" "), accent: words.at(-1) ?? "" }}
        intro={service.oneLiner}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      >
        <QuoteButton service={service.type} />
      </PageHero>

      <section aria-labelledby="included-heading" className="bg-white section-y">
        <div className="container-site grid gap-14 nav:grid-cols-2 nav:gap-20">
          <div data-reveal>
            <Label>What&apos;s included</Label>
            <h2
              id="included-heading"
              className="mt-[18px] flex items-center gap-4 text-[clamp(28px,3vw,40px)]"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-orange-soft text-orange">
                <Icon className="size-6" />
              </span>
              {service.name}
            </h2>
            <ul className="mt-8 border-t border-line">
              {service.included.map((item) => (
                <li key={item} className="flex gap-3.5 border-b border-line py-4 text-ink">
                  <span aria-hidden="true" className="mt-[11px] h-px w-4 shrink-0 bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <Label>Who it&apos;s for</Label>
            <AccentHeading
              heading={{ lead: "Built for", accent: "these industries." }}
              className="mt-[18px] text-[clamp(28px,3vw,40px)]"
            />
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {whoFor.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries#${industry.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 py-2 text-[15px] font-medium text-ink transition-colors hover:border-orange hover:text-orange-deep"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="bg-paper section-y">
        <div className="container-site">
          <div data-reveal>
            <Label>How it works</Label>
            <AccentHeading
              id="steps-heading"
              heading={{ lead: "Four steps from", accent: "request to delivery." }}
              className="mt-[18px] mb-[clamp(36px,5vw,64px)] text-[clamp(32px,4.2vw,56px)]"
            />
          </div>
          <ol className="grid gap-y-11 sm:grid-cols-2 wide:grid-cols-4">
            {serviceSteps.map((step, index) => (
              <li key={step.title} data-reveal className="relative border-t border-line pt-[34px] pr-[30px]">
                <span
                  aria-hidden="true"
                  className="absolute -top-1 left-0 size-[7px] rounded-full bg-orange"
                />
                <span
                  aria-hidden="true"
                  className="mb-[22px] block font-serif text-[44px] leading-none text-ink italic"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2.5 text-[21px] tracking-[-0.02em]">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="m-0 text-[15px]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="bg-white section-y">
          <div className="container-site grid gap-10 nav:grid-cols-[0.8fr_1.2fr] nav:gap-20">
            <div data-reveal>
              <Label>FAQ</Label>
              <AccentHeading
                id="faq-heading"
                heading={{ lead: "Common", accent: "questions." }}
                className="mt-[18px] text-[clamp(32px,4.2vw,56px)]"
              />
            </div>
            <div className="border-t border-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-line">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-semibold tracking-[-0.02em] text-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-350 ease-brand group-open:rotate-45"
                    >
                      <Plus className="size-4" />
                    </span>
                  </summary>
                  <p className="mt-0 pb-5">
                    <Todo value={faq.answer} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="related-heading" className="border-t border-line bg-paper py-16">
        <div className="container-site">
          <h2 id="related-heading" className="mb-6 text-2xl tracking-[-0.02em]">
            Related services
          </h2>
          <ul className="grid gap-4 nav:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-orange"
                >
                  <span className="flex items-center justify-between gap-3 font-display text-lg font-bold tracking-[-0.02em] text-ink">
                    {item.name}
                    <ArrowUpRight
                      className="size-4 shrink-0 transition-transform group-hover:-rotate-45"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 block text-[15px]">{item.oneLiner}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection service={service.type} />
    </>
  );
}
