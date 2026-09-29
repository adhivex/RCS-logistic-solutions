import type { MetadataRoute } from "next";
import { services } from "@/content";
import { absoluteUrl } from "@/lib/seo";

/** Indexable pages only (no /thank-you, /styleguide). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((service) => ({ path: `/services/${service.slug}`, priority: 0.9 })),
    { path: "/contact", priority: 0.9 },
    { path: "/fleet", priority: 0.7 },
    { path: "/about", priority: 0.7 },
    { path: "/industries", priority: 0.6 },
    { path: "/network", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
  ];
  return paths.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
