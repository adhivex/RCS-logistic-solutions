import type { Metadata } from "next";
import type { Service } from "@/content/services";
import { isConfirmed, siteConfig } from "@/lib/site-config";

/** Production base URL, or null on previews (robots.txt then disallows all). */
export const siteUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;

export function absoluteUrl(path: string): string | null {
  return siteUrl ? `${siteUrl}${path === "/" ? "" : path}` : null;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** For drafts such as the legal templates. */
  noIndex?: boolean;
};

/** Per-page metadata: title, description, canonical and Open Graph. */
export function pageMetadata({ title, description, path, noIndex = false }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: siteUrl ? { canonical: path } : undefined,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: siteUrl ? path : undefined,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

type JsonLd = Record<string, unknown>;

/** Drop any value that is still a `[[TBC]]` placeholder, empty, or null. */
function confirmedOnly(entries: Record<string, unknown>): JsonLd {
  return Object.fromEntries(
    Object.entries(entries).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string") return isConfirmed(value);
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }),
  );
}

/** Organization schema from confirmed data only. */
export function organizationJsonLd(): JsonLd {
  const { contact, social } = siteConfig;
  return confirmedOnly({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteUrl,
    logo: absoluteUrl("/brand/rcs-logo.png"),
    email: contact.email,
    telephone: contact.phone,
    founder: { "@type": "Person", name: siteConfig.founder.name },
    sameAs: Object.values(social).filter((url): url is string => isConfirmed(url)),
  });
}

/** Service schema. `areaServed` is Odisha-based / India — both confirmed in the brief. */
export function serviceJsonLd(service: Service): JsonLd {
  return confirmedOnly({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(service.href),
    areaServed: { "@type": "Country", name: "India" },
    provider: confirmedOnly({ "@type": "Organization", name: siteConfig.name, url: siteUrl }),
  });
}
