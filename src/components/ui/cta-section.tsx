import { QuoteButton } from "@/components/quote/quote-button";
import { company, ctaSection, type Heading, type ServiceTypeValue } from "@/content";
import { AccentHeading } from "./accent-heading";
import { Button } from "./button";
import { PhoneIcon } from "./icons";
import { Label } from "./label";

type CtaSectionProps = {
  label?: string;
  heading?: Heading;
  line?: string;
  /** Pre-selects this service when the quote dialog opens. */
  service?: ServiceTypeValue;
};

/**
 * docs/02-design-system.md → CtaSection: navy → steel gradient with an orange glow
 * and film grain, large centred H2, Get a Quote + Call the Team.
 */
export function CtaSection({
  label = ctaSection.label,
  heading = ctaSection.heading,
  line = ctaSection.line,
  service,
}: CtaSectionProps) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="grain relative isolate overflow-hidden bg-[linear-gradient(180deg,var(--color-ink)_0%,var(--color-steel)_140%)] section-y text-center text-white/72"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-[-10%] bottom-[-60%] -z-10 h-[120%] bg-[radial-gradient(ellipse_at_50%_100%,rgb(234_90_36/0.38),rgb(234_90_36/0)_60%)]"
      />
      <div data-reveal className="container-site">
        <Label tone="dark" centered className="text-white/75">
          {label}
        </Label>
        <AccentHeading
          id="cta-heading"
          heading={heading}
          tone="dark"
          className="mx-auto my-[26px] max-w-[1000px] text-[clamp(36px,11vw,52px)] tracking-[-0.05em] sm:text-[clamp(42px,6.6vw,104px)]"
        />
        <p className="mx-auto mb-10 max-w-[460px] text-[17px]">{line}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <QuoteButton service={service}>{ctaSection.primary}</QuoteButton>
          <Button variant="light" href={company.phoneHref} icon={<PhoneIcon />}>
            {ctaSection.call}
          </Button>
        </div>
      </div>
    </section>
  );
}
