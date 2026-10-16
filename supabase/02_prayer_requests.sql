-- Café con Fe — Solicitud de oración
-- Pega este archivo ENTERO en Supabase → SQL Editor → Run, UNA sola vez.
-- A diferencia de 00_setup_completo.sql, este NO borra nada — solo agrega
-- la tabla nueva. Seguro de correr sobre una base con datos reales.

create table prayer_requests (
  id uuid primary key default gen_random_uuid(),
  request text not null,
  name text,
  phone text not null,
  wants_call boolean not null default false,
  status text not null default 'pendiente' check (status in ('pendiente', 'atendida')),
  created_at timestamptz not null default now()
);

create index prayer_requests_status_idx on prayer_requests (status);

alter table prayer_requests enable row level security;

create policy "anyone can submit a prayer request"
  on prayer_requests for insert
  with check (true);

create policy "authenticated can read prayer requests"
  on prayer_requests for select
  using (auth.role() = 'authenticated');

create policy "authenticated can update prayer requests"
  on prayer_requests for update
  using (auth.role() = 'authenticated');

create policy "authenticated can delete prayer requests"
  on prayer_requests for delete
  using (auth.role() = 'authenticated');

grant select, insert, update, delete on prayer_requests to anon, authenticated;
