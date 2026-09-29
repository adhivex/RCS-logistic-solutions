# 05 — Data, API & Email

## Database — Supabase

Project region: **Mumbai (ap-south-1)** — closest to Odisha users and Vercel `bom1`.

### Migration (`supabase/migrations/<timestamp>_quote_requests.sql`)
```sql
create type service_type as enum (
  'full_truck_load', 'part_truck_load', 'warehousing', 'supply_chain', 'not_sure'
);

create type lead_status as enum ('new', 'contacted', 'quoted', 'won', 'lost');

create table public.quote_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  customer_type text not null default 'business' check (customer_type in ('business','individual')),
  name          text not null check (char_length(name) between 2 and 80),
  company       text check (char_length(company) <= 120),
  phone         text not null check (phone ~ '^\+91[6-9][0-9]{9}$'),
  email         text,
  service       service_type not null,
  from_city     text not null,
  to_city       text not null,
  cargo_type    text,
  weight_tons   numeric(8,2) check (weight_tons > 0 and weight_tons <= 100),
  pickup_date   date,
  details       text check (char_length(details) <= 1000),
  source_page   text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  ip_hash       text,              -- sha256 of IP + salt, for rate limiting only
  status        lead_status not null default 'new',
  email_sent    boolean not null default false
);

create index quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index quote_requests_status_idx on public.quote_requests (status);
create index quote_requests_ip_recent_idx on public.quote_requests (ip_hash, created_at desc);

-- Lock the table down: no policies = anon/authenticated roles get nothing.
-- Inserts happen only from the server with the service role key.
alter table public.quote_requests enable row level security;
```

### Clients (`src/lib/supabase/`)
- `admin.ts` — `createClient(url, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })`, starts with `import "server-only"`. Used by the quote server action only.
- `server.ts` / `client.ts` — `@supabase/ssr` clients with the anon key. Not needed at launch; create them only if a feature needs them (e.g. a future admin dashboard with Supabase Auth).
- `database.types.ts` — generated; pass the `Database` type to every client.

### Viewing leads
At launch RCS staff view leads in the Supabase dashboard (Table Editor) — invite Satya as a read-only project member, or later build a small `/admin` page behind Supabase Auth with an RLS policy for authenticated staff.

## Quote form fields
| Field | Required | Validation |
|---|---|---|
| name | yes | 2–80 chars |
| customerType | yes | `business` or `individual` (toggle at top of form; hide Company when individual) |
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
2. Rate-limit by IP: hash the IP (`sha256(ip + RATE_LIMIT_SALT)`), count rows in `quote_requests` with that `ip_hash` in the last 10 minutes, reject above 5.
3. Insert into `quote_requests` with the admin client; return the new `id`.
4. Send two emails with Resend (don't fail the submission if email fails — log it, keep `email_sent = false`; set it to `true` after a successful send):
   - **To RCS** (`QUOTE_NOTIFY_TO`): subject `New quote: {fromCity} → {toCity} ({service})`, all fields in a simple table, reply-to = customer email if given, plus a `tel:` link.
   - **To customer** (only if email given): short confirmation, what happens next, RCS phone.
5. Redirect to `/thank-you`.

Email templates: React Email components in `src/emails/`.

## Environment (`.env.example`)
See the file in the repo root.

## Analytics
Vercel Analytics + fire a `quote_submitted` event on success. Capture UTM params from the URL into a cookie on first visit and attach them to the submission.
