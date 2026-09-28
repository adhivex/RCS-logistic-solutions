import { StatBand } from "@/components/home/stat-band";
import { IndiaMap } from "@/components/network/india-map";
import { CtaBand } from "@/components/ui/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { Todo } from "@/components/ui/todo";
import { citiesServed, homeBase, keyRoutes, networkIntro, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";

const isDev = process.env.NODE_ENV !== "production";

export const metadata = pageMetadata({
  title: "Network",
  description: pages.network.description,
  path: "/network",
});

export default function NetworkPage() {
  return (
    <>
      <PageHero
        path="/network"
        title={pages.network.title}
        intro={pages.network.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Network" }]}
      />

      <section aria-labelledby="coverage-heading" className="section-y">
        <div className="container-site grid items-center gap-12 nav:grid-cols-[1.1fr_1fr] nav:gap-16">
          <div className="mx-auto w-full max-w-[520px]">
            <IndiaMap />
          </div>
          <div>
            <Eyebrow>{pages.network.mapHeading}</Eyebrow>
            <h2 id="coverage-heading" className="text-[clamp(28px,3.4vw,40px)] font-bold">
              {networkIntro.heading.lead}{" "}
              <span className="text-highlight">{networkIntro.heading.highlight}</span>
            </h2>
            <p className="mt-4 max-w-[520px]">
              Based in {homeBase.name}, {homeBase.state}, we move goods for businesses across India.
            </p>
            {(citiesServed.length > 0 || isDev) && (
              <h3 className="mt-8 text-lg font-semibold">Cities served</h3>
            )}
            {citiesServed.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {citiesServed.map((city) => (
                  <li
                    key={city.name}
                    className="rounded-full border border-brand-line px-3.5 py-1.5 text-[15px]"
                  >
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

      <StatBand cta={null} />

      <section aria-labelledby="routes-heading" className="section-y">
        <div className="container-site">
          <Eyebrow>{pages.network.routesHeading}</Eyebrow>
          <h2 id="routes-heading" className="mb-6 text-[clamp(26px,3vw,36px)] font-bold">
            Where we <span className="text-highlight">regularly run</span>
          </h2>
          {keyRoutes.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {keyRoutes.map((route) => (
                <li
                  key={route}
                  className="rounded-card border border-brand-line px-5 py-4 font-medium text-brand-ink"
                >
                  {route}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Tell us your route — we&apos;ll confirm whether we run it regularly.{" "}
              <Todo value="TODO(client): key routes / corridors (src/content/network.ts)" />
            </p>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
