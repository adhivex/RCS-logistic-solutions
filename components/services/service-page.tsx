import Link from "next/link";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHeader } from "@/components/shared/page-header";
import { TalkToTeamButton } from "@/components/shared/talk-to-team-button";
import { Button } from "@/components/ui/button";
import { services, type Service } from "@/content/services";
import { serviceJsonLd } from "@/lib/seo";
import { ServiceQuoteBlock } from "./service-quote-block";

/** Shared template for the four service pages. */
export function ServicePage({ service }: { service: Service }) {
  const quoteHref = `/get-a-quote?service=${service.param}`;
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <PageHeader
        title={service.name}
        kicker={service.shortLabel !== service.name ? service.shortLabel : undefined}
        intro={service.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href={quoteHref}>Get a quote</Link>
          </Button>
          <TalkToTeamButton size="lg" />
        </div>
      </PageHeader>

      <section aria-labelledby="who-heading" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
          <h2 id="who-heading" className="font-display text-[1.875rem] sm:text-4xl lg:col-span-5">
            Who it&apos;s for
          </h2>
          <ul className="grid gap-5 lg:col-span-7">
            {service.whoFor.map((item) => (
              <li key={item} className="flex gap-4 border-b border-border pb-5 text-lg text-navy last:border-0">
                <Check className="mt-1 size-5 shrink-0 text-brand-orange" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="section-y bg-surface">
        <div className="container-site">
          <h2 id="steps-heading" className="font-display text-[1.875rem] sm:text-4xl">
            How it works
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, index) => (
              <li key={step.title} className="rounded-md border border-border bg-white p-6">
                <span className="font-display block text-3xl text-action-orange" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-wide mt-4 text-lg font-bold">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ServiceQuoteBlock service={service} href={quoteHref} />

      <section aria-labelledby="other-heading" className="section-y border-t border-border">
        <div className="container-site">
          <h2 id="other-heading" className="font-wide text-2xl font-bold">
            Other services
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {otherServices.map((item) => (
              <li key={item.slug}>
                <Link
                  href={item.href}
                  className="block h-full rounded-md border border-border p-6 transition-colors duration-200 hover:border-navy"
                >
                  <span className="font-wide block text-lg font-bold text-navy">{item.name}</span>
                  <span className="mt-2 block text-muted-foreground">{item.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
