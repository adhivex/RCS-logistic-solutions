import { trustIcons } from "@/components/ui/icons";
import { CtaBand } from "@/components/ui/cta-band";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PageHero } from "@/components/ui/page-hero";
import { Photo } from "@/components/ui/photo";
import { aboutPage, company, media, pages, trust } from "@/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: pages.about.description,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={aboutPage.title}
        intro={aboutPage.intro}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <section aria-labelledby="story-heading" className="section-y">
        <div className="container-site grid items-center gap-9 nav:grid-cols-[1fr_1.05fr] nav:gap-16">
          <div className="relative aspect-[438/356] overflow-hidden rounded-card bg-[#333]">
            <Photo item={media.founder} sizes="(min-width: 860px) 45vw, 100vw" tone="dark" />
          </div>
          <div>
            <Eyebrow>Our Founder</Eyebrow>
            <h2 id="story-heading" className="text-[clamp(28px,3.4vw,40px)] font-bold">
              The story behind <span className="text-brand-orange">RCS Logistic</span>
            </h2>
            {aboutPage.story.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-[560px]">
                {paragraph}
              </p>
            ))}
            <span aria-hidden="true" className="mt-7 mb-5 block h-[3px] w-[30px] bg-brand-orange" />
            <p aria-hidden="true" className="font-script text-[34px] leading-none text-brand-ink">
              {company.founder}
            </p>
            <p className="mt-2 text-[13px] font-semibold tracking-[0.08em] text-brand-ink uppercase">
              {company.founder}
            </p>
            <p className="text-sm">
              {company.founderRole}, {company.shortName}
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="mission-heading" className="bg-brand-mist section-y">
        <div className="container-site">
          <Eyebrow>What drives us</Eyebrow>
          <h2 id="mission-heading" className="mb-10 text-[clamp(28px,3.4vw,40px)] font-bold">
            Mission, partnership and <span className="text-brand-orange">vision</span>
          </h2>
          <ul className="grid gap-6 md:grid-cols-3">
            {aboutPage.mission.map((item) => (
              <li key={item.title} className="rounded-card border border-brand-line bg-white p-7">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {aboutPage.milestones.length > 0 && (
        <section aria-labelledby="milestones-heading" className="section-y">
          <div className="container-site">
            <h2 id="milestones-heading" className="mb-8 text-3xl font-bold">
              Milestones
            </h2>
            <ol className="grid gap-4 border-l-2 border-brand-orange pl-6">
              {aboutPage.milestones.map((milestone) => (
                <li key={milestone.year}>
                  <p className="font-display text-xl font-semibold text-brand-ink">{milestone.year}</p>
                  <p>{milestone.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section aria-labelledby="why-heading" className="section-y">
        <div className="container-site">
          <Eyebrow>Why RCS</Eyebrow>
          <h2 id="why-heading" className="mb-10 text-[clamp(28px,3.4vw,40px)] font-bold">
            Why businesses choose <span className="text-brand-orange">RCS</span>
          </h2>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPage.whyChoose.map((item, index) => {
              const Icon = trustIcons[trust.items[index].icon];
              return (
                <li key={item.title} className="border-t border-brand-line pt-6">
                  <Icon className="size-9 text-brand-orange" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[15px]">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
