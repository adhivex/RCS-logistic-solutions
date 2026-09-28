import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { Todo } from "@/components/ui/todo";
import { isFilled, isTodo, media, networkIntro, networkStats, type Heading, type Stat } from "@/content";
import { cn } from "@/lib/utils";

const isDev = process.env.NODE_ENV !== "production";

type StatBandProps = {
  eyebrow?: string;
  heading?: Heading;
  stats?: Stat[];
  cta?: { label: string; href: string } | null;
  headingLevel?: "h2" | "h3";
};

/**
 * docs/02-design-system.md → StatBand: dark band, stats separated by 2px orange left
 * borders. Unverified stats (TODO(client)) show as placeholders in development and
 * are dropped in production — numbers are never estimated.
 */
export function StatBand({
  eyebrow = networkIntro.eyebrow,
  heading = networkIntro.heading,
  stats = networkStats,
  cta = networkIntro.cta,
  headingLevel: Tag = "h2",
}: StatBandProps) {
  const visible = stats.filter((stat) => isFilled(stat.value) || (isDev && isTodo(stat.value)));

  return (
    <section aria-labelledby="stat-band-heading" className="relative overflow-hidden bg-[#18191c] text-white">
      <Photo item={media.networkBand} sizes="100vw" tone="dark" className="object-[center_80%]" />
      <div aria-hidden="true" className="absolute inset-0 bg-[rgb(16_17_20/0.88)]" />
      <div
        className={cn(
          "relative container-site grid items-center gap-7 py-[60px] lg:gap-10",
          visible.length > 0 ? "lg:grid-cols-[1.2fr_1.6fr_auto]" : "lg:grid-cols-[1fr_auto]",
        )}
      >
        <div>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <Tag id="stat-band-heading" className="text-[clamp(28px,3vw,36px)] font-semibold text-white">
            {heading.lead} <span className="text-brand-orange">{heading.highlight}</span>
          </Tag>
        </div>
        {visible.length > 0 && (
          <dl className="flex flex-wrap gap-y-[18px]">
            {visible.map((stat) => (
              <div
                key={stat.value}
                className="flex flex-col border-l-2 border-brand-orange px-[18px] first:border-l-0 first:pl-0 sm:px-[30px]"
              >
                <dt className="order-2 text-xs tracking-[0.1em] text-white/75 uppercase">{stat.label}</dt>
                <dd className="order-1 font-display text-[30px] leading-[1.1] font-semibold">
                  <Todo value={stat.value} tone="dark" />
                </dd>
              </div>
            ))}
          </dl>
        )}
        {cta && (
          <Button href={cta.href} arrow className="justify-self-start">
            {cta.label}
          </Button>
        )}
      </div>
    </section>
  );
}
