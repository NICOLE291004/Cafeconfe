-- Café con Fe — productos iniciales (Etapa 7)
-- Corre esto en el SQL Editor de Supabase, igual que schema.sql/seed.sql.

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
  )
on conflict (slug) do nothing;
