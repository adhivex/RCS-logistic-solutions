import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** Blocks everything unless NEXT_PUBLIC_SITE_URL is set, so previews are never indexed. */
export default function robots(): MetadataRoute.Robots {
  if (!siteUrl) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/thank-you", "/styleguide"] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
