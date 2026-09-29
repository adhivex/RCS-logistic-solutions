# 04 — Content

Put these in `src/content/`. Anything marked `TODO(client)` must be shown as a clearly visible placeholder in dev and confirmed with Satya before launch. **Never invent numbers, clients or certifications.**

## Company (`src/content/company.ts`)
```ts
export const company = {
  name: "RCS Logistic Solutions",
  shortName: "RCS",
  tagline: "Right Cargo, Right Stop",
  founder: "Satya Sankar Swain",
  founderRole: "Founder",               // TODO(client): "Founder" or "CEO & Founder" (old site said "CEO - Founder")
  phone: "+91 99388 74147",            // confirmed by client 2026-09-29 (also on old site rcslogistic.com)
  whatsapp: "919938874147",            // confirmed by client 2026-09-29
  email: "info@rcsls.in",              // confirmed by client 2026-09-29 — also receives quote requests (QUOTE_NOTIFY_TO)
  address: "Kapaleswar, Choudwar, Cuttack, Odisha 754071", // PIN confirmed by client 2026-09-29; Kapaleswar from old site
  hours: "Mon–Sat, 10:00 am – 7:30 pm", // from old site — TODO(client): confirm
  gstin: "TODO(client)",               // optional, footer
  social: { linkedin: "TODO(client)", facebook: "TODO(client)", instagram: "TODO(client)" },
};
```

## Home
### Hero
- Label: B2B & B2C Logistics · Est. in Odisha
- H1: Moving / Business / *Forward*
- Lead: From Odisha to a stronger India. Dependable road transport for businesses and individuals, keeping your cargo moving every day, every mile.
- Buttons: Get a Quote · Explore the Fleet
- Trust bar: Pan India Reach · Safe & Secure · Reliable Partner · Sustainable Growth

### Services section
- Label: What We Do — H2: Logistics built around *your supply chain.*

### Fleet section
- Label: Our Fleet — H2: The right vehicle for *every load.*
- Cards: Semi-Trailer Trucks (Long haul) · Box Trucks (Regional) · Light Commercial (Last mile)

### Numbers strip
28+ Major cities · 04 Service lines · 03 Vehicle classes · Pan India reach — TODO(client): replace with real figures (years in business, vehicles, loads/month)

### Founder strip
- Quote: "Building a dependable logistics network from Odisha for businesses across India."
- Satya Sankar Swain · Founder, RCS Logistic Solutions — link: Our story

### CTA section
- Label: Start a Shipment — H2: Ready to move your *business forward?*
- Line: Tell us what you're moving and where. We'll come back with a clear quote.
- Buttons: Get a Quote · Call the Team

### Footer
- Tagline: *Bigger routes, brighter tomorrows.*
- About: Dependable B2B & B2C road transport from Odisha across India.

## About page — founder story (long version)
RCS Logistic Solutions was founded by Satya Sankar Swain with a clear vision to build a dependable and modern logistics network from Odisha to businesses across India. With a strong focus on reliability, operational excellence and long-term partnerships, we are committed to keeping India's supply chain moving.

## Data files
### Fleet (`src/content/fleet.ts`)
| Name | One-liner | Capacity |
|---|---|---|
| Semi-Trailer Trucks | For heavy-duty, long-distance transportation | TODO(client) |
| Straight Trucks (Box Trucks) | Flexible. Reliable. Business ready. | TODO(client) |
| Light Commercial Vehicles | Built for the final mile. | TODO(client) |
Section description: A diversified fleet to handle a wide range of cargo requirements, from heavy industrial goods to time-sensitive deliveries.

### Services (`src/content/services.ts`)
| Slug | Name | One-liner |
|---|---|---|
| full-truck-load | Full Truck Load | A dedicated vehicle for your cargo, point to point, with no transfers along the way. |
| part-truck-load | Part Truck Load | Share space on scheduled routes and pay only for the capacity you use. |
| warehousing | Warehousing & Storage | Secure storage with inventory handling, ready to dispatch when your orders come in. |
| supply-chain | Supply Chain Solutions | Route planning and coordination across vendors, plants and distributors. |
Detail-page "what's included" and FAQs: draft them, mark each `TODO(client): review`.

### Industries (`src/content/industries.ts`) — TODO(client): confirm which apply
Steel & Metals · Mining & Minerals · Cement & Construction · FMCG & Retail Distribution · Agriculture & Food · Chemicals & Industrial Goods

### Network (`src/content/network.ts`)
- H2: From Odisha to Every Major Market
- Stats: TODO(client). The mockup's "1 State / 28+ Cities / 1 Network" is weak — ask for: years in business, vehicles in fleet, cities served, loads delivered per month. Use the strongest three.
- Cities served: TODO(client) list

## About — mission (adapt after client review)
- Deliver every load safely and on time, with clear updates at every step.
- Build long-term partnerships with the businesses we serve.
- Grow a modern logistics network from Odisha that serves all of India.

## Client answers (2026-09-29)
- Phone/WhatsApp +91 99388 74147 confirmed. Quote requests and public email: info@rcsls.in. PIN 754071.
- Company name: **RCS Logistic Solutions**. Not related to "R C C Logistics Solution" (IndiaMART).
- Founder photo, logo SVG, fleet details, cities served and verified numbers: will be supplied later — build with visible placeholders.

## Old site
Anything useful found on the current rcsls.in during the Phase 0 audit (services, testimonials, client logos, certifications, contact details) should be moved into these files, marked `(from old site)`.
