import type { Metadata } from "next";
import { company, isFilled, services, type Faq, type Service } from "@/content";

/** Production base URL from the env, or null on previews/local (robots.txt then disallows all). */
export const siteUrl: string | null = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null;

/** Canonical origin. Previews still point canonicals and JSON-LD at production. */
export const canonicalOrigin = siteUrl ?? "https://www.rcsls.in";

export function absoluteUrl(path: string): string {
  return `${canonicalOrigin}${path === "/" ? "" : path}`;
}

type PageMetaInput = {
  /** Page name; the layout template appends "| RCS Logistic Solutions". */
  title: string;
  /** 140–160 characters, written for Odisha / eastern-India B2B and B2C search (06-seo-launch.md). */
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
      title: `${title} | ${company.name}`,
      description,
      url: path,
      siteName: company.name,
      locale: "en_IN",
      type: "website",
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

type JsonLd = Record<string, unknown>;

/** Site-wide LocalBusiness (06-seo-launch.md). Only confirmed values; no geo until confirmed. */
export function localBusinessJsonLd(): JsonLd {
  const sameAs = Object.values(company.social).filter((url) => isFilled(url));
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${canonicalOrigin}/#business`,
    name: company.name,
    alternateName: `${company.shortName} Logistic`,
    slogan: company.tagline,
    url: canonicalOrigin,
    logo: absoluteUrl("/brand/logo-on-light.png"),
    image: absoluteUrl("/opengraph-image"),
    telephone: company.phone.replace(/\s/g, ""),
    email: company.email,
    founder: { "@type": "Person", name: company.founder },
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    // Mon–Sat 10:00–19:30 (company.hours)
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:30",
    },
    areaServed: { "@type": "Country", name: "India" },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    makesOffer: services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service.name, url: absoluteUrl(`/services/${service.slug}`) },
    })),
  };
}

export function serviceJsonLd(service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.oneLiner,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": `${canonicalOrigin}/#business`, "@type": "LocalBusiness", name: company.name },
    areaServed: [
      { "@type": "State", name: "Odisha" },
      { "@type": "Country", name: "India" },
    ],
  };
}

export function faqJsonLd(faqs: Faq[]): JsonLd | null {
  const answered = faqs.filter((faq) => isFilled(faq.answer));
  if (answered.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: answered.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[], currentPath: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href ?? currentPath),
    })),
  };
}
