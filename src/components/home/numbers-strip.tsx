import { Todo } from "@/components/ui/todo";
import { isTodo, numbersStrip, type Stat } from "@/content";
import { cn } from "@/lib/utils";

const isDev = process.env.NODE_ENV !== "production";

/** "28+" → 28 with a small orange "+". */
function StatValue({ value }: { value: string }) {
  const plus = value.endsWith("+");
  return (
    <>
      {plus ? value.slice(0, -1) : value}
      {plus && <sup className="align-top text-[0.5em] text-orange-light">+</sup>}
    </>
  );
}

/**
 * docs/02-design-system.md → NumbersStrip: navy band, stats with thin dividers
 * (2×2 on mobile). Unverified figures are placeholders in development and are
 * left out in production — never estimated.
 */
export function NumbersStrip({ stats = numbersStrip }: { stats?: Stat[] }) {
  const shown = stats.filter((stat) => isDev || !isTodo(stat.value));
  if (shown.length === 0) return null;
  return (
    <section aria-label="RCS in numbers" className="bg-ink text-white">
      <dl
        data-reveal
        className={cn(
          "container-site grid grid-cols-2",
          shown.length === 4 && "nav:grid-cols-4",
          shown.length === 3 && "nav:grid-cols-3",
        )}
      >
        {shown.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col-reverse py-[26px] nav:py-10",
              index % 2 === 1 && "border-l border-white/12 pl-5",
              index > 0 && "nav:border-l nav:border-white/12 nav:pl-7",
              index < 2 && shown.length > 2 && "border-b border-white/12 nav:border-b-0",
              index === 2 && "max-nav:border-l-0 max-nav:pl-0",
            )}
          >
            <dt className="mt-2 text-xs tracking-[0.16em] text-white/62 uppercase">{stat.label}</dt>
            <dd className="font-display text-[clamp(34px,4vw,54px)] leading-none font-bold tracking-[-0.04em]">
              {isTodo(stat.value) ? <Todo value={stat.value} tone="dark" /> : <StatValue value={stat.value} />}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
