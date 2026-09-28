# RCS Website Architecture

## Structure

```text
app/
├── layout.tsx                 # fonts, metadata base, analytics, navbar/footer
├── page.tsx                   # homepage (composes section components)
├── globals.css                # Tailwind + design tokens
├── icon.png                   # from public/brand/rcs-mark.png
├── opengraph-image.tsx        # 1200×630 OG image
├── sitemap.ts
├── robots.ts                  # disallow all when NEXT_PUBLIC_SITE_URL is unset
├── not-found.tsx
├── error.tsx
├── about/page.tsx
├── services/
│   ├── page.tsx
│   ├── full-truck-load/page.tsx
│   ├── part-truck-load/page.tsx
│   ├── warehousing/page.tsx
│   └── supply-chain/page.tsx
├── industries/page.tsx        # returns notFound() while features.industries = false
├── contact/page.tsx
├── get-a-quote/page.tsx
├── privacy-policy/page.tsx
└── terms/page.tsx

components/
├── ui/                        # shadcn/ui primitives
├── layout/                    # navbar, mobile-menu, footer, whatsapp-button
├── home/                      # hero, capability-strip, services, founder,
│                              # industries, why-rcs, how-it-works, quote-cta
├── services/                  # service page template pieces
├── forms/                     # quote-form, contact-form, turnstile, field components
└── shared/                    # section, container, json-ld, placeholder-notice

content/
├── services.ts                # service names, slugs, descriptions (single source)
├── industries.ts
├── why-rcs.ts
└── process.ts

lib/
├── site-config.ts             # ALL company facts + feature flags (see below)
├── validations.ts             # Zod schemas shared by client and server
├── actions/
│   ├── submit-quote.ts        # server action
│   └── submit-contact.ts
├── db.ts                      # Prisma client singleton
├── email.ts                   # Resend helpers (server-only)
├── turnstile.ts               # server-side token verification
├── rate-limit.ts              # Postgres-backed limiter
├── hash.ts                    # SHA-256 IP hashing with IP_HASH_SALT
├── seo.ts                     # metadata + JSON-LD builders
└── utils.ts

prisma/schema.prisma

public/
├── brand/                     # rcs-logo.png, rcs-mark.png, source/ (reference only)
└── images/

docs/  architecture.md · design-system.md · content.md · decisions.md · open-questions.md
```

## `lib/site-config.ts` shape

```ts
export const siteConfig = {
  name: "RCS Logistic Solutions",
  legalName: "[[TBC: registered legal entity name]]",
  founder: { name: "Satya Swain", designation: "Founder" /* [[TBC]] */ },
  contact: {
    phone: "[[TBC: phone]]",
    email: "[[TBC: email]]",
    address: "[[TBC: head office address]]",
    hours: "[[TBC: working hours]]",
  },
  social: {} as Partial<Record<"linkedin" | "facebook" | "instagram" | "x", string>>,
  features: {
    metrics: false,
    industries: false,
    testimonials: false,
    clientLogos: false,
    founderPortrait: false,
    founderSignature: false,
  },
} as const;
```

Add a helper `isConfirmed(value)` that returns false for strings starting with `[[TBC`, and use it to omit unconfirmed values from JSON-LD and hide empty contact rows in production.

## Quote submission flow

```text
Browser: React Hook Form + zodResolver(quoteSchema) + Turnstile widget
  → server action submitQuote(formData)
      1. honeypot filled?            → return fake success, store nothing
      2. quoteSchema.safeParse       → field errors back to form
      3. verify Turnstile token      → error if invalid
      4. rate limit by hashed IP     → max 5 submissions / IP / hour
      5. prisma.quoteRequest.create
      6. Resend notification         → QUOTE_NOTIFICATION_EMAIL
         (if email fails: submission is still saved; log the error, set emailStatus = FAILED)
      7. return { ok: true }
```

Return typed results (`{ ok: true } | { ok: false, fieldErrors?, formError? }`), never throw raw errors to the client.

## Prisma models (starting point)

```prisma
enum ServiceType { FTL PTL WAREHOUSING SUPPLY_CHAIN OTHER }
enum VehicleType { NOT_SURE SMALL_COMMERCIAL LCV ICV HCV TRAILER CONTAINER }
enum SubmissionStatus { NEW CONTACTED QUOTED CLOSED SPAM }
enum EmailStatus { PENDING SENT FAILED }

model QuoteRequest {
  id               String           @id @default(cuid())
  createdAt        DateTime         @default(now())
  name             String
  company          String
  email            String
  phone            String           // normalised +91XXXXXXXXXX
  pickupLocation   String
  deliveryLocation String
  serviceType      ServiceType
  approxLoad       String?
  vehicleType      VehicleType      @default(NOT_SURE)
  pickupDate       DateTime?
  message          String?
  consentAt        DateTime
  ipHash           String
  sourcePage       String?
  status           SubmissionStatus @default(NEW)
  emailStatus      EmailStatus      @default(PENDING)
  @@index([createdAt])
  @@index([ipHash, createdAt])
}

model ContactMessage {
  id          String      @id @default(cuid())
  createdAt   DateTime    @default(now())
  name        String
  email       String?
  phone       String?
  message     String
  consentAt   DateTime
  ipHash      String
  emailStatus EmailStatus @default(PENDING)
  @@index([ipHash, createdAt])
}
```

The rate limiter counts rows by `ipHash` in the last hour across both tables — no extra service (Redis) needed at this scale.

## Environment
- Runtime uses pooled `DATABASE_URL`; migrations use `DIRECT_URL`.
- `lib/db.ts`, `lib/email.ts`, `lib/turnstile.ts`, `lib/hash.ts` start with `import "server-only"`.
- Fail fast with a clear message at startup if a required server variable is missing (validate env with Zod in `lib/env.ts`).

## Component rules
- Sections are composable; no page component over ~150 lines.
- Copy/data lives in `content/` or `site-config.ts`.
- Typed props everywhere; no `any`.
- No global state library.
- CSS/Tailwind for simple effects before reaching for Motion.
