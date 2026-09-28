# 02 — Design System

Source of truth: `reference/homepage-mockup.png`. Match it closely.

## Colour tokens (`src/app/globals.css`)
```css
@import "tailwindcss";

@theme {
  --color-brand-orange: #F2611D;       /* CTAs, accents, headline highlight */
  --color-brand-orange-dark: #D94F10;  /* hover */
  --color-brand-ink: #16181D;          /* headings, dark bands, footer */
  --color-brand-slate: #4A4F58;        /* body text */
  --color-brand-mist: #F5F5F4;         /* light section background */
  --color-brand-line: #E4E4E2;         /* dividers, borders */

  --font-display: var(--font-poppins), system-ui, sans-serif;
  --font-body: var(--font-inter), system-ui, sans-serif;
  --font-script: var(--font-caveat), cursive;
}
```
Site is light-themed only (brand site, not an app). Set `color-scheme: light`.

## Typography
| Role | Font | Size (mobile → desktop) | Weight |
|---|---|---|---|
| Hero H1 | Poppins | 52px → 96px, line-height .95, tracking -0.02em | 800 |
| Section H2 | Poppins | 28px → 44px, line-height 1.1 | 700 |
| Card / item H3 | Poppins | 18–20px | 600 |
| Body | Inter | 16px → 17px, line-height 1.6 | 400 |
| Eyebrow | Inter | 12px, uppercase, tracking .18em | 600 |
| Script accents | Caveat | 30–34px | 600 — signature and "Bigger Routes, Brighter Tomorrows" only |

Headline pattern: last phrase of each H2 in orange (e.g. "The Right Vehicle for **Every Business Need**").

## Components (build in `src/components/`)
- **Eyebrow** — 28×3px orange bar + uppercase label. On the hero the bar sits after the text.
- **Button** — variants `primary` (solid orange), `outline` (orange border), `ghost` (white border, on dark). `rounded-md px-6 py-3`, optional trailing `ArrowRight`. Renders `<a>` when given `href`.
- **SectionHeading** — eyebrow + H2 left, optional description + link right (stacks on mobile).
- **TrustStrip** — white card overlapping hero by ~56px, 4 icon items with dividers + script tagline. 2×2 on mobile, tagline hidden.
- **FleetCard** — image, dark bottom gradient, title + one-liner, circular arrow button. Whole card is a link. Only hover effect: image scale 1.04 over 400ms.
- **ServiceItem** — icon, title, one-liner, "Learn more" link. Row with vertical dividers on desktop.
- **StatBand** — dark band, stats separated by 2px orange left borders.
- **CtaBand** — bordered box with 5px orange left border, heading, line, primary button.
- **QuoteDialog** — native `<dialog>`; fields in `05-data-and-api.md`.
- **Header** — sticky, white, shadow after 40px scroll, active link has 2px orange underline. Mobile: hamburger → drawer, Get a Quote stays visible.
- **Footer** — ink background, logo on a white tile, 4 columns, bottom bar.
- **FloatingContact** (mobile only) — bottom-right WhatsApp + Call buttons, respects safe-area inset.

## Layout
- Container: `max-w-[1200px] mx-auto px-5`
- Section spacing: `py-16 md:py-24`
- Radius: 6px buttons, 10px cards/images
- Shadow: only on header (scrolled), trust strip, dialog

## Motion
Keep it minimal: header shadow, fleet image hover, dialog open. No scroll-triggered fade-ins. Disable transitions under `prefers-reduced-motion`.
