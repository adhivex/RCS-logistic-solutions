import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronDown, CircleCheck } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";
import { serviceIcons } from "@/components/ui/icons";
import { CtaBand } from "@/components/ui/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { Todo } from "@/components/ui/todo";
import { getService, industries, isTodo, serviceSteps, services } from "@/content";
import { pageMetadata } from "@/lib/seo";

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
    description:
      `${service.oneLiner} ${service.name} from RCS Logistic, a B2B truck transport company in Cuttack, Odisha.`.slice(
        0,
        160,
      ),
    path: `/services/${service.slug}`,
  });
}

const isDev = process.env.NODE_ENV !== "production";

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const related = services.filter((item) => item.slug !== service.slug);
  const faqs = service.faqs.filter((faq) => isDev || !isTodo(faq.answer));
  const whoFor = industries.filter((industry) => service.whoFor.includes(industry.name));

  return (
    <>
      <PageHero
        title={service.name}
        intro={service.oneLiner}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      >
        <QuoteButton service={service.type} />
      </PageHero>

      <section aria-labelledby="included-heading" className="section-y">
        <div className="container-site grid gap-12 nav:grid-cols-2 nav:gap-16">
          <div>
            <Eyebrow>What&apos;s included</Eyebrow>
            <h2
              id="included-heading"
              className="flex items-center gap-3 text-[clamp(26px,3vw,36px)] font-bold"
            >
              <Icon className="size-9 shrink-0 text-brand-orange" aria-hidden="true" />
              {service.name}
            </h2>
            <ul className="mt-7 grid gap-3.5">
              {service.included.map((item) => (
                <li key={item} className="flex gap-3">
                  <CircleCheck className="mt-0.5 size-5 shrink-0 text-brand-orange" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <h2 className="text-[clamp(26px,3vw,36px)] font-bold">
              Built for <span className="text-brand-orange">these industries</span>
            </h2>
            <ul className="mt-7 flex flex-wrap gap-3">
              {whoFor.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries#${industry.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-brand-line px-4 py-2 text-[15px] font-medium text-brand-ink transition-colors hover:border-brand-orange hover:text-action"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="bg-brand-mist section-y">
        <div className="container-site">
          <Eyebrow>How it works</Eyebrow>
          <h2 id="steps-heading" className="mb-10 text-[clamp(26px,3vw,36px)] font-bold">
            Four steps from <span className="text-brand-orange">request to delivery</span>
          </h2>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceSteps.map((step, index) => (
              <li key={step.title} className="rounded-card border border-brand-line bg-white p-6">
                <span aria-hidden="true" className="font-display text-3xl font-bold text-action">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px]">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="faq-heading" className="section-y">
          <div className="container-site max-w-3xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 id="faq-heading" className="mb-8 text-[clamp(26px,3vw,36px)] font-bold">
              Common <span className="text-brand-orange">questions</span>
            </h2>
            <div className="border-t border-brand-line">
              {faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-brand-line">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-semibold text-brand-ink [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown
                      className="size-5 shrink-0 text-action transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-5">
                    <Todo value={faq.answer} />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="related-heading" className="border-t border-brand-line py-16">
        <div className="container-site">
          <h2 id="related-heading" className="mb-6 text-2xl font-bold">
            Related services
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group block h-full rounded-card border border-brand-line p-6 transition-colors hover:border-brand-orange"
                >
                  <span className="flex items-center justify-between gap-3 font-display text-lg font-semibold text-brand-ink group-hover:text-action">
                    {item.name}
                    <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-[15px]">{item.oneLiner}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand service={service.type} />
    </>
  );
}
