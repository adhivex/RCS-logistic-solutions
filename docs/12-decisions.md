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

## 2026-09-29 — Kit v2

The client supplied a second kit (`RCSLS website design files.zip` → `rcs-website-kit`). It has a new approved preview (navy and orange, Manrope + Instrument Serif), Supabase instead of Prisma/Neon, B2B **and** B2C customers, cookie consent, and a Phase 8 handover. The user approved adopting it in full, running all phases back to back.

### D-16 — Rebuild to kit v2 in place
- The same `redesign` branch is used. The kit-1 build stays in git history.
- Kit-1 references are in `docs/archive/kit-1/`.
- This log moved from `09-decisions.md` to `12-decisions.md`, because the kit numbers `09-cookie-consent`, `10-lighthouse` and `11-handover`.
- Reusable kit-1 code stays: the Zod schema and phone normalisation, the React Email templates, UTM parsing, SEO/JSON-LD helpers, the India map, the `TODO(client)` convention, and the content files.

### D-17 — Kit photos are placeholders; the founder headshot is development-only
- The kit's hero and fleet crops come from the concept art and are low resolution (fleet about 290×123 px). They're used as placeholders so the site looks like the approved design, and are flagged `placeholder: true` in `src/content/media.ts`.
- `founder-headshot.jpg` is a concept-art face, not a confirmed photo of Satya. The kit's own checklist forbids AI images of real people, so it renders **only in development**, and production shows an "SS" monogram in the same ring. Confirmed by the user on 2026-09-29.

### D-18 — Contrast adjustments to the v2 palette
All kit colours were measured (the table is in `src/app/globals.css` and `/styleguide`):
- Orange `#EA5A24` is 3.51:1 on white, so it's used only for accent words at 32px or larger, icons and glows.
- Buttons and small orange text use `#C74916` (4.78:1).
- On navy, `#F2763F` is used (5.28:1).
- Two kit values fail the 3:1 rule for control boundaries (WCAG 1.4.11): the input underline (`#DFE4EB`, 1.28:1) and the off-state switch track (`#C9D1DB`, 1.54:1). Both use **`field` #8A94A3** (3.07:1). Inputs show a 2px orange underline on focus.

### D-19 — Supabase, local stack on its own ports
- Prisma, Neon and `dotenv` are removed. `@supabase/supabase-js` is added (the server-only admin client in `src/lib/supabase/admin.ts`), plus the `supabase` CLI as a dev dependency, used for migrations, the local database and type generation. `@supabase/ssr` isn't added: nothing needs it at launch (05-data-and-api.md).
- The migration is the kit's SQL, plus `revoke all … from anon, authenticated` as a second lock alongside RLS. It was checked on the local stack: the `anon` role gets "permission denied".
- Another project on this machine already uses the default Supabase ports, so this project uses **553xx** (API 55321, DB 55322, Studio 55323) in `supabase/config.toml`.
- On this machine the full stack failed its health checks. `supabase start -x storage-api,imgproxy,logflare,vector,edge-runtime,realtime,mailpit,supavisor` runs everything the site uses.
- The rate limit now follows the kit: it counts `quote_requests` rows with the same `ip_hash` in the last 10 minutes and rejects above 5. The kit-1 `RateLimitHit` table is gone. The env var is renamed `IP_HASH_SALT` → **`RATE_LIMIT_SALT`**.

### D-20 — Local mode never applies on the production deployment
- CLAUDE.md's local mode (no Supabase: validate, log and redirect to `/thank-you`) applies everywhere **except** `VERCEL_ENV=production`. There, missing credentials show the "call or WhatsApp us" error instead, so a real lead is never silently logged and lost.
- Missing Resend in any environment just logs the email and leaves `email_sent = false`.
- The kit-1 `REQUIRE_SERVER_ENV` flag is removed. The startup warning is one line.

### D-21 — Homepage details
- The preview's "28+ major cities" is unverified. It shows as a `TODO(client)` placeholder in development and is left out in production, leaving three figures. "04 service lines" and "03 vehicle classes" are counted from the content files.
- The preview's `.hero-aside` block is `display: none` at every width, so it isn't built.
- The header and drawer nav follow the preview (Home, Services, Fleet, About, Network, Contact). Industries is linked from the footer's Company column and from each service page, so it stays reachable.
- Every inner page opens with a navy hero, and thank-you, 404 and error use a navy panel, so the transparent header works everywhere. `/styleguide` gets the solid header.
- Phases 1–5 were rebuilt and committed together. The new tokens, fonts and content shapes replaced every kit-1 component at once, so intermediate commits wouldn't have built.

### D-22 — Cookie consent implementation
- The choice is stored in the first-party cookie `rcs-consent` (`SameSite=Lax`, `Secure` on https, 6 months), in the kit's format `{v, analytics, marketing, ts}`. No `localStorage` mirror.
- The server reads it: the server-side `quote_submitted` event is sent only with analytics consent.
- Instead of a context provider, a small external store (`src/lib/consent.ts`) with `useSyncExternalStore` (`useConsent()`) is used. Server rendering and hydration always see "no choice", so nothing optional renders before the browser reads the cookie.
- **Analytics** covers Vercel Web Analytics and the `rcs_utm` campaign cookie. UTM capture moved behind analytics consent: it's attribution tracking, not essential. **Marketing** has no vendors installed yet. `ConsentScripts` is where pixels go, with Google Consent Mode v2 defaults set to denied.
- Withdrawing consent stops optional scripts from the next page load; a script already running stays until navigation.
- Consent decisions aren't logged to a `consent_log` table (optional in the kit). This can be added later if the client wants an audit trail.
- The switches have `role="switch"`, visible labels and descriptions. The off track uses the `field` colour (D-18).

## 2026-09-29 — Phase 7

### D-23 — Google Maps loads on click
The contact-page embed loaded about 500 KB of Google scripts and set Google's cookies before any consent, even with `loading="lazy"`: it sits within the browser's lazy-load distance. `src/components/contact/map-embed.tsx` shows a card with the address, a **Show map** button (loads the iframe) and an **Open in Google Maps** link. The privacy page lists Google Maps as a third party.

### D-24 — Lighthouse on this machine
The CPU benchmark index is 360, so the default 4× throttle over-penalises blocking time. `docs/10-lighthouse.md` reports both default and calibrated (1.5×) results. Accessibility, Best Practices and SEO are 100, and CLS is 0 on all three pages. Performance must be confirmed with PageSpeed Insights on the Vercel preview.
