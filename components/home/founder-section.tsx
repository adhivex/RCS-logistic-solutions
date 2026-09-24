import Image from "next/image";
import { founderSection } from "@/content/founder";
import { siteConfig } from "@/lib/site-config";

function FounderVisual() {
  const { founder, features } = siteConfig;

  if (features.founderPortrait) {
    const { portrait } = founderSection;
    return (
      <Image
        src={portrait.src}
        alt={`${founder.name}, ${founder.designation}, ${siteConfig.name}`}
        width={portrait.width}
        height={portrait.height}
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="aspect-[4/5] w-full rounded-lg object-cover"
      />
    );
  }

  // Restrained brand panel until a real portrait is supplied — never a stock person.
  return (
    <div aria-hidden="true" className="relative flex aspect-[4/5] w-full flex-col items-center justify-center rounded-lg bg-navy max-lg:aspect-[16/10]">
      <Image src="/brand/rcs-mark.png" alt="" width={512} height={512} className="w-[34%] max-w-48" />
      <p className="absolute inset-x-0 bottom-0 px-6 py-5 text-sm text-muted-on-dark">
        <span className="font-semibold text-white">{founder.name}</span> · {founder.designation}
      </p>
    </div>
  );
}

export function FounderSection() {
  const { founder, features } = siteConfig;

  return (
    <section aria-labelledby="founder-heading" className="section-y bg-surface">
      <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <FounderVisual />
        </div>

        <div className="lg:col-span-7">
          <h2 id="founder-heading" className="font-display text-[1.875rem] sm:text-4xl lg:text-[2.75rem]">
            {founderSection.heading}
          </h2>
          <figure className="mt-8 lg:mt-10">
            <blockquote className="border-l-2 border-brand-orange pl-6 text-lg leading-relaxed text-navy lg:text-xl">
              <p>{founderSection.message}</p>
            </blockquote>
            <figcaption className="mt-6 pl-6">
              {features.founderSignature && (
                <Image
                  src={founderSection.signature.src}
                  alt={`Signature of ${founder.name}`}
                  width={founderSection.signature.width}
                  height={founderSection.signature.height}
                  className="mb-3 h-12 w-auto"
                />
              )}
              <span className="block font-bold text-navy">{founder.name}</span>
              <span className="block text-muted-foreground">
                {founder.designation}, {siteConfig.name}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
