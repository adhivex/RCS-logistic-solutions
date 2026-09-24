import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/** Disallow everything unless NEXT_PUBLIC_SITE_URL is set — keeps previews out of search. */
export default function robots(): MetadataRoute.Robots {
  if (!siteUrl) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
