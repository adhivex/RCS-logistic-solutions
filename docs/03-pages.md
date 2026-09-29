# 03 — Pages

Every page: Header → content → CtaSection (except /contact) → Footer. Inner pages use a short page hero (navy, 45vh, label + H2 with serif accent) so the transparent header still works. Copy comes from `04-content.md`.

## / (Home) — match `docs/reference/homepage-preview.html` exactly
Keep the homepage short. Only these sections, in this order:
1. **Hero** + TrustBar
2. **Services** — 4 ServiceCards → /services/[slug]
3. **Fleet** — 3 FleetCards → /fleet
4. **NumbersStrip**
5. **FounderStrip** (small) → /about
6. **CtaSection**
Then Footer, MobileQuickBar, CookieBanner.

Everything else (founder story, how it works, network detail, industries) lives on inner pages.

## /about
- Page hero (short, 40vh, image + H1 "About RCS Logistic Solutions")
- Founder story (longer version, photo, signature)
- Mission / vision / values (3 columns, from content)
- Milestones timeline — only if client provides dated milestones (`TODO(client)`), otherwise omit the section
- Why businesses choose RCS (4 points, reuse TrustStrip items with a sentence each)

## /fleet
- Page hero
- One block per vehicle type (alternating image/text): name, what it carries, capacity range, typical routes — capacities are `TODO(client)`
- CtaBand "Not sure which vehicle you need? Tell us the load."

## /services
- Page hero + intro
- 4 large cards linking to detail pages

## /services/[slug] (4 pages, one template)
Generated from `src/content/services.ts` with `generateStaticParams`.
- Hero with service name + one-liner + Get a Quote (pre-selects this service in QuoteDialog)
- "What's included" list
- "Who it's for" (industries)
- "How it works" — 4 numbered steps (it *is* a sequence: Request → Plan → Move → Deliver & confirm)
- FAQ (3–5 Q&As, rendered with `<details>`, FAQPage JSON-LD)
- Related services

## /industries
Grid of industries (icon, name, 1–2 sentences on what RCS moves for them).

## /network
- Map of India with Odisha highlighted and served cities marked — inline SVG component, cities from `src/content/network.ts`
- StatBand
- List of key routes / corridors (`TODO(client)`)

## /contact
Two columns: left = contact details (phone, WhatsApp, email, address, hours, embedded Google Map iframe with `loading="lazy"`); right = full quote form with `id="quote"`. No CtaBand.

## /thank-you
"Quote request received" + what happens next + phone number. `noindex`.

## /privacy
Plain policy covering the quote form data (what's collected, why, retention, contact). Short and honest.

## 404
Friendly message, links to Home, Services, Contact.
