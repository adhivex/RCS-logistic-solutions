# 10 — Launch Checklist (Phase 7)

Status as of 2026-09-29, for the `redesign` branch. Production (www.rcsls.in, `main`) still serves v1 until `redesign` is merged.

## Checklist from 06-seo-launch.md

| Item | Status | Who |
|---|---|---|
| All `TODO(client)` resolved — `grep -rn "TODO(client)" src --exclude=todo.ts --exclude=todo.tsx` returns zero | ❌ **46 lines left** (see below) | Client |
| Real photos in place (founder, fleet, hero); no AI images of real people | ❌ Placeholder frames. Slots: `src/content/media.ts`, `src/content/fleet.ts` | Client |
| Quote form tested end to end on production: DB row + both emails | ❌ Blocked: no Neon database or Resend account yet. Validation, error handling and email templates are tested (Vitest + browser) | You, then me |
| Resend domain verified (SPF/DKIM on rcsls.in) | ❌ | You (DNS) |
| Redirects tested for every old URL | ✅ Locally: `/get-a-quote` → `/contact#quote`, `/privacy-policy` & `/terms` → `/privacy`, `/index.html` → `/` (all 308). rcslogistic.com → www.rcsls.in still needs DNS access to that domain | You |
| Lighthouse mobile ≥ 90 / 100 / 100 / 100 on Home, a service page, Contact | ⚠️ Accessibility **100**, SEO **100**, Best Practices 96 (only the analytics 404, which exists only off Vercel). Performance 73–79 measured locally. **Re-measure on the Vercel preview** | Me, on preview |
| Google Search Console: verify domain, submit sitemap | ❌ After launch | You |
| Google Business Profile links to the new site | ❌ | Client |
| DNS switched to Vercel; `rcsls.in` → `www.rcsls.in` | ✅ Already live (308) | — |
| 404 page and `/thank-you` noindex checked | ✅ Both `noindex`; `/thank-you` and `/styleguide` are disallowed in robots.txt | — |

## Environment variables to add in Vercel (project `rcsls`, Production)

| Variable | Value |
|---|---|
| `DATABASE_URL` | Neon **pooled** connection string |
| `DIRECT_URL` | Neon direct connection string (for `npm run db:deploy`) |
| `RESEND_API_KEY` | From Resend |
| `QUOTE_FROM_EMAIL` | e.g. `RCS Logistic <quotes@rcsls.in>` (domain verified in Resend) |
| `QUOTE_NOTIFY_TO` | `info@rcsls.in` |
| `IP_HASH_SALT` | Random, e.g. `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.rcsls.in`. **Set this only at launch**: it unblocks indexing |
| `REQUIRE_SERVER_ENV` | `true` once all of the above are set |

Then run `npm run db:deploy` once against the Neon database.

## Remaining `TODO(client)` items, by topic

**Contact and company**
- Designation: "Founder" or "CEO & Founder"
- Confirm hours Mon–Sat 10:00–7:30
- GSTIN (optional)
- LinkedIn, Facebook and Instagram URLs, if any

**Brand and photos**
- New logo ("RCS Logistic — Right Cargo, Right Stop") as SVG
- Hero photo: RCS truck on an Indian highway, 2400px+
- Real photo of Satya Sankar Swain, 1600px+
- Three fleet photos
- Network band background
- About/inner-page hero photo

**Fleet, network and numbers**
- Capacity range and typical routes for each vehicle type
- Cities served, with coordinates for the map
- Key routes and corridors
- Three verified stats (e.g. years in business, vehicles, cities served, loads per month)
- Warehouse location(s)

**Copy to review**
- Draft section headings (services, industries)
- Inner-page intros
- "What it carries" per vehicle
- Service "included" lists and FAQs
- About story and "why choose RCS" sentences
- Which industries apply
- Privacy policy, including the **retention period**
- Dated milestones (optional; the section stays hidden without them)

## After the client supplies content
1. Put photos in `public/images/` and set `src`/`width`/`height` in `src/content/media.ts` / `fleet.ts`.
2. Replace the TODO values in `src/content/*.ts`.
3. Check the hero corner text ("From Odisha to a stronger India") against the real photo's sky.
4. Re-run the grep above until it returns nothing, then merge `redesign` into `main`.
