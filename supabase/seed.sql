-- Café con Fe — datos iniciales (Etapa 6)
-- Corre esto DESPUÉS de schema.sql. Inserta los mismos 3 encuentros que
-- hoy viven como mock en el sitio, para que el registro real tenga
-- eventos existentes contra los cuales escribir. Se reemplazan/editan
-- desde el panel admin en la Etapa 9.

insert into events (slug, title, description, event_date, location, price_cents, capacity, status)
values
  (
    'encuentro-agosto',
    'Un café, una pausa',
    'Abrimos el mes con una conversación sobre cómo sostener la fe en medio de temporadas ocupadas. Llega diez minutos antes para elegir tu café con calma.',
    '2026-08-09 10:00:00-07',
    'Café Presidente, Hermosillo',
    15000,
    20,
    'published'
  ),
  (
    'encuentro-septiembre',
    'Historias que sanan',
    'Un espacio para compartir en voz baja las historias que normalmente no contamos. Habrá una dinámica breve para romper el hielo si vienes sola.',
    '2026-09-13 10:00:00-07',
    'Café Presidente, Hermosillo',
    15000,
    20,
    'published'
  ),
  (
    'encuentro-octubre',
    'Gratitud en comunidad',
    'Cerramos el trimestre con un encuentro enfocado en gratitud — qué significa practicarla cuando la vida no está color de rosa.',
    '2026-10-11 10:00:00-07',
    'Por confirmar',
    15000,
    20,
    'published'
  )
on conflict (slug) do nothing;
