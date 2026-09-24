import { notFound } from "next/navigation";
import { IndustriesSection } from "@/components/home/industries-section";
import { QuoteCta } from "@/components/home/quote-cta";
import { PageHeader } from "@/components/shared/page-header";
import { industriesIntro, industriesServed } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata({
  title: "Industries",
  description: industriesIntro.body,
  path: "/industries",
});

/** Returns 404 until the client confirms the industries they serve. */
export default function IndustriesPage() {
  if (!siteConfig.features.industries || industriesServed.length === 0) notFound();

  return (
    <>
      <PageHeader
        title={industriesIntro.heading}
        intro={industriesIntro.body}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />
      <IndustriesSection />
      <QuoteCta />
    </>
  );
}
