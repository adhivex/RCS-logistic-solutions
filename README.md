# RCS Logistic Solutions — website

Marketing and quote-enquiry site for RCS Logistic Solutions. Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and shadcn/ui.

Start with [`CLAUDE.md`](CLAUDE.md) and the files in [`docs/`](docs/).

## Develop

```bash
npm install
cp .env.example .env.local   # fill in values as they become available
npm run dev
```

## Checks

```bash
npm run lint
npm run build
```

## Where things live
- All company facts and feature flags: `lib/site-config.ts`. Unconfirmed values use `[[TBC: …]]`.
- Copy and data: `content/`
- Design tokens: `app/globals.css` (see `docs/design-system.md`)
