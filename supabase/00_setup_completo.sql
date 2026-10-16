-- Café con Fe — SETUP COMPLETO (versión final)
-- Pega este archivo ENTERO en Supabase → SQL Editor → Run, UNA sola vez.
-- Seguro de correr las veces que quieras — borra y reconstruye todo desde cero.
--
-- ⚠️ YA NO RE-CORRAS ESTE ARCHIVO SOBRE PRODUCCIÓN: en cuanto el proyecto
-- tiene datos reales (eventos, fotos, registros), volver a pegarlo los
-- borra todos. Se deja completo solo como referencia de todo el esquema y
-- para montar un proyecto nuevo desde cero. Cambios incrementales sobre
-- producción van en archivos aparte y aditivos, como
-- `02_prayer_requests.sql`.
--
-- Qué hace:
--   1) Elimina TODAS las tablas del proyecto (la versión vieja incompatible
--      Y cualquier versión anterior de este mismo esquema) para partir de
--      cero, sin arrastrar datos de ejemplo viejos o corregidos a medias.
--   2) Crea el esquema completo: events, registrations (correo opcional,
--      teléfono obligatorio, check de WhatsApp), products, testimonials
--      (con inserción pública en borrador), faqs, site_settings (con
--      fundadora/historia), site_images (7 slots: logo, comunidad_1-6,
--      fundadora) + bucket de Storage, y prayer_requests (peticiones de
--      oración, públicas para insertar, privadas para leer).
--   3) Siembra contenido real/de ejemplo ya corregido:
--        - 3 encuentros de ejemplo, GRATIS (no $150)
--        - 4 productos de ejemplo
--        - FAQ con las preguntas correctas (costo real, duración ~1h30)
--        - Nombre real de la fundadora (Aimee Equihua) — su bio e
--          historia se llenan desde /admin/configuracion, no se inventan
--        - CERO testimonios de ejemplo — los que había eran ficticios;
--          se cargan reales desde /admin/testimonios, o las escriben las
--          mismas visitantes desde /nosotras

-- ─────────────────────────────────────────────────────────────
-- 0) Fuera todo — partimos de cero
-- ─────────────────────────────────────────────────────────────
drop table if exists event_registrations cascade;
drop table if exists orders cascade;
drop table if exists registrations cascade;
drop table if exists events cascade;
drop table if exists products cascade;
drop table if exists testimonials cascade;
drop table if exists faqs cascade;
drop table if exists site_settings cascade;
drop table if exists site_images cascade;
drop table if exists prayer_requests cascade;

-- ─────────────────────────────────────────────────────────────
-- 1) events, registrations, products
-- ─────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

grant usage on schema public to anon, authenticated;
alter default privileges in schema public
  grant select, insert, update, delete on tables to anon, authenticated;

create table events (
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

create index events_status_idx on events (status);

alter table events enable row level security;

create policy "public can read published events"
  on events for select
  using (status = 'published');

create policy "authenticated can manage events"
  on events for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create table registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references events (id) on delete cascade,
  name text not null,
  email text,
  phone text not null,
  wants_whatsapp boolean not null default false,
  attended boolean not null default false,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  unique (event_id, email)
);

create index registrations_event_id_idx on registrations (event_id);

alter table registrations enable row level security;

create policy "anyone can register"
  on registrations for insert
  with check (true);

create policy "authenticated can read registrations"
  on registrations for select
  using (auth.role() = 'authenticated');

create policy "authenticated can manage registrations"
  on registrations for update
  using (auth.role() = 'authenticated');

create policy "authenticated can delete registrations"
  on registrations for delete
  using (auth.role() = 'authenticated');

create table products (
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

create index products_status_idx on products (status);

alter table products enable row level security;

create policy "public can read published products"
  on products for select
  using (status = 'published');

create policy "authenticated can manage products"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, insert, update, delete on events, registrations, products to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- 2) testimonials, faqs
-- ─────────────────────────────────────────────────────────────
create table testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create index testimonials_status_idx on testimonials (status);

alter table testimonials enable row level security;

create policy "public can read published testimonials"
  on testimonials for select
  using (status = 'published');

create policy "authenticated can manage testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Cualquiera puede escribir su propio testimonio, pero solo como borrador
-- — el equipo lo aprueba desde /admin/testimonios antes de que se publique.
create policy "anyone can submit a draft testimonial"
  on testimonials for insert
  with check (status = 'draft');

grant select, insert, update, delete on testimonials to anon, authenticated;

-- A propósito: CERO testimonios de ejemplo. Los anteriores eran
-- ficticios. Cárgalos reales desde /admin/testimonios cuando existan,
-- con consentimiento de cada mujer.

create table faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create index faqs_status_idx on faqs (status);

alter table faqs enable row level security;

create policy "public can read published faqs"
  on faqs for select
  using (status = 'published');

create policy "authenticated can manage faqs"
  on faqs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, insert, update, delete on faqs to anon, authenticated;

insert into faqs (question, answer, sort_order, status) values
  ('¿Tengo que ser religiosa para asistir?', 'No. Café con Fe es para cualquier mujer que busque una pausa cálida y una conexión honesta, sin importar en qué punto de su fe se encuentre.', 1, 'published'),
  ('¿Cuánto cuesta?', 'Nada — el encuentro es gratis. Solo trae ganas de estar presente.', 2, 'published'),
  ('¿Dónde son los encuentros?', 'Nos reunimos una vez al mes en una ubicación de Hermosillo que se confirma en cada evento.', 3, 'published'),
  ('¿Puedo ir sola?', 'Sí — de hecho, la mayoría llega sola la primera vez. Es un espacio pensado justo para conocer mujeres nuevas.', 4, 'published'),
  ('¿Cuánto dura un encuentro?', 'Aproximadamente hora y media.', 5, 'published');

-- ─────────────────────────────────────────────────────────────
-- 3) site_settings (incluye fundadora / historia para /nosotras)
-- ─────────────────────────────────────────────────────────────
create table site_settings (
  id smallint primary key default 1 check (id = 1),
  whatsapp_url text not null default '',
  instagram_url text not null default '',
  email text not null default '',
  phone text not null default '',
  founder_name text not null default '',
  founder_bio text not null default '',
  story_text text not null default '',
  updated_at timestamptz not null default now()
);

-- Nombre real de la fundadora. La bio y la historia se dejan vacías a
-- propósito — se llenan desde /admin/configuracion, no se inventan aquí.
insert into site_settings (id, founder_name) values (1, 'Aimee Equihua');

alter table site_settings enable row level security;

create policy "public can read site settings"
  on site_settings for select
  using (true);

create policy "authenticated can update site settings"
  on site_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, update on site_settings to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- 4) site_images + bucket de Storage
-- ─────────────────────────────────────────────────────────────
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

create table site_images (
  key text primary key,
  url text not null default '',
  updated_at timestamptz not null default now()
);

alter table site_images enable row level security;

create policy "public can read site images"
  on site_images for select
  using (true);

create policy "authenticated can manage site images"
  on site_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, insert, update on site_images to anon, authenticated;

insert into site_images (key) values
  ('logo'),
  ('comunidad_1'), ('comunidad_2'), ('comunidad_3'),
  ('comunidad_4'), ('comunidad_5'), ('comunidad_6'),
  ('fundadora');

-- ─────────────────────────────────────────────────────────────
-- 5) 3 encuentros de ejemplo — GRATIS
-- ─────────────────────────────────────────────────────────────
insert into events (slug, title, description, event_date, location, price_cents, capacity, status)
values
  (
    'encuentro-agosto',
    'Un café, una pausa',
    'Abrimos el mes con una conversación sobre cómo sostener la fe en medio de temporadas ocupadas. Llega diez minutos antes para elegir tu café con calma.',
    '2026-08-09 10:00:00-07',
    'Café Presidente, Hermosillo',
    0,
    20,
    'published'
  ),
  (
    'encuentro-septiembre',
    'Historias que sanan',
    'Un espacio para compartir en voz baja las historias que normalmente no contamos. Habrá una dinámica breve para romper el hielo si vienes sola.',
    '2026-09-13 10:00:00-07',
    'Café Presidente, Hermosillo',
    0,
    20,
    'published'
  ),
  (
    'encuentro-octubre',
    'Gratitud en comunidad',
    'Cerramos el trimestre con un encuentro enfocado en gratitud — qué significa practicarla cuando la vida no está color de rosa.',
    '2026-10-11 10:00:00-07',
    'Por confirmar',
    0,
    20,
    'published'
  );

-- ─────────────────────────────────────────────────────────────
-- 6) 4 productos de ejemplo
-- ─────────────────────────────────────────────────────────────
insert into products (slug, name, description, price_cents, stock, status)
values
  (
    'taza-cafe-con-fe',
    'Taza Café con Fe',
    'Cerámica esmaltada color crema, con el logo grabado. La misma taza que usamos en los encuentros.',
    28000,
    30,
    'published'
  ),
  (
    'vela-aroma-cafe',
    'Vela de soya — Aroma Café',
    'Vela artesanal de cera de soya con aroma a café tostado, para recrear el ambiente del encuentro en casa.',
    22000,
    20,
    'published'
  ),
  (
    'playera-bordada',
    'Playera bordada Café con Fe',
    'Playera de algodón color beige con el logo bordado a mano en hilo dorado. Corte unisex.',
    45000,
    15,
    'published'
  ),
  (
    'journal-gratitud',
    'Journal de gratitud',
    'Libreta de pasta dura con prompts mensuales para practicar la gratitud entre encuentro y encuentro.',
    32000,
    0,
    'published'
  );

-- ─────────────────────────────────────────────────────────────
-- 7) prayer_requests — solicitudes de oración
-- ─────────────────────────────────────────────────────────────
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
