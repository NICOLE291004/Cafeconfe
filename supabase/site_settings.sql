-- Café con Fe — configuración general (singleton row)
-- Corre esto en el SQL Editor de Supabase, igual que los scripts anteriores.

create table if not exists site_settings (
  id smallint primary key default 1 check (id = 1),
  whatsapp_url text not null default '',
  instagram_url text not null default '',
  email text not null default '',
  phone text not null default '',
  updated_at timestamptz not null default now()
);

insert into site_settings (id) values (1) on conflict (id) do nothing;

alter table site_settings enable row level security;

drop policy if exists "public can read site settings" on site_settings;
create policy "public can read site settings"
  on site_settings for select
  using (true);

drop policy if exists "authenticated can update site settings" on site_settings;
create policy "authenticated can update site settings"
  on site_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, update on site_settings to anon, authenticated;
