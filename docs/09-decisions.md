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
