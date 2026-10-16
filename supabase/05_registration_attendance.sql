-- Café con Fe — asistencia al encuentro: el admin marca quién llegó.
-- Aditivo — no borra nada. Pega esto en Supabase → SQL Editor → Run,
-- una sola vez.

alter table registrations add column if not exists attended boolean not null default false;
