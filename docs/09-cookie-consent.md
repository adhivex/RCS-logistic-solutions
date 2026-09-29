# 09 — Cookie Consent

Reference implementation: the banner, preferences dialog and script at the bottom of `docs/reference/homepage-preview.html`. Port it to React; keep the behaviour identical.

## Categories
| Category | Default | What it covers |
|---|---|---|
| Essential | Always on (locked) | Consent choice itself, quote form, security/rate-limit. No tracking. |
| Analytics | Off | Visit statistics (e.g. Vercel Analytics, Google Analytics 4) |
| Marketing | Off | Ad pixels (Google Ads, Meta Pixel, LinkedIn Insight) |

Nothing optional loads before the visitor opts in. No pre-ticked boxes.

## Behaviour
- Show the banner on first visit (short delay after load) until the visitor chooses.
- **Reject optional** and **Accept all** are equal in size and weight. Closing without choosing = no optional cookies.
- **Customise preferences** opens a dialog with toggles; **Save preferences** stores exactly what's toggled.
- Footer has a **Cookie settings** button that reopens the dialog at any time; withdrawing consent must be as easy as giving it.
- While the banner is visible, the mobile Call / Get a Quote bar is hidden so they don't overlap.

## Storage
- Key `rcs-consent` in a first-party cookie (`SameSite=Lax; Secure; Max-Age=15552000` — 6 months) so the server can read it too; mirror to `localStorage` is optional.
- Value: `{ v: 1, analytics: boolean, marketing: boolean, ts: ISOString }`.
- Bump `v` when categories or vendors change — an old version means ask again.
- Optionally log each decision (anonymous id, choice, version, timestamp) to a `consent_log` table in Supabase for audit.

## Implementation (Next.js)
- `src/lib/consent.ts` — read/write helpers + a tiny subscribe/notify store.
- `src/components/consent/ConsentProvider.tsx` (client) — exposes `useConsent()`.
- `src/components/consent/CookieBanner.tsx`, `CookiePreferences.tsx` (client, native `<dialog>`).
- `src/components/consent/ConsentScripts.tsx` — renders `next/script` tags only when the matching category is granted, e.g.
  `{consent.analytics && <Analytics />}`; Google tags use Consent Mode v2 defaults set to `denied`, updated on choice.
- Mount provider, banner and scripts in the root layout.

## Legal copy
- Banner links to `/privacy#cookies`. Add a **Cookies** section to the privacy page listing each cookie/vendor, purpose, and duration.
- India's DPDP Act 2023 requires consent that is free, specific, informed and withdrawable; the pattern above follows that and matches GDPR-style expectations. TODO(client): have the final privacy/cookie text reviewed by their legal advisor.
