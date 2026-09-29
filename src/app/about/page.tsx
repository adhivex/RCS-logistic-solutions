import { AccentHeading } from "@/components/ui/accent-heading";
import { CtaSection } from "@/components/ui/cta-section";
import { trustIcons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { aboutPage, company, media, pages, trust } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: pages.about.title,
  description: pages.about.description,
  path: "/about",
});

/** docs/03-pages.md → /about: founder story, mission, milestones (when supplied), why RCS. */
export default function AboutPage() {
  return (
    <>
      <PageHero
        path="/about"
        {...pages.about.hero}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section aria-labelledby="story-heading" className="bg-white section-y">
        <div className="container-site grid items-center gap-12 nav:grid-cols-[0.95fr_1.05fr] nav:gap-[clamp(40px,7vw,110px)]">
          <div data-reveal className="relative mx-[18px] nav:mx-0">
            <span
              aria-hidden="true"
              className="absolute inset-[-18px_18px_18px_-18px] -z-0 rounded-[14px] border border-orange"
            />
            <div className="relative aspect-[438/400] overflow-hidden rounded-[14px] bg-[linear-gradient(160deg,var(--color-ink),var(--color-steel))]">
              <Photo
                item={media.founderPortrait}
                sizes="(min-width: 880px) 45vw, 100vw"
                fallback={
                  <span className="absolute inset-0 grid place-items-center font-serif text-[clamp(72px,12vw,140px)] text-white/90 italic">
                    {company.founderInitials}
                  </span>
                }
              />
            </div>
          </div>
          <div data-reveal>
            <Label>{aboutPage.storyLabel}</Label>
            <AccentHeading
              id="story-heading"
              heading={aboutPage.storyHeading}
              className="mt-6 mb-7 text-[clamp(36px,4.4vw,62px)]"
            />
            <blockquote className="m-0 mb-6 border-l-2 border-orange pl-6 font-serif text-[clamp(22px,2vw,27px)] leading-[1.4] text-ink">
              <p className="m-0">“{aboutPage.quote}”</p>
            </blockquote>
            {aboutPage.story.map((paragraph) => (
              <p key={paragraph} className="mt-0 mb-5 max-w-[540px]">
                {paragraph}
              </p>
            ))}
            <div className="mt-9 border-t border-line pt-7">
              <p aria-hidden="true" className="m-0 font-serif text-[34px] leading-none text-ink italic">
                {company.founder}
              </p>
              <p className="mt-2.5 text-xs tracking-[0.18em] text-muted uppercase">
                <span className="sr-only">{company.founder}, </span>
                {company.founderRole}, {company.name}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-heading" className="bg-paper section-y">
        <div className="container-site">
          <div data-reveal>
            <Label>{aboutPage.missionLabel}</Label>
            <AccentHeading
              id="mission-heading"
              heading={aboutPage.missionHeading}
              className="mt-[18px] mb-[clamp(28px,4vw,48px)] text-[clamp(32px,4.2vw,56px)]"
            />
          </div>
          <ol className="grid border-t border-line nav:grid-cols-3">
            {aboutPage.mission.map((item, index) => (
              <li key={item.title} data-reveal className="relative pt-8 pb-8 nav:pr-8 nav:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -top-1 left-0 size-[7px] rounded-full bg-orange"
                />
                <span
                  aria-hidden="true"
                  className="mb-5 block font-serif text-[44px] leading-none text-ink italic"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2.5 text-[21px] tracking-[-0.02em]">{item.title}</h3>
                <p className="m-0 text-[15px]">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {aboutPage.milestones.length > 0 && (
        <section aria-labelledby="milestones-heading" className="bg-white section-y">
          <div className="container-site">
            <h2 id="milestones-heading" className="mb-8 text-[clamp(32px,4.2vw,56px)]">
              Milestones
            </h2>
            <ol className="grid gap-4 border-l-2 border-orange pl-6">
              {aboutPage.milestones.map((milestone) => (
                <li key={milestone.year}>
                  <p className="font-display text-xl font-semibold text-ink">{milestone.year}</p>
                  <p>{milestone.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-labelledby="why-heading" className="bg-white section-y">
        <div className="container-site">
          <div data-reveal>
            <Label>{aboutPage.whyLabel}</Label>
            <AccentHeading
              id="why-heading"
              heading={aboutPage.whyHeading}
              className="mt-[18px] mb-[clamp(28px,4vw,48px)] text-[clamp(32px,4.2vw,56px)]"
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 wide:grid-cols-4">
            {aboutPage.whyChoose.map((item, index) => {
              const Icon = trustIcons[trust[index].icon];
              return (
                <li key={item.title} data-reveal className="rounded-2xl border border-line bg-white p-[26px]">
                  <span className="mb-5 grid size-12 place-items-center rounded-xl bg-orange-soft text-orange">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mb-1.5 text-xl tracking-[-0.02em]">{item.title}</h3>
                  <p className="m-0 text-[14.5px] leading-normal">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
