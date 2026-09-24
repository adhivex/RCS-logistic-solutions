# RCS Logistic Solutions — Claude Code Project Guide

Read this file fully before any work. Then read, in order:
`docs/content.md`, `docs/design-system.md`, `docs/architecture.md`, `docs/decisions.md`, `docs/open-questions.md`.

## Project
Build a premium, modern B2B logistics website for **RCS Logistic Solutions**, an Odisha-based logistics company serving businesses across India. Primary goal: generate qualified quote enquiries.

## Brand facts (confirmed)
- Brand name: RCS Logistic Solutions
- Founder: **Satya Swain**
- Positioning: reliable B2B logistics and supply-chain partner
- Primary market: B2B businesses
- Origin: Odisha, India

Everything else about the company (legal entity, designation, address, phone, email, GSTIN, stats, clients, certifications, industries served, domain, social links) is **unconfirmed**. See `docs/open-questions.md`.

## Non-negotiable rules
1. **Never invent facts.** No statistics, fleet size, years in business, certifications, client names, testimonials, addresses, phone numbers, awards, founder biography or service claims.
2. **Placeholder convention.** Every unconfirmed value uses the exact format `[[TBC: description]]`, e.g. `[[TBC: head office address]]`. Never use fake-but-realistic values like "+91 98765 43210" or "info@rcslogistics.com".
3. **All company facts live in one file:** `lib/site-config.ts`. Components read from it; no contact details are hard-coded in JSX.
4. **Unconfirmed sections stay hidden.** Anything driven by unconfirmed data (industries, metrics, testimonials, client logos, founder portrait, signature) is controlled by a flag in `lib/site-config.ts` and does not render until the flag is `true`.
5. **Do not alter the logo.** No redrawing, recolouring, distorting or effects. See "Logo usage" below.
6. **Accessibility is a requirement, not a polish step.** WCAG 2.1 AA contrast, semantic HTML, keyboard navigation, visible focus, labelled inputs, `prefers-reduced-motion` respected.

## Logo usage
- `public/brand/rcs-logo.png` — full logo, transparent, tightly cropped. Use on white and light-gray surfaces only.
- `public/brand/rcs-mark.png` — the "R" mark alone, 512×512 transparent. Use for favicon, app icon and the dark footer.
- `public/brand/source/rcs-logo-original.png` — client's original file. Reference only; never use in the UI.
- **No reversed (white) logo exists yet.** On navy/dark surfaces, use either the `rcs-mark.png` next to the brand name set in white text, or the full logo on a white rounded panel. Do not create a white version yourself.
- Always render with `next/image`, explicit width/height, and alt text "RCS Logistic Solutions".
- Replace with SVG files when the client supplies them (tracked in open questions).

## Stack
- Next.js (App Router), TypeScript (strict)
- Tailwind CSS (tokens defined in `app/globals.css` — see design system)
- shadcn/ui, Lucide React
- Motion (`motion` package, `motion/react`) for animation. **No GSAP** in the initial build.
- React Hook Form + Zod
- Prisma + Neon PostgreSQL (pooled `DATABASE_URL` at runtime, `DIRECT_URL` for migrations)
- Resend for notification email
- Cloudflare Turnstile for spam protection
- Vercel hosting + Vercel Analytics, Cloudflare DNS, Google Search Console

Use current stable versions and follow each library's current docs for setup (e.g. Prisma config and Tailwind theme syntax differ between major versions). Record versions chosen in `docs/decisions.md`.

## Architecture principles
1. Server Components by default; Client Components only for interaction, state or animation.
2. Reusable UI in `components/`; business logic in `lib/`, never in presentation components.
3. Copy and data arrays in `content/` or `lib/site-config.ts`, not inline in JSX.
4. Validate every public input with a shared Zod schema, on the client **and** again on the server.
5. Secrets are server-only. Only `NEXT_PUBLIC_*` variables may reach the browser.
6. All images through `next/image`, correctly sized, with meaningful alt text.
7. Mobile-first.

## Homepage structure
1. Sticky navbar (logo, nav, "Get a quote" button)
2. Hero
3. Capability strip — non-numeric, confirmed facts only (see content.md). Switches to a metrics strip only when `features.metrics` is enabled with verified numbers.
4. Services (4 confirmed services)
5. Founder — Satya Swain
6. Industries (hidden until `features.industries` is confirmed)
7. Why RCS
8. How it works (a genuine 4-step sequence)
9. Quote CTA
10. Footer

## Services (confirmed, in this order)
| Display name | Short label | Route |
|---|---|---|
| Full Truck Load | FTL | `/services/full-truck-load` |
| Part Truck Load | PTL | `/services/part-truck-load` |
| Warehousing & Storage | Warehousing | `/services/warehousing` |
| Supply Chain Solutions | Supply chain | `/services/supply-chain` |

Use these exact names everywhere (nav, cards, page titles, schema, form options). Add no other services without confirmation.

## Founder section
- Name: Satya Swain
- Designation: `[[TBC: founder designation]]` — show "Founder" until confirmed. Do **not** use "Managing Director" unless confirmed.
- Heading: **Moving Businesses Forward, Together.**
- Split layout: portrait + message. Until a real portrait is supplied (`features.founderPortrait`), use a restrained navy panel with the R mark instead of a photo. Never use a stock photo of a person as the founder.
- **No signature element** unless a scanned signature is supplied (`features.founderSignature`). Never simulate one with a script font.
- Message: short, factual, generic values only (see content.md). No biography.

## Quote form (primary conversion)
Fields, validation and behaviour are specified in `docs/content.md` → "Quote form". Summary:
- Required: name, company, email, phone (Indian mobile), pickup location, delivery location, service type, consent checkbox.
- Optional: approximate weight/load, vehicle type, preferred pickup date, message.
- Spam protection: Cloudflare Turnstile + honeypot field + server-side rate limit (see architecture.md).
- On success: store in Postgres via Prisma, send Resend notification to `QUOTE_NOTIFICATION_EMAIL`, show a clear success state. On failure: keep the user's input and show a specific, actionable error.
- Never email the submitter's data anywhere except the configured notification address.

## Secondary conversion
"Talk to our team" = WhatsApp click-to-chat using `NEXT_PUBLIC_WHATSAPP_NUMBER`, with a pre-filled message. If the variable is empty, fall back to the `/contact` page. Hide the floating WhatsApp button entirely when unset.

## Privacy & legal (India — DPDP Act 2023)
- Quote and contact forms require an unticked consent checkbox linking to `/privacy-policy`.
- Near the submit button, one sentence stating what the data is used for (responding to the enquiry).
- Pages required: `/privacy-policy`, `/terms`. Draft them as clearly-labelled templates with `[[TBC: ...]]` for entity name, address and grievance contact, plus a visible notice at the top: "Draft — pending review by RCS Logistic Solutions". The client must review them before launch.
- Store only what the form collects plus timestamp and a **hashed** IP (for rate limiting). Never store raw IPs.

## SEO
- Per-page metadata, Open Graph, canonical URLs, `sitemap.xml`, `robots.txt`.
- Base URL from `NEXT_PUBLIC_SITE_URL`. If unset, `robots.txt` must disallow all (prevents indexing a preview).
- JSON-LD: `Organization` and `Service` from confirmed data only. `LocalBusiness` only once a verified address exists. Omit any property whose value is still `[[TBC]]`.
- OG image: generate with the logo on a light background; 1200×630.

## Quality bar (before calling anything done)
- `npm run lint` and `npm run build` pass with zero errors
- Mobile (360px), tablet, desktop checked
- Keyboard-only walkthrough of navbar, menus, forms
- Form: valid submit, each validation error, server failure, Turnstile failure, rate-limit response
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95 on the homepage (mobile)
- No console errors or hydration warnings
- All internal links resolve
- Loading, empty and error states exist for anything async
- **Pre-launch only:** `grep -rn "\[\[TBC" app components content lib` returns nothing, and every `features.*` flag has been reviewed

## Git
Small, meaningful commits (one concern each). Never commit `.env*` files (except `.env.example`), secrets, build output or database credentials.

## Workflow
1. Inspect the repository before changing anything. Never blindly overwrite existing work.
2. Work in this order: scaffold → tokens & layout shell → site-config → homepage sections → service pages → quote form & backend → legal pages → SEO → QA.
3. When something is ambiguous, make the smallest reasonable assumption, record it in `docs/decisions.md`, and add any client-facing question to `docs/open-questions.md`.
4. Before building visual sections, write a short design plan against `docs/design-system.md` and check it for generic-template patterns (listed there).

## Next.js 16
@AGENTS.md
