import { Truck } from "lucide-react";
import { QuoteButton } from "@/components/quote/quote-button";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { hero, media } from "@/content";

/**
 * docs/03-pages.md → Home 1. Full-bleed truck image with a dark left gradient
 * (bottom-up on mobile, text anchored to the bottom). The corner line is desktop only.
 */
export function Hero() {
  const { corner } = hero;
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[80vh] items-end overflow-hidden bg-[#1c1a19] text-white nav:min-h-[min(88vh,720px)] nav:items-center"
    >
      <Photo
        item={media.hero}
        sizes="100vw"
        preload
        tone="dark"
        className="object-[52%_center] nav:object-[62%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgb(14_14_16/0.92)_0%,rgb(14_14_16/0.72)_50%,rgb(14_14_16/0.1)_100%)] nav:bg-[linear-gradient(90deg,rgb(14_14_16/0.82)_0%,rgb(14_14_16/0.6)_38%,rgb(14_14_16/0)_62%)]"
      />

      {/* TODO(client): once the real hero photo is in, check this line's contrast against its sky */}
      <p className="absolute top-10 right-[max(20px,calc((100vw-1200px)/2))] hidden font-display text-[22px] leading-[1.2] uppercase [text-shadow:0_1px_12px_rgb(0_0_0/0.35)] nav:block">
        {corner.lines.map((line) => (
          <span
            key={line}
            className={corner.emphasis.includes(line) ? "block font-semibold" : "block font-normal"}
          >
            {line}
          </span>
        ))}
        <span aria-hidden="true" className="mt-3.5 block h-[3px] w-10 bg-brand-orange" />
      </p>

      <div className="relative container-site pt-[180px] pb-[110px] nav:pt-20 nav:pb-[120px]">
        <Eyebrow tone="dark" barAfter>
          {hero.eyebrow}
        </Eyebrow>
        <h1
          id="hero-heading"
          className="text-[clamp(52px,8vw,96px)] leading-[0.95] font-extrabold tracking-[-0.02em] text-white"
        >
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <span className="block text-brand-orange">{hero.titleHighlight}</span>
        </h1>
        <p className="mt-[22px] mb-2.5 text-[clamp(20px,2.2vw,26px)] font-medium">{hero.tag}</p>
        <p className="mb-[30px] max-w-[440px] text-white/90">{hero.lead}</p>
        <div className="flex flex-wrap gap-3.5">
          <QuoteButton>{hero.primaryCta}</QuoteButton>
          <Button variant="ghost" href={hero.secondaryCta.href} icon={<Truck aria-hidden="true" />}>
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
