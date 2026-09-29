-- Quote requests (docs/05-data-and-api.md → Database).
-- Written only by the quote server action with the service role key.

create type public.service_type as enum (
  'full_truck_load', 'part_truck_load', 'warehousing', 'supply_chain', 'not_sure'
);

create type public.lead_status as enum ('new', 'contacted', 'quoted', 'won', 'lost');

create table public.quote_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  customer_type text not null default 'business' check (customer_type in ('business','individual')),
  name          text not null check (char_length(name) between 2 and 80),
  company       text check (char_length(company) <= 120),
  phone         text not null check (phone ~ '^\+91[6-9][0-9]{9}$'),
  email         text,
  service       public.service_type not null,
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
  status        public.lead_status not null default 'new',
  email_sent    boolean not null default false
);

create index quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index quote_requests_status_idx on public.quote_requests (status);
create index quote_requests_ip_recent_idx on public.quote_requests (ip_hash, created_at desc);

-- Lock the table down: no policies = anon/authenticated roles get nothing.
-- Inserts happen only from the server with the service role key.
alter table public.quote_requests enable row level security;

-- Belt and braces: the public roles have no table privileges either.
revoke all on table public.quote_requests from anon, authenticated;
