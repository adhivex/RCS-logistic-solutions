import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { Todo } from "@/components/ui/todo";
import { fleet, isTodo, pages } from "@/content";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Our Fleet",
  description: pages.fleet.description,
  path: "/fleet",
});

const isDev = process.env.NODE_ENV !== "production";

/** A spec row that disappears in production while its value is still TODO(client). */
function Spec({ label, value }: { label: string; value: string }) {
  if (isTodo(value) && !isDev) return null;
  return (
    <div className="border-t border-brand-line py-3">
      <dt className="text-xs font-semibold tracking-[0.12em] text-brand-ink uppercase">{label}</dt>
      <dd className="mt-1">
        <Todo value={value} />
      </dd>
    </div>
  );
}

export default function FleetPage() {
  return (
    <>
      <PageHero
        title={pages.fleet.title}
        intro={pages.fleet.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our Fleet" }]}
      />

      <div className="section-y">
        <div className="container-site grid gap-16 md:gap-24">
          {fleet.map((vehicle, index) => (
            <section
              key={vehicle.slug}
              id={vehicle.slug}
              aria-labelledby={`${vehicle.slug}-heading`}
              className="grid scroll-mt-28 items-center gap-8 nav:grid-cols-2 nav:gap-14"
            >
              <div
                className={cn(
                  "relative aspect-[3/2] overflow-hidden rounded-card bg-[#222]",
                  index % 2 === 1 && "nav:order-2",
                )}
              >
                <Photo item={vehicle.image} sizes="(min-width: 860px) 50vw, 100vw" tone="dark" />
              </div>
              <div>
                <h2 id={`${vehicle.slug}-heading`} className="text-[clamp(26px,3vw,36px)] font-bold">
                  {vehicle.name}
                </h2>
                <p className="mt-2 text-lg font-medium text-brand-ink">{vehicle.oneLiner}</p>
                <dl className="mt-6">
                  <Spec label="What it carries" value={vehicle.carries} />
                  <Spec label="Capacity" value={vehicle.capacity} />
                  <Spec label="Typical routes" value={vehicle.routes} />
                </dl>
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaBand heading={pages.fleet.cta.heading} line={pages.fleet.cta.line} />
    </>
  );
}
