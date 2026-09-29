import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { fleet, fleetIntro, mediaSrc } from "@/content";

const isDev = process.env.NODE_ENV !== "production";

/**
 * docs/02-design-system.md → FleetCard: image top (12/5.4), navy body with title,
 * uppercase meta and a white arrow circle. Mobile: horizontal snap scroll, 78% cards.
 */
export function FleetSection() {
  return (
    <section aria-labelledby="fleet-heading" className="bg-white section-y">
      <div className="container-site">
        <SectionHead
          id="fleet-heading"
          label={fleetIntro.label}
          heading={fleetIntro.heading}
          link={fleetIntro.link}
        />
        <ul className="-mx-5 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-5 pb-1.5 nav:mx-0 nav:grid nav:grid-cols-2 nav:gap-5 nav:overflow-visible nav:px-0 nav:pb-0 wide:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {fleet.map((vehicle) => {
            const src = mediaSrc(vehicle.image);
            return (
              <li
                key={vehicle.slug}
                data-reveal
                className="shrink-0 grow-0 basis-[78%] snap-start nav:basis-auto"
              >
                <Link
                  href={`/fleet#${vehicle.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-ink text-white"
                >
                  <div className="relative aspect-[12/5.4] overflow-hidden bg-steel">
                    {src && (
                      <Image
                        src={src}
                        alt={vehicle.image.alt}
                        fill
                        sizes="(min-width: 1080px) 400px, (min-width: 880px) 50vw, 78vw"
                        className="object-cover transition-transform duration-1100 ease-brand group-hover:scale-106"
                      />
                    )}
                    {isDev && vehicle.image.placeholder && (
                      <span className="absolute right-2 bottom-2 rounded-full border border-dashed border-white/70 bg-ink/70 px-2 py-0.5 text-[10px] font-medium">
                        Placeholder photo
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col px-[22px] py-5">
                    <h3 className="text-[21px] tracking-[-0.03em] text-white">{vehicle.cardName}</h3>
                    <div className="mt-4 flex items-center justify-between border-t border-white/12 pt-3.5 text-xs tracking-[0.16em] text-white/60 uppercase">
                      {vehicle.role}
                      <span
                        aria-hidden="true"
                        className="grid size-10 place-items-center rounded-full bg-white text-ink transition-all duration-350 ease-brand group-hover:-rotate-45 group-hover:bg-orange-deep group-hover:text-white"
                      >
                        <ArrowUpRight className="size-4" strokeWidth={2.2} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
