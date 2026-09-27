# Open Questions for RCS Logistic Solutions

Every item here blocks a `[[TBC]]` placeholder or a feature flag. Tick off and update `lib/site-config.ts` as answers arrive. **Nothing launches while this list has open "Before launch" items.**

## Before launch (required)
- [ ] Registered legal entity name and type (Pvt Ltd / LLP / partnership / proprietorship)
- [ ] Satya Swain's exact designation (Founder / Proprietor / Managing Director / Director)
- [ ] Head office address (for footer, contact page, LocalBusiness schema)
- [ ] Business phone number
- [ ] WhatsApp business number (can be same as phone)
- [ ] Enquiry email address (on the website domain)
- [ ] Email that should receive quote notifications
- [ ] Working hours
- [ ] Domain name (needed for Resend sending domain, canonical URLs, sitemap)
- [ ] Approval of hero copy, founder message and service descriptions (content.md)
- [ ] Review and approval of Privacy Policy and Terms drafts, including grievance contact
- [ ] Brand colours: confirm navy `#0F2026` / orange, or supply official values

## Assets
- [ ] Logo as SVG (full colour)
- [ ] Reversed logo for dark backgrounds (white wordmark)
- [ ] Founder portrait (professional, high resolution) → enables `features.founderPortrait`
- [ ] Scanned signature, if they want one → `features.founderSignature`
- [ ] Real photos: fleet, warehouse, loading operations, team (with permission of people shown)

## Enables optional sections
- [ ] Industries actually served (from candidate list in content.md) → `features.industries`
- [ ] Verified numbers: years in operation, fleet size, cities/states covered, shipments delivered, clients served → `features.metrics`
- [ ] Client logos with written permission to display → `features.clientLogos`
- [ ] Real testimonials with name, company and permission → `features.testimonials`
- [ ] Certifications/registrations to display (e.g. ISO, IBA, GST display preference)
- [ ] Social media links
- [ ] Specific differentiators they can stand behind (GPS tracking, insurance, response-time commitment, coverage regions)
- [ ] Do they want shipment tracking on the site, and do they use a TMS/tracking system?
- [ ] Any language besides English (Odia / Hindi)?

## Added during build (2026-09-25)
- [ ] Photos for the 3 homepage slots (hero, FTL, PTL) — placeholders confirmed for now (2026-09-25); client will supply later (`content/media.ts`)
- [ ] Privacy Policy: data retention period, grievance officer (name, email, phone), response period for requests
- [ ] Terms: city whose courts have jurisdiction
- [ ] Approval of new draft copy: services intro, "Who it's for" and steps on each service page (`content/services.ts`), About intro, quote CTA heading
- [ ] Neon database, Resend account and sending domain, Turnstile site — create and add keys to Vercel env; then set REQUIRE_SERVER_ENV=true in Vercel production
