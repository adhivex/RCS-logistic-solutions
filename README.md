# RCS Logistic Solutions — www.rcsls.in

Redesign in progress on the `redesign` branch (production on `main` serves v1 until launch).
Next.js 16 (App Router, `src/`), Tailwind CSS 4, Supabase (Postgres), Resend, Zod + React Hook Form.

Start with [`CLAUDE.md`](CLAUDE.md), then `docs/01`–`09`. Handover and open items: [`docs/11-handover.md`](docs/11-handover.md).

## Develop

```bash
npm install
cp .env.example .env.local   # everything may stay empty: "local mode"
npm run dev                  # http://localhost:3000 — /styleguide shows the design tokens
```

With an empty `.env.local` the site runs fully; quote requests are validated and logged to the terminal instead of being stored or emailed.

## Local database (optional, needs Docker)

```bash
npx supabase start -x storage-api,imgproxy,logflare,vector,edge-runtime,realtime,mailpit,supavisor
```

It runs on ports 553xx (API 55321, Studio http://127.0.0.1:55323). Copy the printed API URL, anon key and service_role key into `.env.local`.

```bash
npm run db:reset   # rebuild the local DB from supabase/migrations
npm run db:types   # regenerate src/lib/supabase/database.types.ts
npm run db:push    # apply migrations to the hosted project (after `npx supabase link`)
```

## Checks

```bash
npm run lint
npm run build
npm run format:check
npm test               # Vitest: quote schema, phone normalisation, consent cookie, email templates
```

## Where things live
- Copy and company facts: `src/content/*.ts` (`TODO(client)` marks anything unconfirmed)
- Photos: `src/content/media.ts` and `src/content/fleet.ts` (kit placeholders are flagged `placeholder: true`)
- Design tokens: `src/app/globals.css`, preview at `/styleguide`
- Quote flow: `src/lib/validation/quote.ts` (shared schema), `src/app/actions/quote.ts` (server action), `src/emails/`
- Cookie consent: `src/lib/consent.ts`, `src/components/consent/`
- Decisions: `docs/12-decisions.md`
