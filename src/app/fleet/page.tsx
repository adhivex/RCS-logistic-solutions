import { CtaSection } from "@/components/ui/cta-section";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { Todo } from "@/components/ui/todo";
import { fleet, isTodo, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: pages.fleet.title,
  description: pages.fleet.description,
  path: "/fleet",
});

const isDev = process.env.NODE_ENV !== "production";

/** A spec row that disappears in production while its value is still TODO(client). */
function Spec({ label, value }: { label: string; value: string }) {
  if (isTodo(value) && !isDev) return null;
  return (
    <div className="border-t border-line py-4">
      <dt className="text-xs tracking-[0.16em] text-muted uppercase">{label}</dt>
      <dd className="m-0 mt-1.5 text-ink">
        <Todo value={value} />
      </dd>
    </div>
  );
}

/** docs/03-pages.md → /fleet: one block per vehicle type, alternating image and text. */
export default function FleetPage() {
  return (
    <>
      <PageHero
        path="/fleet"
        {...pages.fleet.hero}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fleet" }]}
      />

      <div className="bg-white section-y">
        <div className="container-site grid gap-16 nav:gap-24">
          {fleet.map((vehicle, index) => (
            <section
              key={vehicle.slug}
              id={vehicle.slug}
              aria-labelledby={`${vehicle.slug}-heading`}
              className="grid scroll-mt-28 items-center gap-8 nav:grid-cols-2 nav:gap-16"
            >
              <div
                data-reveal
                className={cn(
                  "relative aspect-[12/6.5] overflow-hidden rounded-[14px] bg-steel",
                  index % 2 === 1 && "nav:order-2",
                )}
              >
                <Photo item={vehicle.image} sizes="(min-width: 880px) 50vw, 100vw" />
              </div>
              <div data-reveal>
                <p className="m-0 mb-3 font-serif text-[22px] text-orange-deep italic">
                  {String(index + 1).padStart(2, "0")}
                  <span className="sr-only">.</span>
                </p>
                <h2 id={`${vehicle.slug}-heading`} className="text-[clamp(30px,3.4vw,44px)]">
                  {vehicle.name}
                </h2>
                <p className="mt-3 mb-0 text-lg text-ink">{vehicle.oneLiner}</p>
                <p className="mt-1 text-xs tracking-[0.16em] text-muted uppercase">{vehicle.role}</p>
                <dl className="mt-6 mb-0">
                  <Spec label="What it carries" value={vehicle.carries} />
                  <Spec label="Capacity" value={vehicle.capacity} />
                  <Spec label="Typical routes" value={vehicle.routes} />
                </dl>
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaSection
        label={pages.fleet.cta.label}
        heading={pages.fleet.cta.heading}
        line={pages.fleet.cta.line}
      />
    </>
  );
}
