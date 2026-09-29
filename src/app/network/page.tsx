import { NumbersStrip } from "@/components/home/numbers-strip";
import { IndiaMap } from "@/components/network/india-map";
import { AccentHeading } from "@/components/ui/accent-heading";
import { CtaSection } from "@/components/ui/cta-section";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/ui/page-hero";
import { Todo } from "@/components/ui/todo";
import { citiesServed, homeBase, keyRoutes, networkStats, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";

const isDev = process.env.NODE_ENV !== "production";

export const metadata = pageMetadata({
  title: pages.network.title,
  description: pages.network.description,
  path: "/network",
});

/** docs/03-pages.md → /network: India map, stats, key routes. */
export default function NetworkPage() {
  return (
    <>
      <PageHero
        path="/network"
        {...pages.network.hero}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Network" }]}
      />

      <section aria-labelledby="coverage-heading" className="bg-white section-y">
        <div className="container-site grid items-center gap-12 nav:grid-cols-[1.1fr_1fr] nav:gap-16">
          <div data-reveal className="mx-auto w-full max-w-[520px]">
            <IndiaMap />
          </div>
          <div data-reveal>
            <Label>{pages.network.mapLabel}</Label>
            <AccentHeading
              id="coverage-heading"
              heading={pages.network.mapHeading}
              className="mt-[18px] text-[clamp(32px,4.2vw,56px)]"
            />
            <p className="mt-5 max-w-[440px]">
              Based in {homeBase.name}, {homeBase.state}, we move goods for businesses and individuals across
              India.
            </p>
            {(citiesServed.length > 0 || isDev) && (
              <h3 className="mt-8 text-lg tracking-[-0.02em]">Cities served</h3>
            )}
            {citiesServed.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {citiesServed.map((city) => (
                  <li key={city.name} className="rounded-full border border-line px-3.5 py-1.5 text-[15px]">
                    {city.name}, {city.state}
                  </li>
                ))}
              </ul>
            ) : (
              isDev && (
                <p className="mt-2">
                  <Todo value="TODO(client): list of cities served (src/content/network.ts)" />
                </p>
              )
            )}
          </div>
        </div>
      </section>

      <NumbersStrip stats={networkStats} />

      <section aria-labelledby="routes-heading" className="bg-paper section-y">
        <div className="container-site">
          <div data-reveal>
            <Label>{pages.network.routesHeading}</Label>
            <AccentHeading
              id="routes-heading"
              heading={{ lead: "Where we", accent: "regularly run." }}
              className="mt-[18px] mb-8 text-[clamp(32px,4.2vw,56px)]"
            />
          </div>
          {keyRoutes.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 wide:grid-cols-3">
              {keyRoutes.map((route) => (
                <li
                  key={route}
                  className="rounded-2xl border border-line bg-white px-5 py-4 font-medium text-ink"
                >
                  {route}
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-[560px]">
              Tell us your route — we&apos;ll confirm whether we run it regularly.{" "}
              <Todo value="TODO(client): key routes / corridors (src/content/network.ts)" />
            </p>
          )}
        </div>
      </section>

      <CtaSection />
    </>
  );
}
