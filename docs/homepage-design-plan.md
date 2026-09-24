# Homepage Design Plan (Phase 2 — for approval)

Written against `docs/design-system.md`. Nothing here is built yet. The layout shell (navbar, footer, tokens) already exists.

## Guiding idea
One strong idea, everything else quiet: the **three road lines inside the "R" mark**. They show up once, as the route line in "How it works". The rest of the page is ordered and plain: white and surface backgrounds, navy type, orange used sparingly.

Colour budget across the page: white/surface ≈ 70% · navy ≈ 22% (capability strip, How it works, footer) · orange ≈ 5–8% (buttons, icons, the route line).

## Section by section

### 1. Navbar (built)
White, sticky. A hairline border and a soft shadow appear once the page scrolls. It holds the logo, a Services disclosure, About, Contact and the **Get a quote** button.

### 2. Hero — white
- Desktop uses a 12-column split. The **left 6 columns** hold the H1 "Reliable logistics for a stronger tomorrow" (expanded Archivo, 800, 72px), the supporting line, and **Get a quote** (primary) plus **Talk to our team** (secondary).
- The **right 6 columns** hold one large photograph: a commercial truck on an Indian highway, 12px radius, 4:5 portrait crop. On desktop it bleeds to the right edge of the viewport.
- On mobile the text comes first and the photo below it at 4:3, full-bleed.
- There are no stats, badges or trust counters.
- This is the page's one orchestrated motion moment. The headline lines, then the image, then the CTAs appear in sequence: opacity plus a 12px rise, 600–800ms in total. With reduced motion it renders static.

### 3. Capability strip — navy band, directly under the hero
- Four items in one row on desktop, 2×2 on mobile. Each has a Lucide icon in `brand-orange` and a short label in white: *Based in Odisha · Built for B2B · Full & part truck loads · Warehousing & supply chain*.
- The items are separated by thin vertical `white/10` rules. There are no cards.
- The component is written so `features.metrics` swaps it for a metrics strip later with the same layout. That swap only happens once numbers are verified.

### 4. Services — white
- A left-aligned H2 sits over a short intro sentence. There is no eyebrow.
- **The layout is deliberately unequal:**
  - Row 1 has a large **FTL** card (7 columns) and a large **PTL** card (5 columns). Each has a photo on top (12px radius), the service name with its short label, the one-line summary, and a text link "Full Truck Load details".
  - Row 2 has **Warehousing & Storage** and **Supply Chain Solutions** as compact rows (6 columns each). Each row is a surface background with an 8px radius, an icon, name, summary and text link, and no photo.
- Cards have a 1px border and no resting shadow. On hover the border turns navy and a soft shadow appears (200ms).
- The service links point to `/services/*` pages, which get built in a later phase.

### 5. Founder — surface
- Split layout, 5 and 7 columns.
- **Left:** until `features.founderPortrait` is on, a navy panel (4:5, 12px radius) with the R mark centred at about 40% width. Below the mark sits the caption "Satya Swain · Founder" in white. There is no stock person.
- **Right:** the H2 "Moving Businesses Forward, Together.", then the ~60-word message set as a `<blockquote>` at 20px with navy text and a 2px `brand-orange` left rule. The `<figcaption>` holds Satya Swain and the designation from `siteConfig`.
- There is no signature element.

### 6. Industries — not rendered
The component exists but stays gated by `features.industries = false`. The `/industries` route returns `notFound()`.

### 7. Why RCS — white
- Two columns. On the left, a sticky H2 on desktop with one supporting sentence.
- On the right, a 2×2 list of the four confirmed points. Each point has a small orange icon, a bold title and one sentence, separated by 1px `border` rules.
- This section is intentionally **not cards**, which keeps it visually distinct from Services.

### 8. How it works — navy (signature element)
- Four numbered steps: Share your requirement → Get a quote → Pickup & transit → Delivery.
- **Desktop:** a horizontal route line across the top of the four steps, with a node per step. It uses three thin parallel strokes, echoing the road lines in the mark: one in `brand-orange` and two in `white/20`. Step numbers "01–04" are set large in expanded Archivo, with each title and sentence below.
- **Mobile:** the same line runs vertically down the left, with the steps stacked.
- The line **draws once** when it enters view (Motion `pathLength`, ~900ms). With reduced motion it is fully drawn from the start.
- There are no response-time promises.

### 9. Quote CTA — white, the one centred block
- A short heading ("Tell us what you need to move" is a draft for client approval), one sentence, and **Get a quote** plus **Talk to our team**.
- The block is a surface panel with a 12px radius and a single orange 2px top rule. There is no gradient and no photo overlay.

### 10. Footer (built)
Navy, with the mark and the brand name in white text. It has Company, Services and Contact (placeholders) columns, and a legal row.

## Photography needed (4 images)
1. Hero: a truck on an Indian highway (portrait crop)
2. FTL: a full-load truck or loading dock
3. PTL: mixed cargo or palletised goods
4. Optional: a warehouse interior for the Warehousing service page later

The images must be licensed for commercial use, show **no other company's branding** on vehicles, and show no people presented as RCS staff. They get replaced by real RCS photos when supplied.

## Check against "Avoid (generic-template tells)"
| Tell | This plan |
|---|---|
| Eyebrow above every heading | None. Headings stand alone. |
| One accented word in the headline | None. Headlines are a single colour. |
| "→" on every button/link | None. Links use descriptive text instead. |
| Identical cards everywhere | Services use an unequal mix of media cards and rows. Why RCS is a ruled list, not cards. The capability strip has no cards. |
| Gradient washes / orange photo overlays | None. Colour comes from flat surfaces. |
| Fade-and-slide on every section | Only the hero entrance and the route line animate. Everything else is static. |
| Stock people as staff/founder | None. The founder panel uses the R mark. |
| Cartoon/isometric illustrations | None. Photography only, plus the one line motif. |
