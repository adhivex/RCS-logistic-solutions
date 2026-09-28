import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { fleet, fleetIntro, type Vehicle } from "@/content";

/**
 * docs/02-design-system.md → FleetCard: image, dark bottom gradient, title + one-liner,
 * circular arrow. Whole card is a link; the only hover effect is a 1.04 image scale.
 */
function FleetCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <li className="snap-start">
      <Link
        href={`/fleet#${vehicle.slug}`}
        className="group relative block aspect-[3/2] overflow-hidden rounded-card bg-[#222] text-white"
      >
        <Photo
          item={vehicle.image}
          sizes="(min-width: 860px) 33vw, 82vw"
          tone="dark"
          className="transition-transform duration-400 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0)_35%,rgb(10_10_12/0.9)_100%)]"
        />
        <span className="absolute right-[70px] bottom-5 left-5 z-[1]">
          <span className="block font-display text-lg font-semibold">{vehicle.name}</span>
          <span className="mt-1 block text-[13px] leading-[1.4] text-white/85">{vehicle.oneLiner}</span>
        </span>
        <span
          aria-hidden="true"
          className="absolute right-5 bottom-[22px] z-[1] grid size-[38px] place-items-center rounded-full border-[1.5px] border-white/90"
        >
          <ArrowRight className="size-[17px]" />
        </span>
      </Link>
    </li>
  );
}

/** docs/03-pages.md → Home 4. Three cards; a horizontal snap carousel below 860px. */
export function FleetSection() {
  return (
    <section aria-labelledby="fleet-heading" className="pt-5 pb-16 md:pb-24">
      <div className="container-site">
        <SectionHeading
          id="fleet-heading"
          eyebrow={fleetIntro.eyebrow}
          heading={fleetIntro.heading}
          description={fleetIntro.description}
          link={fleetIntro.link}
        />
        <ul className="grid snap-x snap-mandatory [scrollbar-width:thin] auto-cols-[82%] grid-flow-col gap-[18px] overflow-x-auto pb-2 nav:auto-cols-auto nav:grid-flow-row nav:grid-cols-3 nav:overflow-visible nav:pb-0">
          {fleet.map((vehicle) => (
            <FleetCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </ul>
      </div>
    </section>
  );
}
