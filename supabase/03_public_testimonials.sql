-- Café con Fe — permitir que cualquiera envíe un testimonio (queda como
-- borrador hasta que el equipo lo publique desde /admin/testimonios).
-- Aditivo — no borra ni toca nada existente. Pega esto en Supabase →
-- SQL Editor → Run, una sola vez.

create policy "anyone can submit a draft testimonial"
  on testimonials for insert
  with check (status = 'draft');
