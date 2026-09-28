# RCS Logistic Solutions — Website Rebuild

You are rebuilding **https://www.rcsls.in** for RCS Logistic Solutions, a B2B road logistics company from Odisha (founder: Satya Sankar Swain). The new site must look like `docs/reference/homepage-mockup.png` and generate quote requests from businesses.

## Read before writing code
1. `docs/01-brief.md` — goals, audience, sitemap
2. `docs/02-design-system.md` — tokens, type, components
3. `docs/03-pages.md` — every page, section by section
4. `docs/04-content.md` — copy (items marked `TODO(client)` need confirmation)
5. `docs/05-data-and-api.md` — Prisma schema, quote API, email
6. `docs/06-seo-launch.md` — SEO, redirects, performance, launch checklist
7. `docs/07-build-plan.md` — the order to build in

Visual references:
- `docs/reference/homepage-mockup.png` — approved design direction (source of truth for look)
- `docs/reference/homepage-preview.html` — working HTML version of the homepage; reuse its layout, spacing and interactions

## Stack (do not change without asking)
- Next.js (latest stable, App Router, TypeScript, `src/` dir)
- Tailwind CSS v4 — tokens in `src/app/globals.css` via `@theme`
- Prisma + Neon Postgres
- Resend for email
- Zod for validation, React Hook Form for forms
- lucide-react for icons
- Deploy on Vercel

## Rules
- Server Components by default. Add `"use client"` only for interactive pieces (header menu, quote form, carousel).
- All content lives in `src/content/*.ts` as typed constants — no copy hard-coded inside components.
- Images via `next/image` with real `alt`, explicit `sizes`, WebP/AVIF. Hero image gets `priority`.
- Fonts via `next/font/google` (Poppins, Inter, Caveat). No `<link>` font tags.
- Every "Get a Quote" button opens the same `QuoteDialog` (or links to `/contact#quote` without JS).
- Mobile first. Check 375, 768, 1024, 1440 before calling a section done.
- Accessibility: visible focus rings, labelled inputs, contrast ≥ 4.5:1, respect `prefers-reduced-motion`.
- No new dependencies without saying why.
- Never commit secrets. Use `.env.local`; keep `.env.example` updated.

## Workflow
- Build in the phases in `docs/07-build-plan.md`. Stop at the end of each phase and summarise what changed.
- Before Phase 1, audit the existing live site (see Phase 0) and record findings in `docs/08-old-site-audit.md`.
- When content is missing, use the `TODO(client)` placeholder from `04-content.md`; never invent phone numbers, addresses, stats or client names.
- Run `npm run lint && npm run build` before finishing any phase.

## Commands
- `npm run dev` — local dev
- `npm run lint` / `npm run build`
- `npx prisma migrate dev` — apply schema changes
- `npx prisma studio` — inspect quote requests

## Next.js 16
@AGENTS.md
