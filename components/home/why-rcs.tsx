import { Briefcase, MapPinned, MessagesSquare, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { whyRcsIntro } from "@/content/home";
import { whyRcs, type WhyRcsIcon } from "@/content/why-rcs";

const icons: Record<WhyRcsIcon, LucideIcon> = {
  b2b: Briefcase,
  communication: MessagesSquare,
  flexible: SlidersHorizontal,
  roots: MapPinned,
};

/** A ruled list, intentionally not cards — keeps it distinct from Services. */
export function WhyRcs() {
  return (
    <section aria-labelledby="why-heading" className="section-y">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="why-heading"
            heading={whyRcsIntro.heading}
            body={whyRcsIntro.body}
            className="lg:sticky lg:top-28"
          />
        </div>

        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {whyRcs.map((point) => {
            const Icon = icons[point.icon];
            return (
              <li key={point.title} className="border-t border-border py-8">
                <Icon className="size-6 text-brand-orange" aria-hidden="true" />
                <h3 className="font-wide mt-4 text-lg font-bold lg:text-xl">{point.title}</h3>
                <p className="mt-2 text-muted-foreground">{point.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
