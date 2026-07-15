-- Café con Fe — esquema inicial (Etapa 6)
-- Pega esto completo en Supabase → SQL Editor → Run.
-- Seguro de correr más de una vez (usa IF NOT EXISTS / OR REPLACE donde aplica).

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────────────────────
-- events
-- ─────────────────────────────────────────────────────────────
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  event_date timestamptz not null,
  location text not null default '',
  price_cents integer not null default 0,
  capacity integer not null default 20,
  image_url text,
  status text not null default 'draft' check (status in ('draft', 'published', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists events_status_idx on events (status);

alter table events enable row level security;

drop policy if exists "public can read published events" on events;
create policy "public can read published events"
  on events for select
  using (status = 'published');

drop policy if exists "authenticated can manage events" on events;
create policy "authenticated can manage events"
  on events for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- registrations
-- ─────────────────────────────────────────────────────────────
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events (id) on delete cascade,
  name text not null,
  email text not null,
  phone text,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (event_id, email)
);

create index if not exists registrations_event_id_idx on registrations (event_id);

alter table registrations enable row level security;

drop policy if exists "anyone can register" on registrations;
create policy "anyone can register"
  on registrations for insert
  with check (true);

drop policy if exists "authenticated can read registrations" on registrations;
create policy "authenticated can read registrations"
  on registrations for select
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated can manage registrations" on registrations;
create policy "authenticated can manage registrations"
  on registrations for update
  using (auth.role() = 'authenticated');

drop policy if exists "authenticated can delete registrations" on registrations;
create policy "authenticated can delete registrations"
  on registrations for delete
  using (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────
-- products
-- ─────────────────────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null default '',
  price_cents integer not null default 0,
  image_url text,
  stock integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create index if not exists products_status_idx on products (status);

alter table products enable row level security;

drop policy if exists "public can read published products" on products;
create policy "public can read published products"
  on products for select
  using (status = 'published');

drop policy if exists "authenticated can manage products" on products;
create policy "authenticated can manage products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
