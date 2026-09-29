# 10 — Lighthouse (Phase 7)

Measured on 2026-09-29 with Lighthouse 13.5 (mobile, simulated slow 4G, headless Edge). The target was a local production build (`NEXT_PUBLIC_SITE_URL=https://www.rcsls.in npm run build && next start`) with local Supabase and no Resend.

## Results

| Page                        | Performance (default 4× CPU) | Performance (calibrated 1.5× CPU) | Accessibility | Best Practices | SEO     | LCP   | CLS | TBT (calibrated) |
| --------------------------- | ---------------------------- | --------------------------------- | ------------- | -------------- | ------- | ----- | --- | ---------------- |
| `/`                         | 69                           | **86**                            | **100**       | **100**        | **100** | 3.8 s | 0   | 150 ms           |
| `/services/full-truck-load` | 66                           | **89**                            | **100**       | **100**        | **100** | 3.5 s | 0   | 170 ms           |
| `/contact`                  | 56                           | **82**                            | **100**       | **100**        | **100** | 3.8 s | 0   | 290 ms           |

### Why two Performance columns

Lighthouse rates this laptop's CPU at a benchmark index of **360**, and warns that "the tested device appears to have a slower CPU than Lighthouse expects". The default 4× CPU throttle assumes a desktop scoring about 1000+, so on this machine it emulates a phone roughly three times slower than intended. That inflates blocking time: 0.8–1.2 s here, against about 0.15–0.3 s when calibrated.

The calibrated column uses `--throttling.cpuSlowdownMultiplier=1.5`, as Lighthouse's throttling guide recommends for slow machines. **Neither column replaces a real measurement:** run PageSpeed Insights on the Vercel preview or production URL before launch.

## Fixed in this phase

- **Layout shift on inner pages (CLS 0.092 → 0).** The page-hero text was bottom-aligned inside a `min-height`. When Manrope and Instrument Serif replaced the fallback fonts, the block grew and jumped. Page heroes and status panels are now top-aligned; the content is taller than the minimum height anyway, so nothing looks different.
- **Favicon 134 KB → 5 KB.** `src/app/icon.png` was a 512 px PNG fetched at high priority on every page. It's now a 96 px palette PNG.
- **Google Maps loads on click (`/contact` 59 → 82 calibrated).** The embed pulled about 500 KB of Google scripts, and set Google's cookies before any consent. It's now a card with the address, a "Show map" button and an "Open in Google Maps" link (decision D-23).
- **SEO 69 → 100.** The only failure was `is-crawlable`: `robots.txt` blocks everything unless `NEXT_PUBLIC_SITE_URL` is set. That's deliberate for previews. Measured with the production URL set, SEO is 100.

## What's left (and why)

- **LCP of about 3.5–3.8 s.** The LCP element is text (the hero lead paragraph or the page H1), not the hero photo. Almost all of it is "element render delay": the 13 KB CSS, four font files (102 KB) and about 170 KB of JS competing on simulated slow 4G.
  - The React + Next.js 16 runtime alone is about 115 KB gzipped (D-12), so the kit's "< 120 KB JS" budget isn't reachable with this stack.
  - A possible next step, if field data shows a problem: preload only the italic Instrument Serif (used above the fold) and let the upright cut load late.
- **Best Practices is 100 locally.** The Vercel Analytics script only loads with analytics consent, so the 404 noted in kit-1 (D-15) no longer appears.

## How to re-run

```bash
NEXT_PUBLIC_SITE_URL=https://www.rcsls.in npm run build
npx next start -p 3100
npx lighthouse http://localhost:3100/ --only-categories=performance,accessibility,best-practices,seo --view
```

On the live site, use https://pagespeed.web.dev/ instead. It reports real-user (field) data once the site has traffic.
