import { CapabilityStrip } from "@/components/home/capability-strip";
import { FounderSection } from "@/components/home/founder-section";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { IndustriesSection } from "@/components/home/industries-section";
import { QuoteCta } from "@/components/home/quote-cta";
import { ServicesSection } from "@/components/home/services-section";
import { WhyRcs } from "@/components/home/why-rcs";

export default function Home() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <ServicesSection />
      <FounderSection />
      <IndustriesSection />
      <WhyRcs />
      <HowItWorks />
      <QuoteCta />
    </>
  );
}
