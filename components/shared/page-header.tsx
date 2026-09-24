import Link from "next/link";
import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

type PageHeaderProps = {
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
  /** Small context line above the title, only where it adds information (e.g. "FTL"). */
  kicker?: string;
  children?: ReactNode;
};

/** Header for inner pages: breadcrumb, H1, intro and optional actions. */
export function PageHeader({ title, intro, breadcrumbs, kicker, children }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-site py-12 lg:py-20">
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true">/</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="underline-offset-4 hover:text-navy hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-navy">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {kicker && <p className="mb-3 font-semibold text-muted-foreground">{kicker}</p>}
        <h1 className="font-display max-w-4xl text-[2.25rem] sm:text-5xl lg:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted-foreground lg:text-xl">{intro}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </header>
  );
}
