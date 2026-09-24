import { FounderSection } from "@/components/home/founder-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { QuoteCta } from "@/components/home/quote-cta";
import { WhyRcs } from "@/components/home/why-rcs";
import { PageHeader } from "@/components/shared/page-header";
import { aboutPage } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: aboutPage.intro,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={aboutPage.title}
        intro={aboutPage.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />
      <FounderSection />
      <WhyRcs />
      <HowItWorks />
      <QuoteCta />
    </>
  );
}
