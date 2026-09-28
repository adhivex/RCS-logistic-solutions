import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Photo } from "@/components/ui/photo";
import { media, type MediaItem } from "@/content";

export type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  intro?: string;
  image?: MediaItem;
  breadcrumbs: Crumb[];
  children?: ReactNode;
};

/** Short inner-page hero (~40vh): image, dark gradient, breadcrumb, H1. */
export function PageHero({
  title,
  eyebrow,
  intro,
  image = media.aboutHero,
  breadcrumbs,
  children,
}: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative flex min-h-[40vh] items-end overflow-hidden bg-[#1c1a19] text-white"
    >
      <Photo item={image} sizes="100vw" preload tone="dark" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgb(14_14_16/0.9)_0%,rgb(14_14_16/0.55)_60%,rgb(14_14_16/0.3)_100%)] nav:bg-[linear-gradient(90deg,rgb(14_14_16/0.85)_0%,rgb(14_14_16/0.55)_50%,rgb(14_14_16/0.15)_100%)]"
      />
      <div className="relative container-site pt-24 pb-12 nav:pb-14">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/80">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="underline-offset-4 hover:text-white hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
        <h1
          id="page-heading"
          className="max-w-3xl text-[clamp(36px,5vw,60px)] leading-[1.05] font-extrabold text-white"
        >
          {title}
        </h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-white/90">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3.5">{children}</div>}
      </div>
    </section>
  );
}
