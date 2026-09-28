# 08 — Old Site Audit (Phase 0)

Audited 2026-09-29. No app code was changed in this phase.

## 1. What exists today

| Site | Status | Notes |
|---|---|---|
| **www.rcslogistic.com** | Live. This is the older RCS site the kit's phone number came from. | A single-page purchased template (Bootstrap/jQuery). Address, phone and founder name match RCS. |
| **www.rcsls.in** | Live. It serves the interim v1 build from this repo (Vercel project `rcsls`), which has been live since 2026-09-27. | `robots.txt` blocks all crawlers, so nothing is indexed. Snapshots from 27 and 28 Sep 2026 in the Web Archive show only this build. |
| IndiaMART "R C C Logistics Solution", Cuttack | A listing found in search. | It has a **different name** and "since 2007". **Not assumed to be RCS**, so it's a question for the client. |

### URLs

**rcslogistic.com**
| URL | Status | Title |
|---|---|---|
| `/` | 200 | RCS Logistics Solution \| Best Logistics Company |
| `/index.html` | 200 | same page |
| `/sitemap.xml` | 404 | — |
| All nav links (Home, About, Contact, Quick Links, Services) | `href="#"` | There are no other pages. `/about`, `/contact`, `/about.html`, `/contact.html` and `/services.html` all return 404. |

**www.rcsls.in (v1 build)**
`/` · `/services` · `/services/full-truck-load` · `/services/part-truck-load` · `/services/warehousing` · `/services/supply-chain` · `/about` · `/contact` · `/get-a-quote` · `/privacy-policy` · `/terms` · `/industries` (404, hidden) · `/opengraph-image` · `/icon.png` · `/apple-icon` · `/robots.txt` · `/sitemap.xml` (empty)

## 2. Content worth keeping (from old site)

| Item | Value on rcslogistic.com | Use |
|---|---|---|
| Phone | **+91 99388 74147** (`tel:+919938874147`) | This matches `04-content.md`. The client still needs to confirm it's current. |
| Email | **Info@rcslogistic.com** (hidden by Cloudflare email protection) | This address is on the **old domain**. Ask whether to keep it or move to an `@rcsls.in` address. It also matters for the Resend sending domain. |
| Address | Kapaleswar, Choudwar, Cuttack | Matches `04-content.md`. The full address with PIN is still needed. |
| Hours | "Mon-Sat: 10:00am to 07:30pm" | Matches `04-content.md`. |
| Founder | **Satya Sankar Swain — "CEO - Founder"** | This confirms the full name. The site says "CEO - Founder", while the kit shows "Founder, RCS Logistic". Ask which designation to use. |
| Brand name | Used inconsistently: "RCS Logistics", "RCS Logistics Solution", "RCS Logistic Solution" | The new brief standardises on **RCS Logistic Solutions** / short name **RCS Logistic**. Confirm with the client. |
| Copyright | "© 2025 RCS Logistic Solution" | This hints the business is recent. **It is not usable as a founding year.** |

Nothing else on the page is real RCS-specific content. There are no testimonials, client logos, certifications, fleet details or stats.

## 3. Content to discard: template filler, unverifiable or false

Do **not** carry any of these over, since they break the "never invent" rule:
- "With more than **30 years of experience** in the logistics industry"
- "**Award Winning Company** - Since 2024" and the "Year of Experience" counter
- "Fast and Safety **World wide** Service Provider", "global network of partners", "state-of-the-art technology and **advanced tracking systems**"
- Services listed as **Air Freight, Ocean Freight, Railway Freight**, Packaging and Distribution. RCS is road transport; the confirmed services are FTL, PTL, Warehousing and Supply chain.
- "Digital & Trusted Transport Logistic Company" and "leading logistics company"
- **Lorem ipsum** text in the footer ("Duis aute irure dolor…")
- A language switcher (EN / FR / GER / BAN) that does nothing
- A newsletter form, "Calculate Package", "Get Pricing Plan", "Meet The Team", "Our Clients", "Available Positions" and "Job Application". None of these exist.
- A video link to an **unrelated film music video** on YouTube (`ZdMZ40GSVmc`, "Leo – Badass Video", Sony Music South)

## 4. Images

| File (rcslogistic.com `/assets/img/…`) | Size | Assessment |
|---|---|---|
| `about/satya.png` | 768×955 | A founder portrait with an "RCS Logistics" sign in the window. It **looks stylised or possibly AI-generated**. Ask the client whether it's a genuine photo of Satya. The kit forbids AI images of real people, so it's only usable if it's a real photograph, and even then it's lower resolution than the requested 1600px+. |
| `slider/rcs-slider1–4.jpg` | 1920×820 | Generic stock, including a US Kenworth truck on an American highway. **Not Indian, not RCS, licence unknown. Don't reuse.** |
| `about/rcs-about.jpg` | small | A stock photo of a decorated Indian truck in Ladakh. The licence is unknown, so it's only usable if RCS holds the licence. |
| `about/rcs-exp.jpg`, `about/rcs-award.jpg` | 150–230px | Template decorations tied to the false claims. Discard. |
| Shapes and patterns | — | Template decoration. Discard. |

**Mockup and preview assets (`docs/reference/`)**
- The hero truck with RCS livery, the fleet photos and the founder photo in `homepage-mockup.png` and `homepage-preview.html` appear to be **generated or placeholder images**.
- The founder photo in the mockup shows a different-looking person from `satya.png`.
- **Neither may be used as Satya's photo** (the kit forbids AI images of real people). Use them as layout reference only.
- The new logo lockup ("RCS Logistic / Right Cargo, Right Stop") exists only as a 206×54 PNG inside the preview. **An SVG or high-resolution logo is needed from the client.** Until then, v1's `public/brand/rcs-logo.png` and `rcs-mark.png` are the only usable brand files.

## 5. Broken or problematic on the old site

- Every nav and footer link is `#`, and every page except `/` returns 404.
- There's no sitemap, and nothing to redirect beyond `/` and `/index.html`.
- There are false or unverifiable claims (section 3) and lorem ipsum.
- The language switcher and newsletter don't work.
- The video link is unrelated.

## 6. Proposed redirects

### On www.rcsls.in (v1 URLs → new sitemap), in `next.config.ts` `redirects()` as permanent 308s
| Old (v1) | New | Why |
|---|---|---|
| `/get-a-quote` | `/contact#quote` | The quote form moves to Contact. |
| `/privacy-policy` | `/privacy` | Renamed. |
| `/terms` | **Decision needed.** Keep `/terms`, or send it to `/privacy`. | The new sitemap has no Terms page. |
| `/services`, `/services/*`, `/about`, `/contact`, `/industries` | same path | These are unchanged, so no redirect is needed. |

v1 was never indexed (robots blocked it), so these redirects protect bookmarks and shared links rather than search rankings.

### rcslogistic.com → www.rcsls.in
If RCS is retiring the old domain, point **rcslogistic.com** and **www.rcslogistic.com** at Vercel as extra domains on the `rcsls` project, redirecting to `https://www.rcsls.in`, with `/index.html` also going to `/`. **This needs whoever controls rcslogistic.com's DNS** (it's behind Cloudflare). If they keep the old domain for email (`Info@rcslogistic.com`), only its web records change.

## 7. Proposed updates to `04-content.md`

- `company.phone` / `company.whatsapp`: keep **+91 99388 74147**, and add the note "(from old site: rcslogistic.com)". It still needs client confirmation.
- `company.email`: **Info@rcslogistic.com (from old site)**, marked `TODO(client): keep, or move to @rcsls.in?`.
- `company.address`: keep "Kapaleswar, Choudwar, Cuttack, Odisha (from old site)", marked `TODO(client): full address + PIN`.
- `company.hours`: "Mon–Sat, 10:00 am – 7:30 pm (from old site)", marked `TODO(client): confirm`.
- Add `company.founderRole`: "CEO & Founder" (the old site says "CEO - Founder") vs "Founder", marked `TODO(client): which?`.
- Services: **don't add** air, ocean or rail freight, packaging or distribution from the old site.
- There's nothing to add for testimonials, client logos, certifications or stats. None exist on the old site.

## 8. Notes for Phase 1 (the new kit vs this repo)

This repo already contains the v1 build, which is live on `rcsls` / www.rcsls.in. The kit was written for an empty folder. These points need a decision or will be handled in Phase 1:

1. **Rebuild in place.** Keep this repo and Vercel project (everything deploys to `rcsls`), and restructure into `src/` as the kit asks. The v1 git history stays.
2. **Prisma version.** The kit's `schema.prisma` uses Prisma 6 syntax (`url` / `directUrl` in `datasource`, `prisma-client-js`). The repo is on **Prisma 7.10**, where connection URLs live in `prisma.config.ts` and the generator is `prisma-client`. The kit's **models and fields** will be adopted, but written in Prisma 7 syntax. The v1 migration is replaced, which is safe because no database exists yet.
3. **Spam protection.** The kit's stack has no Cloudflare Turnstile, only a honeypot plus rate limiting (5 per 10 minutes). The Turnstile code from v1 would be removed unless you want to keep it.
4. **Env names change.** They become `QUOTE_FROM_EMAIL` and `QUOTE_NOTIFY_TO` (were `RESEND_FROM_EMAIL` and `QUOTE_NOTIFICATION_EMAIL`), and `IP_HASH_SALT` is no longer listed. The kit's `.env.example` is saved at `docs/reference/kit.env.example` and gets merged in Phase 1.
5. **Next.js 16.** The kit says "Hero image gets `priority`". That prop is deprecated in Next 16; use `preload`.
6. **Fonts.** Change to Poppins, Inter and Caveat (from Archivo).
7. **The v1 design rules are replaced** by `02-design-system.md`: eyebrow labels, an orange phrase in each H2, and the new orange `#F2611D`. Measured contrast: white on `#F2611D` is **3.23:1**, and white on the hover colour `#D94F10` is **4.14:1**. Both fail the kit's own ≥ 4.5:1 rule for button text. Orange text on white is also 3.23:1. That's fine for large headings (the orange H1 word and H2 phrases, ≥ 24px bold) but not for small orange text such as the "View All Vehicles" links or eyebrows. Phase 1 will propose a darker button and small-text orange that matches the mockup as closely as possible (v1 used `#B84D00` at 5.12:1). Orange on the ink background measures 5.50:1, which is fine.
8. **The trust strip copy** ("Pan India Reach", "Safe & Secure", "Reliable Partner", "Sustainable Growth") and the tag "Pan India" come from the brief, so the client supplied them. "Safe & Secure" and "Sustainable Growth" read as claims, so they're worth a quick client confirmation.
9. **The v1 docs** (`CLAUDE.md`, design system, decisions, open questions) have moved to `docs/archive/v1/` for reference.

## 9. Questions for the client (Satya)

1. Is **+91 99388 74147** still the right number for calls and WhatsApp?
2. Email: keep **Info@rcslogistic.com**, or switch to an **@rcsls.in** address? Which inbox should get quote requests?
3. What's the full office address with PIN?
4. Designation: **"Founder"** or **"CEO & Founder"**?
5. Is `satya.png` on the old site a real photograph? Please send a real high-resolution photo (1600px+, landscape).
6. Please send the new logo ("RCS Logistic / Right Cargo, Right Stop") as SVG.
7. Will rcslogistic.com be retired and redirected to www.rcsls.in? Who manages its DNS?
8. Is "R C C Logistics Solution" on IndiaMART related to RCS?
9. Please send real fleet photos, vehicle types and capacities, cities served and routes, and verified numbers (years in business, vehicles, cities, loads per month).
10. Which industries do you actually serve?
11. Should the Terms page stay?
