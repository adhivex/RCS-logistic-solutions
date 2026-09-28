# 04 — Content

Put these in `src/content/`. Anything marked `TODO(client)` must be shown as a clearly visible placeholder in dev and confirmed with Satya before launch. **Never invent numbers, clients or certifications.**

## Company (`src/content/company.ts`)
```ts
export const company = {
  name: "RCS Logistic Solutions",
  shortName: "RCS Logistic",
  tagline: "Right Cargo, Right Stop",
  founder: "Satya Sankar Swain",
  phone: "+91 99388 74147",            // TODO(client): confirm — taken from an older RCS site
  whatsapp: "919938874147",            // TODO(client): confirm
  email: "TODO(client)",
  address: "Kapaleswar, Choudwar, Cuttack, Odisha", // TODO(client): confirm full address + PIN
  hours: "Mon–Sat, 10:00 am – 7:30 pm", // TODO(client): confirm
  gstin: "TODO(client)",               // optional, footer
  social: { linkedin: "TODO(client)", facebook: "TODO(client)", instagram: "TODO(client)" },
};
```

## Home
- Eyebrow: B2B Logistics Partner
- H1: Moving Business Forward
- Tag: Reliable. Efficient. Pan India.
- Lead: RCS Logistic delivers dependable B2B transportation solutions across Odisha and India, keeping your business moving—every day, every mile.
- Corner: From Odisha to a stronger India
- Trust: Pan India Reach · Safe & Secure · Reliable Partner · Sustainable Growth
- Script tagline: Bigger Routes, Brighter Tomorrows

### Founder
- H2: Driven by Purpose, Built for a Bigger Tomorrow
- Body: RCS Logistic was founded by Satya Sankar Swain with a clear vision to build a dependable and modern logistics network from Odisha to businesses across India. With a strong focus on reliability, operational excellence and long-term partnerships, we are committed to keeping India's supply chain moving.
- Photo: TODO(client) — real photo of Satya, landscape, 1600px+

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

### CTA band
- H2: Need a dependable logistics partner?
- Line: Tell us what you're moving and where. We'll come back with a quote.

## About — mission (adapt after client review)
- Deliver every load safely and on time, with clear updates at every step.
- Build long-term partnerships with the businesses we serve.
- Grow a modern logistics network from Odisha that serves all of India.

## Old site
Anything useful found on the current rcsls.in during the Phase 0 audit (services, testimonials, client logos, certifications, contact details) should be moved into these files, marked `(from old site)`.
