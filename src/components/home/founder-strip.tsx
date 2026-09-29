import { FounderFace } from "@/components/ui/founder-face";
import { TextLink } from "@/components/ui/section-head";
import { company, founderStrip } from "@/content";

/**
 * docs/02-design-system.md → FounderStrip: one rounded row — round headshot with an
 * orange ring, a one-line serif quote, name · role and "Our story". Kept small.
 */
export function FounderStrip() {
  return (
    <section aria-label="Our founder" className="bg-white py-[clamp(48px,6vw,80px)]">
      <div className="container-site">
        <figure
          data-reveal
          className="m-0 flex flex-wrap items-center gap-4 rounded-[18px] border border-line bg-paper p-5 nav:flex-nowrap nav:gap-6 nav:px-7 nav:py-[22px]"
        >
          <FounderFace className="size-16 nav:size-[84px]" sizes="84px" />
          <div className="min-w-0 flex-[1_1_calc(100%-90px)] nav:flex-1">
            <blockquote className="m-0 mb-1.5 font-serif text-lg leading-[1.35] text-ink nav:text-[clamp(19px,2vw,24px)]">
              <p className="m-0">“{founderStrip.quote}”</p>
            </blockquote>
            <figcaption className="text-[13px] text-muted">
              <b className="font-semibold text-ink">{company.founder}</b> · {company.founderRole}, {company.name}
            </figcaption>
          </div>
          <TextLink href={founderStrip.link.href} className="ml-20 nav:ml-0">
            {founderStrip.link.label}
          </TextLink>
        </figure>
      </div>
    </section>
  );
}
