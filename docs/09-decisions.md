# 09 — Decisions (redesign)

Decisions made while following `docs/07-build-plan.md`. Earlier v1 decisions are in `docs/archive/v1/decisions.md`.

## 2026-09-29

### D-01 — Rebuild in place, on a `redesign` branch
The redesign lives in the same repo and Vercel project (`rcsls`, www.rcsls.in). Work happens on the `redesign` branch, so production keeps serving v1 until the new site is ready. Vercel builds preview URLs for the branch automatically. v1 source stays in `main`'s history.

### D-02 — Accessible orange alongside the brand orange
The kit's `#F2611D` with white text is 3.23:1, and its hover `#D94F10` is 4.14:1. Both fail the kit's own ≥ 4.5:1 rule for button text.
- **`brand-orange` #F2611D** stays for icons, bars, borders, focus rings and **large** headings (the hero "Forward" and the H2 highlight phrase, ≥ 24px bold, where 3:1 applies).
- **`action` #B94A15** is used for button fills and all small orange text (links, "Learn more", "View All Vehicles"). White on it is 5.18:1; as text it's 5.18:1 on white and 4.75:1 on mist. **`action-hover` #A44013** is 6.32:1.
- The outline button keeps a `brand-orange` border (non-text, 3.23:1 ≥ 3:1) with `action` text.

The buttons read slightly deeper than the mockup. That's intentional.

### D-03 — Prisma 7 syntax for the kit's schema
The kit's `schema.prisma` uses Prisma 6 syntax. The repo stays on **Prisma 7.10** (Decision 026 in v1):
- the `prisma-client` generator outputs to `src/lib/generated/prisma`;
- URLs live in `prisma.config.ts` (`DIRECT_URL` for migrations) and in `src/lib/db.ts` (pooled `DATABASE_URL` via `@prisma/adapter-neon`).

The models and fields are exactly as in `05-data-and-api.md`, with `pickupDate` stored as `@db.Date`. A fresh init migration replaces v1's; no database existed yet.

### D-04 — Postgres-backed rate limit table
`05-data-and-api.md` allows a Postgres or in-memory limiter. In-memory doesn't work across serverless instances, so a `RateLimitHit` table stores only a salted SHA-256 of the IP (`IP_HASH_SALT`), never the raw IP.

### D-05 — Spam protection: honeypot + rate limit only
Cloudflare Turnstile from v1 is removed, since it isn't in the kit's stack. The user didn't object when asked on 2026-09-29.

### D-06 — `/terms` → `/privacy`
The new sitemap has no Terms page, so v1's `/terms` will redirect to `/privacy` (Phase 6).

### D-07 — Dependencies
- **Removed:** `radix-ui`, `shadcn`, `tw-animate-css` and `motion`. The kit asks for minimal motion done in CSS, a native `<dialog>`, and no component library.
- **Kept:** `class-variance-authority` and `cn` for button variants; `@prisma/adapter-neon` (needed by Prisma 7); `@vercel/analytics` (in the kit).
- **Added:** `prettier`, and `prettier-plugin-tailwindcss`, which sorts Tailwind classes consistently. Both are dev-only.

### D-08 — Placeholder convention
Unconfirmed content starts with `TODO(client)` (`src/content/todo.ts`: `isTodo()`, `isFilled()`). From Phase 2, components show these as a dashed placeholder in development and omit them in production. Photo slots live in `src/content/media.ts` with `src: null` until real photos arrive.

### D-09 — Client answers applied (2026-09-29)
- Phone and WhatsApp +91 99388 74147 are confirmed.
- `info@rcsls.in` is the public email and receives quote requests (`QUOTE_NOTIFY_TO`).
- The address is Kapaleswar, Choudwar, Cuttack, Odisha **754071**.
- The company name is RCS Logistic Solutions.
- The designation isn't answered yet, so "Founder" is shown with a `TODO(client)` note.

## 2026-09-29 — Phases 3–6

### D-10 — Heading highlight colour on light backgrounds
Lighthouse measured the brand orange `#F2611D` highlight phrase at **2.96:1** on the mist background, which fails 3:1 even for large text. A `highlight` token **#EA5B19** is used for H2 highlight phrases on white/mist: 3.49:1 on white, 3.20:1 on mist. It's visually almost identical. Dark sections (hero, stat band) keep `#F2611D` at 5.50:1 on ink.

### D-11 — Placeholders and TODO(client) in production
- The photo slots show neutral frames. The dev-only label with the photo brief is hidden in production.
- Unverified stats, capacities, routes, cities, FAQ answers and the retention period are **omitted in production** and shown as dashed placeholders in development.
- The StatBand hides itself when it would only repeat a heading.

### D-12 — Quote form loads on demand
`QuoteDialog` loads the form (React Hook Form + Zod, about 45 KB gzipped) with `next/dynamic` on first open. Client components import specific `@/content/*` files rather than the barrel.
- Homepage initial JS went from about 299 KB to **about 198 KB gzipped**. That includes a 38.7 KB `noModule` polyfill that modern browsers skip, so **about 159 KB** is actually loaded.
- The React + Next.js 16 runtime alone is about 115 KB, so the kit's **< 120 KB budget isn't reachable with this stack**. The site's own code is about 44 KB.

### D-13 — Network map data
The `/network` map is an inline SVG built from **Natural Earth** (public domain):
- `ne_10m_admin_0_countries_ind` provides India's outline **from India's official point of view**. Maps published in India must show the official boundaries.
- `ne_50m_admin_1_states_provinces` provides Odisha.

The paths are simplified to about 10 KB (`src/components/network/india-map-data.ts`). City markers use `projectPoint(lon, lat)`, so each city in `src/content/network.ts` needs coordinates.

### D-14 — Quote submission details
- The form sends raw strings, and the server re-validates with the same Zod schema (`src/lib/validation/quote.ts`).
- On success the client redirects to `/thank-you`. `quote_submitted` is tracked server-side via `@vercel/analytics/server`.
- When the backend isn't configured (no Neon/Resend yet), the visitor sees "call or WhatsApp us on +91 99388 74147", and their input is kept.
- Dependencies added: `@react-email/components` and `@react-email/render` (the kit asks for React Email templates; Resend needs the renderer), `vitest` for the schema, phone and email-template tests, and `@types/node` bumped from 20 to 24 (Vitest peer requirement; the runtime is Node 24).

### D-15 — Lighthouse (local production build, mobile, headless Edge)
- **Accessibility 100 and SEO 100** on Home, `/services/warehousing` and `/contact`.
- Best Practices 96: the only failure is the Vercel Analytics script 404, which only exists on Vercel.
- **Performance 73–79**, with LCP about 3.8–4.2 s. On this dev machine even a blank page paints slowly (see v1 notes), so **Performance must be re-measured on the Vercel preview or production** with PageSpeed Insights.
