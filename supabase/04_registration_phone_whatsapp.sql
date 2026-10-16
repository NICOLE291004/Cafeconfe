-- Café con Fe — en el registro a un encuentro: correo pasa a opcional,
-- teléfono pasa a obligatorio, y se agrega si quiere recibir avisos por
-- la comunidad de WhatsApp (mucha gente no abre el link de invitación).
-- Aditivo — no borra nada. Pega esto en Supabase → SQL Editor → Run,
-- una sola vez.

alter table registrations alter column email drop not null;

-- Por si ya hay registros viejos sin teléfono (de cuando era opcional),
-- se rellenan antes de exigir que no sea nulo — así el paso siguiente
-- nunca falla por datos existentes.
update registrations set phone = '' where phone is null;
alter table registrations alter column phone set not null;

alter table registrations add column wants_whatsapp boolean not null default false;
