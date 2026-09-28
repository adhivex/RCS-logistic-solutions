import type { Metadata } from "next";
import { company } from "@/content";

/** Production base URL, or null on previews/local (robots.txt then disallows all). */
export const siteUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;

export function absoluteUrl(path: string): string | null {
  return siteUrl ? `${siteUrl}${path === "/" ? "" : path}` : null;
}

type PageMetaInput = {
  /** Page name; the layout template appends "| RCS Logistic — Right Cargo, Right Stop". */
  title: string;
  /** 140–160 characters, written for Odisha / eastern-India B2B search (06-seo-launch.md). */
  description: string;
  path: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, noIndex = false }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${company.shortName} — ${company.tagline}`,
      description,
      url: path,
      siteName: company.name,
      locale: "en_IN",
      type: "website",
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
