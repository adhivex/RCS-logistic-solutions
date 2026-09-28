# 03 — Pages

Every page: Header → content → CtaBand (except /contact) → Footer. Copy comes from `04-content.md`.

## / (Home) — match the mockup exactly
1. **Hero** — full-bleed truck image, dark left gradient. Eyebrow "B2B Logistics Partner", H1 "Moving / Business / Forward" (Forward orange), tag line, lead paragraph, buttons Get a Quote + Our Fleet. Top-right (desktop only): "From **Odisha** / to a stronger **India**". Mobile: text anchored bottom, bottom-up gradient.
2. **TrustStrip**
3. **Founder** — photo left (overlay "People drive progress"), copy right, signature, name, role, Our Story → /about.
4. **Fleet** — SectionHeading + 3 FleetCards → /fleet. Mobile: horizontal snap carousel.
5. **Services** — SectionHeading + 4 ServiceItems → /services/*.
6. **Industries** (compact) — row of 6 industry chips with icons → /industries.
7. **Network** — StatBand with heading, 3 stats, Explore Network → /network.
8. **CtaBand**

## /about
- Page hero (short, 40vh, image + H1 "About RCS Logistic")
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
