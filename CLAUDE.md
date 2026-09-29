# RCS Logistic Solutions — Website Rebuild

You are rebuilding **https://www.rcsls.in** for RCS Logistic Solutions, a B2B and B2C road logistics company from Odisha (founder: Satya Sankar Swain). The new site must look exactly like `docs/reference/homepage-preview.html` (the approved design) and generate quote requests from businesses and individual customers.

## Read before writing code
1. `docs/01-brief.md` — goals, audience, sitemap
2. `docs/02-design-system.md` — tokens, type, components
3. `docs/03-pages.md` — every page, section by section
4. `docs/04-content.md` — copy (items marked `TODO(client)` need confirmation)
5. `docs/05-data-and-api.md` — Supabase schema, quote API, email
6. `docs/06-seo-launch.md` — SEO, redirects, performance, launch checklist
7. `docs/07-build-plan.md` — the order to build in
8. `docs/09-cookie-consent.md` — cookie banner, preferences and script gating

Visual references:
- `docs/reference/homepage-preview.html` — **the approved final homepage (source of truth)**. Open it in a browser; reuse its layout, spacing, colours, copy and interactions.
- `docs/reference/brand/` — logo files
- `docs/reference/images/` — placeholder photos (cropped from the concept; low resolution — replace with real photos before launch)
- `docs/reference/original-mockup.png` — early inspiration only

## Stack (do not change without asking)
- Next.js (latest stable, App Router, TypeScript, `src/` dir)
- Tailwind CSS v4 — tokens in `src/app/globals.css` via `@theme`
- Supabase (Postgres) via `@supabase/supabase-js` + `@supabase/ssr`; schema managed with Supabase CLI migrations
- Resend for email
- Zod for validation, React Hook Form for forms
- lucide-react for icons
- Deploy on Vercel

## Rules
- Server Components by default. Add `"use client"` only for interactive pieces (header menu, quote form, carousel).
- All content lives in `src/content/*.ts` as typed constants — no copy hard-coded inside components.
- Images via `next/image` with real `alt`, explicit `sizes`, WebP/AVIF. Hero image gets `priority`.
- Fonts via `next/font/google` (Manrope, Inter, Instrument Serif). No `<link>` font tags.
- Every "Get a Quote" button opens the same `QuoteDialog` (or links to `/contact#quote` without JS).
- Mobile first. Check 375, 768, 1024, 1440 before calling a section done.
- Accessibility: visible focus rings, labelled inputs, contrast ≥ 4.5:1, respect `prefers-reduced-motion`.
- No new dependencies without saying why.
- Never commit secrets. Use `.env.local`; keep `.env.example` updated.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only: import the admin client only from files marked `import "server-only"`. Never prefix it with `NEXT_PUBLIC_`.
- Every table has Row Level Security enabled. The public (anon) key must not be able to read or write quote data.

## Workflow
- Work through **every phase in `docs/07-build-plan.md` in order, without stopping for approval between phases.** After each phase, run `npm run lint && npm run build`, fix any errors, commit (`git commit -m "Phase N: …"`), print a 3–5 line summary, and continue.
- Stop and ask only for a true blocker (a decision that changes scope, or a credential you cannot work around). Missing credentials are not a blocker — see "Local mode" below.
- When content is missing, use the `TODO(client)` placeholder from `04-content.md`; never invent phone numbers, addresses, stats or client names. Show TODOs visibly in dev (e.g. `[TODO: phone]`).
- Finish with Phase 8: run the site on localhost and report the URL.

## Local mode (no credentials yet)
The site must run fully on `npm run dev` with an empty `.env.local`:
- If Supabase env vars are missing, `submitQuote` validates, logs the request to the server console, skips the insert, and still redirects to `/thank-you`. Log a one-line warning at startup.
- If `RESEND_API_KEY` is missing, skip email and log the would-be email to the console.
- If Docker is available, prefer `npx supabase start` for a real local DB; otherwise use the fallback above.

## Commands
- `npm run dev` — local dev
- `npm run lint` / `npm run build`
- `npx supabase start` — run Supabase locally (needs Docker)
- `npx supabase migration new <name>` — create a migration in `supabase/migrations/`
- `npx supabase db reset` — rebuild the local DB from migrations
- `npx supabase db push` — apply migrations to the hosted project
- `npx supabase gen types typescript --local > src/lib/supabase/database.types.ts` — regenerate types after schema changes
- Supabase Studio (local: http://localhost:54323) — inspect quote requests

## Repo notes
- Work happens on the `redesign` branch; production (`main`, www.rcsls.in) serves v1 until it is merged.
- Decisions made while building are logged in `docs/12-decisions.md` (earlier kit: `docs/archive/kit-1/`, v1: `docs/archive/v1/`).

## Next.js 16
@AGENTS.md
