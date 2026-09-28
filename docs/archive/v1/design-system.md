# RCS Design System

## Direction
Premium, calm, operational. The site should feel like a dependable freight partner — ordered, confident, precise — not a flashy tech startup and not a generic local transport site. The wide, heavy "RCS" wordmark and the road-lines inside the "R" mark are the visual signature to echo.

## Colour tokens
All contrast ratios below were measured (WCAG 2.1).

| Token | Hex | Use |
|---|---|---|
| `brand-orange` | `#FF6B00` | Icons, accent lines, borders, highlights, focus rings, large decorative shapes. **Never behind white text; never as text colour on light backgrounds.** |
| `action-orange` | `#B84D00` | Primary button background (white text), orange text links on light backgrounds |
| `action-orange-hover` | `#9A4000` | Primary button hover/active |
| `navy` | `#0F2026` | Headings, body text on light, dark sections, footer. Matched to the navy in the logo wordmark. |
| `white` | `#FFFFFF` | Main surfaces |
| `surface` | `#F5F7F9` | Alternate section backgrounds |
| `muted` | `#667085` | Secondary body text on white/surface only |
| `muted-on-dark` | `#98A2B3` | Secondary text on navy |
| `border` | `#E5E7EB` | Dividers, card borders |

### Verified pairings
| Foreground | Background | Ratio | Allowed for |
|---|---|---|---|
| white | action-orange `#B84D00` | 5.12 | Button text ✅ |
| white | action-orange-hover `#9A4000` | 6.76 | Button text ✅ |
| action-orange | white / surface | 5.12 / 4.77 | Links, small orange text ✅ |
| navy | brand-orange `#FF6B00` | 5.86 | Alternative bright button (navy text) ✅ |
| brand-orange | navy | 5.86 | Orange text/icons in dark sections ✅ |
| white | navy | 16.7 | ✅ |
| muted | white / surface | 4.97 / 4.63 | Body text ✅ (do not lighten muted further) |
| muted-on-dark | navy | 6.5 | ✅ |
| white | brand-orange | 2.86 | ❌ Never |
| brand-orange | white / surface | 2.86 / 2.66 | ❌ Never as text |

Orange is an accent. Roughly: 70% white/surface, 20–25% navy, 5–10% orange.

## Typography
One family: **Archivo** (Google Fonts, via `next/font/google`, variable `wght` and `wdth` axes).
- Display & section headings: Archivo at an expanded width (`font-stretch` ~112–125%), weight 700–800, tight tracking. This echoes the wide RCS wordmark.
- Body, UI, forms: Archivo at normal width (100%), weight 400/500, line-height 1.6.
- Buttons: weight 600, sentence case.
- Scale (mobile → desktop): hero 40→72px, h2 30→44px, h3 20→24px, body 16→18px, small 14px.
- Keep body line length under ~75 characters.

## Layout
- Container max-width ~1200px, generous vertical rhythm (section padding 72px mobile / 120px desktop).
- Left-aligned text by default; centre only short CTA blocks.
- Hero: strong headline left, large real logistics photograph right/behind, one primary and one secondary action. No stat counters in the hero.
- Services: not four identical cards. Use a featured layout (e.g. FTL and PTL larger with photography, Warehousing and Supply chain smaller) so hierarchy is visible.
- How it works: the one place numbered steps are appropriate (it is a real sequence). Consider a horizontal "route line" connecting the steps, echoing the road lines in the R mark — this is the site's signature element; keep everything else quiet.

## Components
- Cards: 12px radius for large media cards, 8px for small items (radius follows hierarchy, not one value everywhere). 1px `border`; shadow only on hover/elevation.
- Buttons: primary = `action-orange` bg + white text; secondary = transparent + navy 1.5px border + navy text. Two variants only (plus a text link style).
- Focus: 2px `brand-orange` ring with 2px offset on every interactive element.
- Inputs: 48px min height, visible label above (no placeholder-only labels), error text below in plain language.

## Avoid (generic-template tells)
- An uppercase letter-spaced "eyebrow" label above every heading. Use one only where it adds information.
- Accenting one word of a headline in orange or italics.
- "→" appended to every button and link.
- Identical cards with the same shadow for every section.
- Gradient washes as decoration; heavy orange overlays on photos.
- Fade-and-slide-up on every section.
- Stock photos of people presented as staff, founder or customers.
- Cartoon/isometric logistics illustrations.

## Photography
Preferred: modern commercial trucks, loading docks, warehouse interiors, Indian highways and industrial settings; Odisha context where genuine (e.g. Paradip/Bhubaneswar corridor) — only if real or accurately captioned.
Real RCS fleet and warehouse photos replace stock as soon as supplied. Until then, stock must be high-quality, licensed for commercial use, and must not show another company's branding on vehicles.

## Motion
- One orchestrated moment: the hero entrance (headline, image, CTAs in a short sequence, ≤ 800ms total).
- Everything else is response to user action: navbar background on scroll, button/card hover (150–250ms), menu open/close, form state changes.
- Optional: the "How it works" route line draws once when it enters view.
- Counters only if `features.metrics` is on with verified numbers.
- `prefers-reduced-motion: reduce` → no transforms or scroll-linked animation; content appears immediately.
