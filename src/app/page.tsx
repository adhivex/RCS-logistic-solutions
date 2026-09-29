import type { Metadata } from "next";
import { FleetSection } from "@/components/home/fleet-section";
import { FounderStrip } from "@/components/home/founder-strip";
import { Hero } from "@/components/home/hero";
import { NumbersStrip } from "@/components/home/numbers-strip";
import { ServicesSection } from "@/components/home/services-section";
import { CtaSection } from "@/components/ui/cta-section";
import { company } from "@/content";

const homeTitle = "RCS Logistic Solutions | B2B & B2C Truck Transport from Odisha Across India";
const homeDescription =
  "Transport company in Cuttack, Odisha: full truck load, part truck load, warehousing and supply chain for businesses and individuals across India. Get a quote.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: { title: homeTitle, description: homeDescription, url: "/", siteName: company.name },
};

/** docs/03-pages.md → Home: short, in the preview's order. */
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <FleetSection />
      <NumbersStrip />
      <FounderStrip />
      <CtaSection />
    </>
  );
}
