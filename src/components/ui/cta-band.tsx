import { QuoteButton } from "@/components/quote/quote-button";
import { ctaBand, type ServiceTypeValue } from "@/content";

type CtaBandProps = {
  heading?: string;
  line?: string;
  service?: ServiceTypeValue;
};

/** docs/02-design-system.md → CtaBand: bordered box with a 5px orange left border. */
export function CtaBand({ heading = ctaBand.heading, line = ctaBand.line, service }: CtaBandProps) {
  return (
    <section aria-labelledby="cta-band-heading" className="py-20">
      <div className="container-site">
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-card border border-l-[5px] border-brand-line border-l-brand-orange px-6 py-8 sm:px-11 sm:py-10">
          <div>
            <h2 id="cta-band-heading" className="text-2xl font-bold md:text-[2.125rem]">
              {heading}
            </h2>
            <p className="mt-2">{line}</p>
          </div>
          <QuoteButton service={service}>{ctaBand.button}</QuoteButton>
        </div>
      </div>
    </section>
  );
}
