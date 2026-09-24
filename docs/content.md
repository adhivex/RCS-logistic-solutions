# RCS Content Brief

All copy here is approved direction. Anything marked `[[TBC: ...]]` must come from the client — see `docs/open-questions.md`.

## Company
- Name: RCS Logistic Solutions
- Legal entity: `[[TBC: registered legal entity name and type]]`
- Positioning: Odisha-based B2B logistics company focused on dependable transportation and logistics solutions for businesses.

## Voice
Plain, confident, specific. Short sentences. Active voice. Sentence case for headings and buttons. No superlatives we can't prove ("India's best", "fastest", "No.1").

## Hero
- Headline: **Reliable logistics for a stronger tomorrow**
- Supporting: RCS Logistic Solutions helps businesses move goods with dependable, efficient logistics support — from full truck loads to warehousing.
- Primary CTA: **Get a quote** → `/get-a-quote`
- Secondary CTA: **Talk to our team** → WhatsApp (or `/contact` fallback)

## Capability strip (replaces metrics until numbers are verified)
Four short items, all confirmed by the brief:
- Based in Odisha
- Built for B2B
- Full & part truck loads
- Warehousing & supply chain

When verified numbers arrive, `features.metrics` switches this to a metrics strip. Never estimate numbers.

## Services
Exact names (use everywhere):
1. **Full Truck Load (FTL)** — Dedicated vehicles for full consignments, moving directly from pickup to delivery.
2. **Part Truck Load (PTL)** — Share vehicle space and pay for the capacity your shipment uses.
3. **Warehousing & Storage** — Storage support for goods between production, transit and delivery.
4. **Supply Chain Solutions** — Coordinated transport and storage planning around your business's supply needs.

Service page template: intro, "Who it's for", "How it works" (generic process), "Request a quote" block with the service pre-selected. No capacity figures, coverage lists, transit times or vehicle counts until confirmed.

## Founder section
- Heading: **Moving Businesses Forward, Together.**
- Name: Satya Swain
- Designation: `[[TBC: founder designation]]` (display "Founder" meanwhile)
- Message (draft, ~60 words, client to approve):
  > At RCS Logistic Solutions, we believe logistics is about trust. Businesses rely on us to move what matters to them, on time and with care. We focus on clear communication, dependable service and long-term relationships, so that our partners can concentrate on growing their business. When you work with RCS, you work with a team that treats your shipment as its own.
- No portrait until supplied; no signature unless supplied.

## Industries (hidden until confirmed)
Candidate list — client must confirm which they actually serve:
Steel & metals · Cement · FMCG · Manufacturing · Agriculture · Construction · E-commerce & retail · Other B2B industries

## Why RCS (confirmed-safe points)
- **B2B focus** — Built around the needs of businesses, not one-off parcels.
- **Clear communication** — One point of contact from quote to delivery.
- **Flexible options** — Full loads, part loads and storage, depending on what your shipment needs.
- **Odisha roots, India reach** — Headquartered in Odisha, serving businesses across India.

(If the client can confirm specifics such as tracking updates, insurance or GPS-enabled vehicles, those replace the generic points. Do not add them unconfirmed.)

## How it works
1. **Share your requirement** — Tell us pickup, delivery and load details.
2. **Get a quote** — We review your requirement and respond with a quote.
3. **Pickup & transit** — Your goods are collected and moved to destination.
4. **Delivery** — Consignment delivered and confirmed.

(No response-time promise, e.g. "within 2 hours", unless the client commits to one.)

## Quote form
| Field | Type | Required | Validation |
|---|---|---|---|
| Name | text | ✅ | 2–80 chars |
| Company | text | ✅ | 2–120 chars |
| Email | email | ✅ | valid email |
| Phone | tel | ✅ | Indian mobile: optional `+91`/`0` prefix, then 10 digits starting 6–9; store normalised as `+91XXXXXXXXXX` |
| Pickup location | text | ✅ | city/area, 2–120 chars |
| Delivery location | text | ✅ | city/area, 2–120 chars |
| Service type | select | ✅ | `FTL`, `PTL`, `WAREHOUSING`, `SUPPLY_CHAIN`, `OTHER` (labels = service display names + "Other / not sure") |
| Approx. weight / load | text | – | max 60 chars (free text, e.g. "8 tonnes", "12 pallets") |
| Vehicle type | select | – | `NOT_SURE` (default), `SMALL_COMMERCIAL`, `LCV`, `ICV`, `HCV`, `TRAILER`, `CONTAINER` — labels in plain language, e.g. "Heavy truck (HCV)" |
| Preferred pickup date | date | – | today or later |
| Message | textarea | – | max 1000 chars |
| Consent | checkbox | ✅ | must be ticked; unticked by default |
| Company website (honeypot) | hidden text | – | must be empty; visually hidden, `tabindex=-1`, `autocomplete=off` |

- Service type is pre-selected when the form is opened from a service page (`?service=ftl` etc.).
- Consent label: "I agree to RCS Logistic Solutions contacting me about this enquiry, as described in the [Privacy Policy](/privacy-policy)."
- Note above submit: "We use these details only to respond to your enquiry."
- Submit button: **Request quote**. Success heading: **Quote request received** — "Our team will contact you on the phone number or email you provided." (no time promise).
- Error copy examples: "Enter a 10-digit mobile number", "Enter the city or area for pickup", "We couldn't send your request. Check your connection and try again — your details are still here."

## Contact page
Address, phone, email, WhatsApp, hours, map — all `[[TBC]]` until supplied. Include a short contact form (name, email/phone, message, consent) using the same validation and spam protection.

## Footer
Mark + brand name, one-line description ("B2B logistics and supply-chain partner, based in Odisha."), quick links, services, contact (placeholders), social links (hidden until supplied), © year + `[[TBC: legal entity name]]`, links to Privacy Policy and Terms.
