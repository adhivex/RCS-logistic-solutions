# 11 — Handover (Phase 8)

Status on 2026-09-29, branch `redesign`. Production (`main`, www.rcsls.in) still serves v1 until this branch is merged.

## What was built

A new website for RCS Logistic Solutions, built to the approved design in `docs/reference/homepage-preview.html` (kit v2).

- **Design.** Navy and orange palette; Manrope headings, Inter body text and Instrument Serif italic accents. The header is transparent over the hero and turns frosted on scroll. Pill buttons with a rotating arrow, reveal-on-scroll, film grain, and a mobile quick bar (Call / Get a Quote). The footer carries the OrangeKite credit.
- **Pages.**

  | Page                           | URL                             |
  | ------------------------------ | ------------------------------- |
  | Home                           | `/`                             |
  | About                          | `/about`                        |
  | Fleet                          | `/fleet`                        |
  | Services, plus 4 service pages | `/services`, `/services/[slug]` |
  | Industries                     | `/industries`                   |
  | Network (India map)            | `/network`                      |
  | Contact (full quote form)      | `/contact`                      |
  | Thank you                      | `/thank-you`                    |
  | Privacy & cookies              | `/privacy`                      |
  | 404 and error pages            | —                               |
  | Internal styleguide            | `/styleguide` (noindex)         |

- **Quote requests.**
  - One shared form, opened by every "Get a Quote". It has a Business/Individual toggle and pre-selects the service when opened from a service page.
  - Validation (Zod) runs in the browser and again on the server. Spam protection is a honeypot plus a limit of 5 requests per 10 minutes per IP (only a salted hash of the IP is stored).
  - Each request is saved to **Supabase** (`quote_requests`, RLS on, no public access) and triggers two **Resend** emails: one to RCS, and a confirmation to the customer if they gave an email address.
- **Cookie consent.** A banner, a preferences dialog and "Cookie settings" in the footer. Analytics (Vercel Web Analytics, UTM capture) loads only after opt-in. The Google Map on `/contact` loads only on click.
- **SEO.** Per-page titles and descriptions, canonical URLs, Open Graph images, JSON-LD (LocalBusiness, Service, FAQPage, BreadcrumbList), `sitemap.xml` and `robots.txt`, and 308 redirects for the old URLs.
- **Accessibility.** Lighthouse Accessibility is 100 on the audited pages. Focus rings are visible, inputs are labelled and reduced motion is respected. See `docs/10-lighthouse.md`.

Decisions and the reasons for them: `docs/12-decisions.md` (D-16 to D-24 for kit v2).

## How to run it

```bash
npm install
npm run dev          # http://localhost:3000
```

- **With no `.env.local` ("local mode"):** everything works. Quote requests are validated, logged to the terminal, and the visitor still sees `/thank-you`.
- **With the local database (Docker):**
  ```bash
  npx supabase start -x storage-api,imgproxy,logflare,vector,edge-runtime,realtime,mailpit,supavisor
  ```
  Put the printed URL and keys into `.env.local`. Leads then appear in Supabase Studio at http://127.0.0.1:55323 → Table Editor → `quote_requests`.
- **Checks:** `npm run lint`, `npm test` (27 tests), `npm run build`.

## Environment variables (Vercel → Project `rcsls` → Settings → Environment Variables)

| Variable                        | Value                                                                             | Where                |
| ------------------------------- | --------------------------------------------------------------------------------- | -------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                                              | Production + Preview |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key                                                                 | Production + Preview |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase service_role key. **Server only; never share or expose.**                | Production + Preview |
| `RESEND_API_KEY`                | From Resend                                                                       | Production           |
| `QUOTE_FROM_EMAIL`              | `RCS Logistic Solutions <quotes@rcsls.in>` (domain verified in Resend)            | Production           |
| `QUOTE_NOTIFY_TO`               | `info@rcsls.in`                                                                   | Production           |
| `RATE_LIMIT_SALT`               | A long random string (`openssl rand -hex 32`)                                     | Production + Preview |
| `NEXT_PUBLIC_SITE_URL`          | `https://www.rcsls.in`. **Production only, set at launch:** it turns on indexing. | Production           |

On the production deployment, missing Supabase variables make the quote form show "call or WhatsApp us" instead of silently dropping the lead (D-20).

## Deploying on Vercel

1. **Create the Supabase project** in region **Mumbai (ap-south-1)**. Then, from this folder:
   ```bash
   npx supabase login
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   ```
   Invite Satya as a read-only member so he can view leads.
2. **Resend.** Add and verify `rcsls.in` (SPF/DKIM DNS records), then create an API key.
3. **Vercel.** Add the variables above. Push the `redesign` branch; Vercel builds a **preview URL** automatically.
4. **Test on the preview.**
   - Submit a quote: check the row in Supabase and both emails.
   - Check the cookie banner (reject, accept, Cookie settings).
   - Run PageSpeed Insights on `/`, a service page and `/contact`.
5. **Launch.** Merge `redesign` into `main`, set `NEXT_PUBLIC_SITE_URL` for Production, and redeploy.
   - Submit `https://www.rcsls.in/sitemap.xml` in Google Search Console.
   - Update the Google Business Profile link.

## Remaining `TODO(client)` items

Run `grep -rn "TODO(client)" src --exclude=todo.ts --exclude=todo.tsx` to list them. In production each one is hidden or left out, never shown as a placeholder.

**Company and contact**

- Designation: "Founder" or "CEO & Founder"
- Confirm the hours (Mon–Sat 10:00 am – 7:30 pm)
- GSTIN (optional)
- LinkedIn, Facebook and Instagram URLs, if any
- Confirm the "we usually respond within one working day" promise in the quote dialog

**Photos and brand** (the site currently uses the kit's low-resolution concept crops, marked "Placeholder photo" in development)

- Hero: a real RCS truck on an Indian highway, landscape, 2400px+
- A real headshot and a landscape photo of Satya Sankar Swain. Until then, production shows an "SS" monogram (D-17).
- Photos of the three fleet vehicle types, 1600px+
- A true vector (SVG) logo

**Business details**

- Which services individual (B2C) customers can book
- Capacity range and typical routes for each vehicle type
- Real figures for the numbers strip and the network page, e.g. years in business, vehicles, cities served, loads per month. The preview's "28+ cities" is unverified and hidden in production.
- Cities served (with coordinates for the map) and key routes
- Warehouse location(s)
- Which industries apply
- Dated milestones (optional; the About section stays hidden without them)

**Copy to review**

- Service "what's included" lists and FAQs
- Vehicle "what it carries" lines
- Inner-page intros
- The About story and the "why choose RCS" lines

**Legal**

- Privacy and cookie text, reviewed by your legal advisor, including the **data retention period**
- If ad pixels are added later (Google Ads, Meta, LinkedIn): list them on `/privacy`, load them under Marketing consent (`src/components/consent/consent-scripts.tsx`), and bump `CONSENT_VERSION` in `src/lib/consent.ts`

## Still to do on our side

- Re-measure Performance on the Vercel preview with PageSpeed Insights (this laptop's CPU skews local results; `docs/10-lighthouse.md`).
- Point `rcslogistic.com` → `www.rcsls.in` (needs DNS access to that domain).
