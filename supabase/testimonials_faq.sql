-- Café con Fe — testimonios y preguntas frecuentes (editables desde el admin)
-- Corre esto en el SQL Editor de Supabase, igual que los scripts anteriores.

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  quote text not null,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create index if not exists testimonials_status_idx on testimonials (status);

alter table testimonials enable row level security;

drop policy if exists "public can read published testimonials" on testimonials;
create policy "public can read published testimonials"
  on testimonials for select
  using (status = 'published');

drop policy if exists "authenticated can manage testimonials" on testimonials;
create policy "authenticated can manage testimonials"
  on testimonials for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, insert, update, delete on testimonials to anon, authenticated;

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now()
);

create index if not exists faqs_status_idx on faqs (status);

alter table faqs enable row level security;

drop policy if exists "public can read published faqs" on faqs;
create policy "public can read published faqs"
  on faqs for select
  using (status = 'published');

drop policy if exists "authenticated can manage faqs" on faqs;
create policy "authenticated can manage faqs"
  on faqs for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

grant select, insert, update, delete on faqs to anon, authenticated;

-- Semilla: migra el contenido que hoy vive como mock en el código.
insert into testimonials (name, quote, sort_order, status) values
  ('Fernanda R.', 'Nunca me había sentido tan en paz hablando de fe. Se siente como sentarme con amigas, no como ir a una reunión religiosa.', 1, 'published'),
  ('Paola G.', 'Llegué sin saber qué esperar y me fui con ganas de volver al siguiente mes. El ambiente es cálido de verdad.', 2, 'published'),
  ('Karla M.', 'Es el único espacio donde puedo conectar con Dios sin sentirme juzgada. Se nota que está hecho con intención.', 3, 'published'),
  ('Renata S.', 'Fui por curiosidad y me quedé por la comunidad. Ya llevo cinco meses seguidos sin faltar a ninguno.', 4, 'published'),
  ('Mariana T.', 'No esperaba llorar en mi primer encuentro, pero fue el buen tipo de llanto. Aquí sí se puede ser honesta.', 5, 'published'),
  ('Daniela C.', 'Vine sola la primera vez, con miedo de no encajar. Hoy son de las amigas que más veo cada mes.', 6, 'published')
on conflict do nothing;

insert into faqs (question, answer, sort_order, status) values
  ('¿Tengo que ser religiosa para asistir?', 'No. Café con Fe es para cualquier mujer que busque una pausa cálida y una conexión honesta, sin importar en qué punto de su fe se encuentre.', 1, 'published'),
  ('¿Cuánto cuesta?', 'El café y el espacio tienen un costo simbólico que se confirma al registrarte a cada encuentro — nunca es la razón para quedarte fuera, escríbenos si es una barrera.', 2, 'published'),
  ('¿Dónde son los encuentros?', 'Nos reunimos una vez al mes en una cafetería de Hermosillo. La sede exacta se confirma en cada evento.', 3, 'published'),
  ('¿Puedo ir sola?', 'Sí — de hecho, la mayoría llega sola la primera vez. Es un espacio pensado justo para conocer mujeres nuevas.', 4, 'published')
on conflict do nothing;
