# 07 — Build Plan

Work phase by phase. At the end of each phase: run `npm run lint && npm run build`, then stop and summarise. Paste the prompt under each phase to start it.

## Phase 0 — Audit the current site
> Fetch https://www.rcsls.in and every page linked from it (and /sitemap.xml if it exists). Write `docs/08-old-site-audit.md` with: list of URLs, page titles, all useful content (services, contact details, testimonials, client logos, certifications, stats), images worth keeping, and anything broken. Then propose redirects and content updates to `04-content.md`. Don't write app code yet.

(If the site blocks fetching, ask me to paste the content or save the pages into `docs/reference/old-site/`.)

## Phase 1 — Project setup
> Scaffold the Next.js app per CLAUDE.md: TypeScript, App Router, src/, Tailwind v4 with the tokens from 02-design-system.md, next/font (Poppins, Inter, Caveat), ESLint, Prettier, Prisma with the schema from 05-data-and-api.md, `.env.example`. Create `src/content/*.ts` from 04-content.md. Add a `/styleguide` route (noindex) showing colours, type scale, buttons, eyebrow.

## Phase 2 — Layout shell
> Build Header (sticky, mobile drawer), Footer, FloatingContact, Button, Eyebrow, SectionHeading, CtaBand, and a static QuoteDialog UI (no submit yet). Wire them into the root layout.

## Phase 3 — Home page
> Build the homepage to match docs/reference/homepage-mockup.png, using docs/reference/homepage-preview.html for layout and spacing. Section order and details from 03-pages.md. Use placeholder images in /public/images until real ones arrive. Check 375/768/1024/1440.

## Phase 4 — Inner pages
> Build /about, /fleet, /services, /services/[slug] (generateStaticParams), /industries, /network (inline SVG India map), /contact, /thank-you, /privacy, and the 404 page per 03-pages.md.

## Phase 5 — Quote flow
> Implement the submitQuote server action, Zod schema, honeypot, rate limit, Prisma save, Resend emails (React Email templates), UTM capture, redirect to /thank-you, and the analytics event — per 05-data-and-api.md. Pre-select service when the dialog opens from a service page. Add tests for the Zod schema and phone normalisation.

## Phase 6 — SEO & performance
> Implement everything in 06-seo-launch.md: metadata, JSON-LD, sitemap, robots, OG images, redirects from the Phase 0 audit. Then run Lighthouse on Home, one service page and Contact and fix anything under budget.

## Phase 7 — Launch prep
> Go through the launch checklist in 06-seo-launch.md, list every item that's done and every item that needs me or the client, and grep for remaining TODO(client).
