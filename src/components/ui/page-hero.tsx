import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import type { PageHeroCopy } from "@/content/pages";
import { breadcrumbJsonLd } from "@/lib/seo";
import { AccentHeading } from "./accent-heading";
import { Label } from "./label";

export type Crumb = { label: string; href?: string };

type PageHeroProps = PageHeroCopy & {
  breadcrumbs: Crumb[];
  /** This page's path, for the BreadcrumbList JSON-LD. */
  path: string;
  children?: ReactNode;
};

/**
 * docs/03-pages.md: inner pages open with a short navy hero (45vh) — label and an
 * H1 with a serif accent — so the transparent header works on every page.
 */
export function PageHero({ label, heading, intro, breadcrumbs, path, children }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className="grain relative isolate flex min-h-[45vh] items-end overflow-hidden bg-[linear-gradient(160deg,var(--color-ink)_0%,#1e3450_100%)] text-white/72"
    >
      <JsonLd data={breadcrumbJsonLd(breadcrumbs, path)} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[260px] -right-[240px] -z-10 size-[700px] bg-[radial-gradient(circle,rgb(234_90_36/0.2),rgb(234_90_36/0)_65%)]"
      />
      <div className="container-site pt-[132px] pb-12 nav:pt-[150px] nav:pb-16">
        <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-white/70">
          <ol className="flex flex-wrap items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="underline-offset-4 hover:text-white hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <Label tone="dark">{label}</Label>
        <AccentHeading
          as="h1"
          id="page-heading"
          heading={heading}
          tone="dark"
          className="mt-5 max-w-4xl text-[clamp(40px,6vw,84px)] leading-[0.98] tracking-[-0.045em]"
        />
        {intro && <p className="mt-6 max-w-[560px] text-[17px]">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
