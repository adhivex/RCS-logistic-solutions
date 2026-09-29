import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * Permanent (308) redirects so no old URL 404s — docs/08-old-site-audit.md §6.
   * v1 URLs on rcsls.in, plus /index.html from the old rcslogistic.com site.
   */
  async redirects() {
    return [
      { source: "/get-a-quote", destination: "/contact#quote", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms", destination: "/privacy", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
