import type { MetadataRoute } from "next";
import { industriesServed } from "@/content/industries";
import { services } from "@/content/services";
import { siteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

/*
 * Indexable pages only. Legal pages are left out while they are drafts (noindex);
 * add them back once the client approves them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const paths = [
    "/",
    "/services",
    ...services.map((service) => service.href),
    "/about",
    ...(siteConfig.features.industries && industriesServed.length > 0 ? ["/industries"] : []),
    "/get-a-quote",
    "/contact",
  ];

  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") || path === "/get-a-quote" ? 0.8 : 0.6,
  }));
}
