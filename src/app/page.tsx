import type { Metadata } from "next";
import { FleetSection } from "@/components/home/fleet-section";
import { FounderSection } from "@/components/home/founder-section";
import { Hero } from "@/components/home/hero";
import { IndustriesStrip } from "@/components/home/industries-strip";
import { ServicesSection } from "@/components/home/services-section";
import { StatBand } from "@/components/home/stat-band";
import { TrustStrip } from "@/components/home/trust-strip";
import { CtaBand } from "@/components/ui/cta-band";
import { company } from "@/content";

const homeTitle = "RCS Logistic | B2B Truck Transport from Odisha Across India";
const homeDescription =
  "Truck transport company in Cuttack, Odisha: full truck load, part truck load, warehousing and supply chain for businesses across India. Get a quote today.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: { title: homeTitle, description: homeDescription, url: "/", siteName: company.name },
};

/** docs/03-pages.md → Home, section order as specified. */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FounderSection />
      <FleetSection />
      <ServicesSection />
      <IndustriesStrip />
      <StatBand />
      <CtaBand />
    </>
  );
}
