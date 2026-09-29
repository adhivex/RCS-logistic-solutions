# 02 — Design System

**Source of truth: `docs/reference/homepage-preview.html`** (the approved final design). Open it in a browser and match it: colours, type, spacing, radii, components and behaviour. `original-mockup.png` is only the early inspiration — do not follow it where it differs.

## Colour tokens (`src/app/globals.css`)
```css
@import "tailwindcss";

@theme {
  /* Orange — three shades, each for a job (contrast-checked) */
  --color-orange: #EA5A24;        /* italic headline words on light bg, icons, glows */
  --color-orange-deep: #C74916;   /* button backgrounds, small orange text (4.8:1 with white) */
  --color-orange-dark: #AB3D10;   /* button hover */
  --color-orange-light: #F2763F;  /* orange text/accents on navy (5.3:1) */
  --color-orange-soft: #FDEEE6;   /* icon tiles */

  /* Navy */
  --color-ink: #19283B;           /* headings, numbers strip, dark buttons, hero base */
  --color-ink-2: #172333;         /* deepest panels */
  --color-steel: #243F5C;         /* end of navy gradients */
  --color-footer: #111D2C;        /* footer */

  /* Neutrals */
  --color-slate: #4F5B6B;         /* body text */
  --color-muted: #667180;         /* small labels, captions */
  --color-paper: #F3F5F8;         /* light section bg, scrolled header */
  --color-line: #DFE4EB;          /* borders, dividers */

  --font-display: var(--font-manrope), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
  --font-serif: var(--font-instrument-serif), Georgia, serif;

  --ease-brand: cubic-bezier(.2,.7,.2,1);
}
```
Overlays/translucency used in the preview: hero gradient `rgba(16,28,44,.9→0)`, frosted trust bar `rgba(25,40,59,.55)` + `backdrop-blur`, scrolled header `rgba(243,245,248,.9)` + blur, dividers on navy `rgba(255,255,255,.12)`, orange glow `rgba(234,90,36,.38)`.

Light theme only (`color-scheme: light`).

## Logo
Company name: **RCS Logistic Solutions** — always in full in titles, metadata, alt text and the footer ("RCS" alone only where space is very tight).

Files in `docs/reference/brand/` → copy to `public/brand/`:
- `logo-on-dark.png` — white wordmark: hero (transparent header), navy sections, footer.
- `logo-on-light.png` — dark wordmark: scrolled header, light backgrounds.
- `logo-original.svg/.png` — the client's file (PNG inside SVG).

Header logo height 44px; footer 52px (46px mobile). Cross-fade between the two logos when the header turns solid. Favicon/apple-icon: the orange "R" mark cropped from the logo.

TODO(client): request a true vector logo before launch.

## Typography (`next/font/google`)
| Role | Font | Size (mobile → desktop) | Notes |
|---|---|---|---|
| Hero H1 | Manrope 700 | 46px → 118px, lh .92, tracking -0.05em | 3 lines: Moving / Business / *Forward* |
| Section H2 | Manrope 700 | 32px → 56px, lh 1.02, tracking -0.035em | |
| Card H3 | Manrope 600–700 | 17–24px | |
| Accent words | Instrument Serif italic 400 | ~1.05× surrounding size | The last phrase of each headline, in orange: "Logistics built around *your supply chain.*" |
| Body | Inter 400 | 15.5px → 17px, lh 1.65 | |
| Label / eyebrow | Inter 600 | 11–12px, uppercase, tracking .2em | 36×1px line before it |

## Components (`src/components/`)
- **Button** — pill (`rounded-full`), label + 38px circular arrow icon (`ArrowUpRight`) that rotates -45° on hover. Variants: `primary` (orange-deep bg, white icon circle), `light` (white bg, navy text — used on dark), `dark` (navy bg, orange icon circle). Size `sm`.
- **Label** — thin line + uppercase text.
- **SectionHead** — label + H2 left, "View all" underline link right (link hidden on mobile).
- **Header** — fixed, transparent over hero with white links + light logo; after 60px scroll → frosted paper bg, dark links, dark logo, height 84→70px. Mobile: hamburger → full-width drawer with large links + Get a Quote.
- **Hero** — full viewport height (`100svh`), photo + navy gradients + subtle film grain (SVG noise, 7% overlay). Content bottom-left. **TrustBar** glass strip at the hero's bottom edge: 4 items with thin-line icons (2×2 on mobile).
- **ServiceCard** — white card, 16px radius, orange-soft icon tile, title, one line, arrow circle; hover lifts 4px with orange border. Mobile: compact horizontal row (icon · text · arrow).
- **FleetCard** — 14px radius, image top (aspect 12/5.4), navy body with title, uppercase meta ("Long haul") and white arrow circle. Mobile: horizontal snap-scroll, cards 78% wide.
- **NumbersStrip** — navy band, 4 stats with thin dividers (2×2 on mobile).
- **FounderStrip** — single rounded row: 84px round headshot with orange ring, one-line serif quote, name · role, "Our story" link. Keep it small.
- **CtaSection** — navy→steel gradient, orange glow, large centred H2, Get a Quote + Call the Team.
- **Footer** — `#111D2C`. Desktop 4 columns (brand: logo, serif tagline, one-line about · Company · Services · Get in touch with icon links + Get a Quote). Tablet: brand row on top, 3 columns below. Mobile: brand, Company + Services side by side, contact full width, full-width Get a Quote. Bottom bar: "© {year} RCS Logistic Solutions. All rights reserved. · Privacy · Cookie settings" left; "Designed & Developed by [OrangeKite](https://orangekite.in/)" right (new tab, `rel="noopener"`).
- **MobileQuickBar** — mobile only, fixed bottom: Call (light) + Get a Quote (orange), appears after scrolling past the hero, hidden while the cookie banner is open, respects safe-area inset. Footer gets bottom padding so it isn't covered.
- **QuoteDialog** — native `<dialog>`, 16px radius, underline-style fields, Business/Individual toggle. See `05-data-and-api.md`.
- **CookieBanner / CookiePreferences** — see `09-cookie-consent.md`.

## Layout
- Container `max-w-[1240px]`, side padding 24px (20px mobile).
- Section padding `clamp(64px, 8vw, 112px)` vertical.
- Radii: pills for buttons, 14–18px cards/dialogs.
- Shadows: soft navy (`0 18px 40px rgba(25,40,59,.08)`) only on hover cards, dialogs, cookie banner.

## Motion
Subtle reveal (fade + 24px rise, 1s, staggered 80ms) as sections enter the viewport; header transition; button arrow rotation; card hover lift; fleet image zoom. Everything off under `prefers-reduced-motion`.
