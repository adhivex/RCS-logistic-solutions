# 06 — SEO, Redirects, Performance & Launch

## Metadata
- Use the Metadata API in each `page.tsx`. Title pattern: `{Page} | RCS Logistic Solutions`. Home title: `RCS Logistic Solutions | B2B & B2C Truck Transport from Odisha Across India`.
- Unique description per page (140–160 chars), written for Odisha/eastern-India B2B and B2C search terms: "transport company in Odisha", "truck transport Cuttack", "full truck load Odisha", "logistics company Bhubaneswar".
- OG image: 1200×630, generated with `opengraph-image.tsx` (orange/ink brand, page title).
- `metadataBase` = `https://www.rcsls.in`, canonical on every page.

## Structured data (JSON-LD)
- Site-wide: `LocalBusiness` (name, logo, phone, address, geo, openingHours, sameAs) with each service listed under `makesOffer`.
- Service pages: `Service` with `provider` and `areaServed`.
- FAQs: `FAQPage`.
- Breadcrumbs on inner pages: `BreadcrumbList`.

## Files
- `src/app/sitemap.ts` and `src/app/robots.ts`
- Favicon set + `apple-icon.png` from the logo mark

## Redirects from the old site
In Phase 0, list every URL on the current rcsls.in (crawl links from the homepage, check `/sitemap.xml`). Map each to its new URL in `next.config.ts` `redirects()` as permanent (308). No old URL should 404 after launch.

## Performance budget
- LCP < 2.5s on mobile 4G, CLS < 0.05
- Hero image ≤ 200 KB (AVIF/WebP), `priority`, `sizes="100vw"`
- Total JS on Home < 120 KB gzipped — only Header, QuoteDialog, FloatingContact are client components
- Fonts: `next/font`, `display: swap`, subset latin

## Launch checklist
- [ ] All `TODO(client)` resolved (search the repo — must return zero)
- [ ] Real photos in place (founder, fleet, hero); no AI images of real people
- [ ] Quote form tested end to end on production: row in Supabase + both emails
- [ ] Supabase: RLS on for all tables, service role key only in Vercel server env, Point-in-Time/daily backups checked, project region Mumbai (ap-south-1)
- [ ] Resend domain verified (SPF/DKIM on rcsls.in)
- [ ] Redirects tested for every old URL
- [ ] Lighthouse mobile ≥ 90 / 100 / 100 / 100 on Home, a service page, Contact
- [ ] Google Search Console: verify domain, submit sitemap
- [ ] Google Business Profile links to the new site
- [ ] DNS switched to Vercel; `rcsls.in` redirects to `www.rcsls.in`
- [ ] 404 page and `/thank-you` noindex checked
- [ ] Cookie consent: no analytics/marketing requests before opt-in (check the Network tab), footer Cookie settings works, privacy page lists all cookies
