# RCS Logistic Solutions — website

Marketing and quote-enquiry site for RCS Logistic Solutions. Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Prisma 7 + Neon, Resend, Cloudflare Turnstile.

Start with [`CLAUDE.md`](CLAUDE.md) and the files in [`docs/`](docs/).

## Develop

```bash
npm install                  # also runs prisma generate
cp .env.example .env.local   # fill in values as they become available
npm run dev
```

The marketing pages run without any environment variables. The quote and contact forms need them all (see `.env.example`); until then they return a clear error and the server logs which variables are missing.

## Database

```bash
npm run db:deploy   # apply migrations (uses DIRECT_URL)
npm run db:migrate  # create a new migration after editing prisma/schema.prisma
npm run db:studio   # browse submissions
```

## Checks

```bash
npm run lint
npm run build
```

Pre-launch: `grep -rn "\[\[TBC" app components content lib` must return nothing, and every `features.*` flag in `lib/site-config.ts` must be reviewed.

## Where things live
- All company facts and feature flags: `lib/site-config.ts`. Unconfirmed values use `[[TBC: …]]`.
- Copy and data: `content/` (photos: `content/media.ts`)
- Design tokens: `app/globals.css` (see `docs/design-system.md`)
- Form validation (client + server): `lib/validations.ts`; server actions: `lib/actions/`
