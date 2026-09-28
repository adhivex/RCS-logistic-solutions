import { FleetSection } from "@/components/home/fleet-section";
import { FounderSection } from "@/components/home/founder-section";
import { Hero } from "@/components/home/hero";
import { IndustriesStrip } from "@/components/home/industries-strip";
import { ServicesSection } from "@/components/home/services-section";
import { StatBand } from "@/components/home/stat-band";
import { TrustStrip } from "@/components/home/trust-strip";
import { CtaBand } from "@/components/ui/cta-band";

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
