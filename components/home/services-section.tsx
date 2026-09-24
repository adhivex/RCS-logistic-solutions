import Link from "next/link";
import { Network, Warehouse, type LucideIcon } from "lucide-react";
import { MediaFrame } from "@/components/shared/media-frame";
import { SectionHeading } from "@/components/shared/section-heading";
import { servicesIntro } from "@/content/home";
import { media, type MediaItem } from "@/content/media";
import { services, type Service } from "@/content/services";
import { cn } from "@/lib/utils";

const [ftl, ptl, warehousing, supplyChain] = services;

/*
 * Deliberately unequal hierarchy (design-system.md → Layout):
 * FTL and PTL as large photo cards, Warehousing and Supply chain as compact rows.
 * Each card is one link target via a stretched link on its title.
 */
const cardBase =
  "group relative flex flex-col overflow-hidden border border-border bg-white transition-[border-color,box-shadow] duration-200 hover:border-navy hover:shadow-lg hover:shadow-navy/5 has-[a:focus-visible]:border-navy";

const stretchedLink =
  "rounded-sm after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand-orange";

function Cue({ service }: { service: Service }) {
  return (
    <span
      aria-hidden="true"
      className="mt-auto pt-5 text-sm font-semibold text-action-orange underline-offset-4 group-hover:underline"
    >
      {service.name} details
    </span>
  );
}

function FeatureCard({ service, image, className }: { service: Service; image: MediaItem; className?: string }) {
  return (
    <article className={cn(cardBase, "rounded-lg", className)}>
      <MediaFrame
        item={image}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="aspect-[16/10] rounded-none border-0 border-b border-border"
      />
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <p className="text-sm font-semibold text-muted-foreground">{service.shortLabel}</p>
        <h3 className="font-wide mt-1 text-xl font-bold lg:text-2xl">
          <Link href={service.href} className={stretchedLink}>
            {service.name}
          </Link>
        </h3>
        <p className="mt-3 text-muted-foreground">{service.summary}</p>
        <Cue service={service} />
      </div>
    </article>
  );
}

function CompactCard({ service, icon: Icon }: { service: Service; icon: LucideIcon }) {
  return (
    <article className={cn(cardBase, "flex-row gap-5 rounded-md bg-surface p-6 lg:col-span-6")}>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-md border border-border bg-white">
        <Icon className="size-6 text-brand-orange" aria-hidden="true" />
      </span>
      <div className="flex flex-1 flex-col">
        <h3 className="font-wide text-lg font-bold lg:text-xl">
          <Link href={service.href} className={stretchedLink}>
            {service.name}
          </Link>
        </h3>
        <p className="mt-2 text-muted-foreground">{service.summary}</p>
        <Cue service={service} />
      </div>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="section-y">
      <div className="container-site">
        <SectionHeading id="services-heading" heading={servicesIntro.heading} body={servicesIntro.body} />

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <FeatureCard service={ftl} image={media.ftl} className="lg:col-span-7" />
          <FeatureCard service={ptl} image={media.ptl} className="lg:col-span-5" />
          <CompactCard service={warehousing} icon={Warehouse} />
          <CompactCard service={supplyChain} icon={Network} />
        </div>

        <p className="mt-10">
          <Link
            href="/services"
            className="font-semibold text-action-orange underline underline-offset-4 hover:text-action-orange-hover"
          >
            Compare all services
          </Link>
        </p>
      </div>
    </section>
  );
}
