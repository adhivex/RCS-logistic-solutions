import Link from "next/link";
import { MediaFrame } from "@/components/shared/media-frame";
import { TalkToTeamButton } from "@/components/shared/talk-to-team-button";
import { Button } from "@/components/ui/button";
import { hero } from "@/content/home";
import { media } from "@/content/media";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      // Left padding aligns text with .container-site; the image bleeds to the right edge on desktop.
      className="grid lg:min-h-[min(calc(100dvh-4.5rem),48rem)] lg:grid-cols-2 lg:pl-[max(2rem,calc((100%-75rem)/2+2rem))]"
    >
      <div className="container-site flex flex-col justify-center py-14 sm:py-20 lg:mx-0 lg:max-w-none lg:py-24 lg:pr-16 lg:pl-0">
        <h1
          id="hero-heading"
          className="font-display animate-rise text-[2.5rem] sm:text-6xl lg:text-[4.5rem] lg:leading-[1.02]"
        >
          {hero.headline}
        </h1>
        <p
          className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground lg:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          {hero.supporting}
        </p>
        <div
          className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row"
          style={{ animationDelay: "280ms" }}
        >
          <Button asChild size="lg">
            <Link href="/get-a-quote">Get a quote</Link>
          </Button>
          <TalkToTeamButton size="lg" />
        </div>
      </div>

      <div className="animate-rise relative" style={{ animationDelay: "180ms" }}>
        <MediaFrame
          item={media.hero}
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] border-x-0 sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto lg:rounded-l-lg lg:border-x lg:border-r-0"
        />
      </div>
    </section>
  );
}
