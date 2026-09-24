import { QuoteForm } from "@/components/forms/quote-form";
import { PageHeader } from "@/components/shared/page-header";
import { TalkToTeamButton } from "@/components/shared/talk-to-team-button";
import { serviceTypeFromParam } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Get a quote",
  description:
    "Request a logistics quote from RCS Logistic Solutions — share pickup, delivery and load details for Full Truck Load, Part Truck Load, warehousing or supply chain support.",
  path: "/get-a-quote",
});

export default async function GetAQuotePage({ searchParams }: PageProps<"/get-a-quote">) {
  const { service } = await searchParams;
  const defaultService = serviceTypeFromParam(service);

  return (
    <>
      <PageHeader
        title="Get a quote"
        intro="Tell us what you need to move. The more detail you share, the more accurate our quote can be."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Get a quote" }]}
      />
      <section className="section-y pt-12! lg:pt-16!">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <QuoteForm defaultService={defaultService} />
          </div>
          <aside aria-labelledby="quote-aside-heading" className="lg:col-span-4">
            <div className="rounded-lg bg-surface p-6 lg:sticky lg:top-28">
              <h2 id="quote-aside-heading" className="font-wide text-lg font-bold">
                Prefer to talk it through?
              </h2>
              <p className="mt-2 text-muted-foreground">
                If your requirement is still taking shape, reach our team directly.
              </p>
              <TalkToTeamButton className="mt-6 w-full" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
