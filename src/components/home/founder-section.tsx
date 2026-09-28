import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { company, founderIntro, media } from "@/content";

/** Splits the body so the founder's name renders in bold, as in the mockup. */
function BodyWithName({ text, name }: { text: string; name: string }) {
  const [before, after] = text.split(name);
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <b className="font-semibold text-brand-ink">{name}</b>
      {after}
    </>
  );
}

/** docs/03-pages.md → Home 3. Photo left (with overlay), copy right, signature, Our Story. */
export function FounderSection() {
  return (
    <section aria-labelledby="founder-heading" className="section-y">
      <div className="container-site grid items-center gap-9 nav:grid-cols-[1fr_1.05fr] nav:gap-16">
        <div className="relative aspect-[438/356] overflow-hidden rounded-card bg-[#333]">
          <Photo item={media.founder} sizes="(min-width: 860px) 45vw, 100vw" tone="dark" />
          <p
            aria-hidden="true"
            className="absolute top-[10%] left-[7%] font-display text-[15px] leading-[1.3] font-semibold tracking-[0.1em] text-white/75 uppercase"
          >
            {founderIntro.photoOverlay.map((word) => (
              <span key={word} className="block">
                {word}
              </span>
            ))}
            <span className="mt-3.5 block h-[3px] w-[26px] bg-brand-orange" />
          </p>
        </div>

        <div>
          <Eyebrow>{founderIntro.eyebrow}</Eyebrow>
          <h2 id="founder-heading" className="text-[clamp(30px,3.6vw,44px)] font-bold">
            {founderIntro.heading.lead}{" "}
            <span className="text-highlight">{founderIntro.heading.highlight}</span>
          </h2>
          <p className="mt-[22px] mb-[26px] max-w-[560px]">
            <BodyWithName text={founderIntro.body} name={company.founder} />
          </p>
          <span aria-hidden="true" className="mb-[22px] block h-[3px] w-[30px] bg-brand-orange" />
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              {/* Decorative script rendering of the name (design-system: Caveat for the signature) */}
              <p aria-hidden="true" className="font-script text-[34px] leading-none text-brand-ink">
                {company.founder}
              </p>
              <p className="mt-2 text-[13px] font-semibold tracking-[0.08em] text-brand-ink uppercase">
                {company.founder}
              </p>
              <p className="text-sm">
                {company.founderRole}, {company.shortName}
              </p>
            </div>
            <Button variant="outline" href={founderIntro.cta.href} arrow>
              {founderIntro.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
