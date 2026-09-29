# 07 — Build Plan

Run all phases in order, without pausing between them. After each phase: `npm run lint && npm run build` → fix → commit → short summary → next phase.

## Phase 0 — Audit the current site
Fetch https://www.rcsls.in and pages linked from it (plus /sitemap.xml). Write `docs/08-old-site-audit.md`: URLs, titles, useful content (services, contact details, testimonials, client logos, certifications, stats), images worth keeping, broken things, and a redirect map. Merge anything useful into `04-content.md` marked `(from old site)`.
If the site can't be fetched, note that in the audit file and continue — don't stop.

## Phase 1 — Setup
Scaffold Next.js (TypeScript, App Router, `src/`, ESLint, Prettier) with Tailwind v4 tokens from `02-design-system.md` and fonts via `next/font` (Manrope, Inter, Instrument Serif). `git init`. Copy `docs/reference/brand/*` → `public/brand/` and `docs/reference/images/*` → `public/images/` (convert to WebP). Supabase: `npx supabase init`, migration from `05-data-and-api.md`, typed clients in `src/lib/supabase/`. Create `.env.example`, `src/content/*.ts` from `04-content.md`, and a `/styleguide` route (noindex) showing colours, type, buttons, labels.

## Phase 2 — Layout shell
Header (transparent → frosted on scroll, logo swap, mobile drawer), Footer (exact structure from the preview, OrangeKite credit), MobileQuickBar, Button, Label, SectionHead, CtaSection, QuoteDialog UI. Wire into the root layout.

## Phase 3 — Home page
Build `/` to match `docs/reference/homepage-preview.html` section by section (Hero + TrustBar, Services, Fleet, NumbersStrip, FounderStrip, CtaSection). Reveal-on-scroll animation respecting reduced motion. Compare against the preview at 375, 768, 1024 and 1440px wide and fix differences.

## Phase 4 — Inner pages
`/about`, `/fleet`, `/services`, `/services/[slug]` (generateStaticParams; include the 4-step "How it works" and FAQ), `/industries`, `/network` (inline SVG India map), `/contact` (details + full quote form `#quote`), `/thank-you`, `/privacy` (incl. Cookies section), `not-found`. Same visual language as the homepage.

## Phase 5 — Quote flow
`submitQuote` server action: shared Zod schema, honeypot, IP-hash rate limit, Supabase insert via server-only admin client, Resend emails (React Email), UTM capture, redirect to `/thank-you`, analytics event. Business/Individual toggle. Service pre-selected when opened from a service page. Local mode fallbacks from CLAUDE.md. Unit tests for the Zod schema and phone normalisation (Vitest).

## Phase 6 — Cookie consent
Implement `09-cookie-consent.md`, porting the banner and preferences dialog from the preview. Gate analytics/marketing scripts on consent. Footer "Cookie settings" reopens preferences.

## Phase 7 — SEO, accessibility & performance
Everything in `06-seo-launch.md`: metadata, JSON-LD, sitemap, robots, OG images, redirects from the Phase 0 audit. Run Lighthouse (mobile) on `/`, one service page and `/contact` against a production build (`npm run build && npm start`); fix until Performance ≥ 90 and Accessibility, Best Practices, SEO = 100 where achievable. Write results to `docs/10-lighthouse.md`.

## Phase 8 — Final check & show the site on localhost
1. `npm run lint && npm run build` — must pass with zero errors.
2. Start the dev server: `npm run dev` (keep it running in the background).
3. Open http://localhost:3000 in the browser (`open` on macOS, `xdg-open` on Linux, `start` on Windows). If a browser/screenshot tool is available, take screenshots of `/` at 1440px and 390px and compare them to `docs/reference/homepage-preview.html`.
4. Click through every page and test: mobile menu, Get a Quote dialog (submit once in local mode), cookie banner (reject / accept / customise / reopen from footer), footer links, OrangeKite link.
5. Write `docs/11-handover.md`: what was built, how to run it, env vars needed, and the full list of remaining `TODO(client)` items (`grep -rn "TODO(client)" src docs`).
6. Finish by printing:
   - ✅ **Website is running at http://localhost:3000**
   - The list of page URLs (localhost links)
   - The remaining TODO(client) items
   - Next steps to deploy on Vercel
