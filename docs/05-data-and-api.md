# 05 — Data, API & Email

## Prisma schema (`prisma/schema.prisma`)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum ServiceType {
  FULL_TRUCK_LOAD
  PART_TRUCK_LOAD
  WAREHOUSING
  SUPPLY_CHAIN
  NOT_SURE
}

enum LeadStatus {
  NEW
  CONTACTED
  QUOTED
  WON
  LOST
}

model QuoteRequest {
  id          String      @id @default(cuid())
  createdAt   DateTime    @default(now())
  name        String
  company     String?
  phone       String
  email       String?
  service     ServiceType
  fromCity    String
  toCity      String
  cargoType   String?
  weightTons  Decimal?    @db.Decimal(8, 2)
  pickupDate  DateTime?
  details     String?
  sourcePage  String?     // page the form was submitted from
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  status      LeadStatus  @default(NEW)
  emailSent   Boolean     @default(false)

  @@index([createdAt])
  @@index([status])
}
```

## Quote form fields
| Field | Required | Validation |
|---|---|---|
| name | yes | 2–80 chars |
| company | no | ≤ 120 |
| phone | yes | Indian mobile: 10 digits, optional +91/0 prefix; normalise to +91XXXXXXXXXX |
| email | no | valid email |
| service | yes | enum; pre-filled when opened from a service page |
| fromCity / toCity | yes | 2–60 chars |
| cargoType | no | ≤ 80 |
| weightTons | no | 0.1–100 |
| pickupDate | no | today or later |
| details | no | ≤ 1000 |
| website (honeypot) | — | must be empty; hidden from users and screen readers |

One shared Zod schema in `src/lib/validation/quote.ts`, used by the client form and the server.

## Submission
Use a **Server Action** `submitQuote` in `src/app/actions/quote.ts`:
1. Validate with Zod (reject if honeypot filled — return success silently).
2. Rate-limit by IP: max 5 submissions / 10 min. Simple Postgres-backed or in-memory limiter is fine for launch; note it in code.
3. Save `QuoteRequest`.
4. Send two emails with Resend (don't fail the submission if email fails — log it, keep `emailSent=false`):
   - **To RCS** (`QUOTE_NOTIFY_TO`): subject `New quote: {fromCity} → {toCity} ({service})`, all fields in a simple table, reply-to = customer email if given, plus a `tel:` link.
   - **To customer** (only if email given): short confirmation, what happens next, RCS phone.
5. Redirect to `/thank-you`.

Email templates: React Email components in `src/emails/`.

## Environment (`.env.example`)
See the file in the repo root.

## Analytics
Vercel Analytics + fire a `quote_submitted` event on success. Capture UTM params from the URL into a cookie on first visit and attach them to the submission.
