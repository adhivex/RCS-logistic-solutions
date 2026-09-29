import { QuoteButton } from "@/components/quote/quote-button";
import { Button } from "@/components/ui/button";
import { trustIcons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Photo } from "@/components/ui/photo";
import { hero, media, trust } from "@/content";

/**
 * docs/02-design-system.md → Hero: full viewport height, photo + navy gradients +
 * film grain, content bottom-left; the TrustBar glass strip sits on its bottom edge.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grain relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-ink text-white"
    >
      <div className="absolute inset-0 -z-20">
        <Photo item={media.hero} sizes="100vw" preload className="object-[58%_30%] nav:object-[88%_42%]" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(16_28_44/0.96)_0%,rgb(16_28_44/0.78)_48%,rgb(16_28_44/0.2)_78%,rgb(16_28_44/0.5)_100%)] nav:bg-[linear-gradient(90deg,rgb(16_28_44/0.9)_0%,rgb(16_28_44/0.66)_34%,rgb(16_28_44/0.05)_64%),linear-gradient(0deg,rgb(16_28_44/0.92)_0%,rgb(16_28_44/0)_38%),linear-gradient(180deg,rgb(16_28_44/0.7)_0%,rgb(16_28_44/0)_30%)]"
      />

      <div className="container-site pt-[200px] pb-[34px] sm:pt-[240px] sm:pb-14 nav:pt-[150px]">
        <Label tone="dark" className="mb-[30px]">
          {hero.label}
        </Label>
        <h1
          id="hero-heading"
          className="text-[clamp(46px,13.5vw,64px)] leading-[0.92] tracking-[-0.05em] text-white sm:text-[clamp(54px,7.6vw,118px)]"
        >
          {hero.titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <em className="block pr-[0.05em] accent text-[1.08em] tracking-[-0.02em] text-orange-light">
            {hero.titleAccent}
          </em>
        </h1>
        <div className="mt-[34px]">
          <p className="mb-6 max-w-[430px] text-[15.5px] text-white/76 sm:mb-[30px] sm:text-[17px]">
            {hero.lead}
          </p>
          <div className="flex flex-wrap gap-3">
            <QuoteButton className="max-sm:flex-1 max-sm:justify-between">{hero.primaryCta}</QuoteButton>
            <Button
              variant="light"
              href={hero.secondaryCta.href}
              className="max-sm:flex-1 max-sm:justify-between"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      <TrustBar />
    </section>
  );
}

function TrustBar() {
  return (
    <div className="border-t border-white/14 bg-ink/55 backdrop-blur-[10px]">
      <ul aria-label="Why RCS" className="container-site grid grid-cols-2 nav:grid-cols-4">
        {trust.map((item, index) => {
          const Icon = trustIcons[item.icon];
          return (
            <li
              key={item.label}
              className={[
                "flex items-center gap-2.5 py-[18px] text-[11.5px] font-medium tracking-[0.06em] text-white/88 uppercase sm:gap-3.5 sm:text-[13px] nav:py-6",
                // 2×2 on mobile: dividers between columns and rows; one row of four on desktop
                index % 2 === 1 ? "border-l border-white/12 pl-[18px]" : "",
                index >= 2 ? "nav:border-l nav:border-white/12 nav:pl-6" : "",
                index === 1 ? "nav:pl-6" : "",
                index < 2 ? "border-b border-white/12 nav:border-b-0" : "",
              ].join(" ")}
            >
              <Icon className="size-[22px] shrink-0 text-orange" />
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
