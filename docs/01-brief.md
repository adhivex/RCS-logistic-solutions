# 01 — Project Brief

## Client
RCS Logistic Solutions — B2B and B2C road transport and logistics, based in Odisha, serving businesses and individual customers across India.
Founder: Satya Sankar Swain. Tagline: **Right Cargo, Right Stop**.

## Goal
Replace the current rcsls.in with a premium, fast, mobile-first site whose main job is to **turn visitors, businesses and individuals, into quote requests**.

Success looks like:
- A visitor understands what RCS does and where it operates within 5 seconds of landing.
- Any page is at most one click from a quote form.
- Quote requests arrive in the RCS inbox and are stored in the database.
- Lighthouse mobile: Performance ≥ 90, Accessibility = 100, SEO = 100.

## Audience
- Procurement / logistics managers at manufacturers, traders, FMCG distributors, steel/mining/cement suppliers in Odisha and eastern India
- Business owners who need a reliable transporter for recurring loads
- Individual customers (B2C) moving goods or personal cargo within Odisha and to other states — TODO(client): confirm which B2C services RCS offers (e.g. household/vehicle shifting, parcel, small loads)
- Mostly on mobile, often on 4G. Many will call rather than fill a form — make the phone number and WhatsApp easy to reach.

## Brand position
From Odisha to a stronger India. Dependable, modern, founder-led. Tone: confident, plain, specific. No logistics clichés ("seamless", "world-class", "one-stop solution").

## Sitemap
```
/                      Home
/about                 About & founder story
/fleet                 Fleet (vehicle types)
/services              Services overview
  /services/full-truck-load
  /services/part-truck-load
  /services/warehousing
  /services/supply-chain
/industries            Industries served
/network               Coverage map & routes
/contact               Contact + quote form (#quote)
/privacy               Privacy policy
/thank-you             Shown after a quote submit (noindex)
```

## Out of scope (for now)
Shipment tracking portal, customer login, online payments, blog. Keep the structure ready to add a `/insights` blog later.
