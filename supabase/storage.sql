-- Café con Fe — bucket de imágenes públicas (Storage)
-- Corre esto en el SQL Editor de Supabase, igual que los scripts anteriores.

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "public can view site-images" on storage.objects;
create policy "public can view site-images"
  on storage.objects for select
  using (bucket_id = 'site-images');

drop policy if exists "authenticated can upload site-images" on storage.objects;
create policy "authenticated can upload site-images"
  on storage.objects for insert
  with check (bucket_id = 'site-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated can update site-images" on storage.objects;
create policy "authenticated can update site-images"
  on storage.objects for update
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated can delete site-images" on storage.objects;
create policy "authenticated can delete site-images"
  on storage.objects for delete
  using (bucket_id = 'site-images' and auth.role() = 'authenticated');

-- Fotos generales del sitio (hero, historia, mosaico, comunidad) —
-- slots con clave fija, editables desde /admin/fotos.
create table if not exists site_images (
  key text primary key,
  url text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_images enable row level security;

drop policy if exists "public can read site images" on site_images;
create policy "public can read site images"
  on site_images for select
  using (true);

drop policy if exists "authenticated can manage site images" on site_images;
create policy "authenticated can manage site images"
  on site_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, insert, update on site_images to anon, authenticated;

insert into site_images (key) values
  ('hero'), ('historia'),
  ('mosaico_1'), ('mosaico_2'), ('mosaico_3'), ('mosaico_4'),
  ('comunidad_1'), ('comunidad_2'), ('comunidad_3')
on conflict (key) do nothing;
