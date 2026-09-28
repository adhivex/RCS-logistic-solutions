import { trustIcons } from "@/components/ui/icons";
import { trust } from "@/content";

/**
 * docs/02-design-system.md → TrustStrip: white card overlapping the hero by ~56px,
 * four icon items with dividers and a script tagline. 2×2 below 1024px, no tagline.
 */
export function TrustStrip() {
  return (
    <section aria-label="Why RCS" className="relative z-[2] -mt-14">
      <div className="container-site">
        <div className="grid items-center rounded-card bg-white px-1 py-6 shadow-card lg:grid-cols-[4fr_1.2fr] lg:px-2.5 lg:py-[26px]">
          <ul className="grid grid-cols-2 items-center gap-y-5 lg:grid-cols-4">
            {trust.items.map((item) => {
              const Icon = trustIcons[item.icon];
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-3 border-brand-line px-3 py-1 text-xs leading-[1.35] font-medium tracking-[0.04em] text-brand-ink uppercase odd:border-r sm:gap-3.5 sm:px-[22px] sm:text-[13px] lg:border-r"
                >
                  <Icon
                    className="size-[30px] shrink-0 text-brand-orange sm:size-[38px]"
                    aria-hidden="true"
                  />
                  <span className="max-w-[9ch]">{item.label}</span>
                </li>
              );
            })}
          </ul>
          <p className="hidden -rotate-6 px-4 text-center font-script text-[30px] leading-[1.05] text-brand-ink lg:block">
            {trust.script}
          </p>
        </div>
      </div>
    </section>
  );
}
