# RCS Logistic Solutions — www.rcsls.in

Redesign in progress on the `redesign` branch (production on `main` serves v1 until launch).
Next.js 16 (App Router, `src/`), Tailwind CSS 4, Prisma 7 + Neon, Resend, Zod + React Hook Form.

Start with [`CLAUDE.md`](CLAUDE.md), then `docs/01`–`09`. Build order: `docs/07-build-plan.md`.

## Develop

```bash
npm install                  # also runs prisma generate
cp .env.example .env.local
npm run dev                  # /styleguide shows the design tokens
```

## Checks

```bash
npm run lint
npm run build
npm run format:check
```

## Database

```bash
npm run db:deploy   # apply migrations (uses DIRECT_URL)
npm run db:migrate  # create a migration after editing prisma/schema.prisma
npm run db:studio   # inspect quote requests
```

## Where things live
- Copy and company facts: `src/content/*.ts` (`TODO(client)` marks anything unconfirmed)
- Photos: `src/content/media.ts` and `src/content/fleet.ts` (`src: null` = placeholder)
- Design tokens: `src/app/globals.css`, preview at `/styleguide`
