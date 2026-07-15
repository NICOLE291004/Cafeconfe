# Etapa 1 — Análisis del sitio de referencia y propuesta de adaptación para Café con Fe

## Contexto

Café con Fe es una comunidad de mujeres en Hermosillo, Sonora, que se reúne mensualmente en un ambiente cálido tipo café para conectar con Dios, evitando deliberadamente el estilo religioso tradicional. El sitio se construyó usando como referencia de **calidad visual y de interacción** (no de diseño literal) el archivo `docs/reference/sneako_framer_website.html` — un sitio exportado de Framer para una marca de sneakers. Se analizó en profundidad su arquitectura, sistema de diseño y animaciones antes de diseñar la adaptación para Café con Fe.

Decisiones confirmadas en esta etapa:
- **Animación en Next.js:** Motion for React (paquete `motion`, sucesor open-source de Framer Motion — el mismo motor que usa el sitio de referencia).
- **Sistema visual de Café con Fe:** propuesto en este documento (paleta, tipografías, dirección fotográfica), a validar/ajustar con assets reales cuando existan.

---

## 1. Qué arquitectura tiene el sitio de referencia

No es un proyecto de código fuente en el sentido tradicional — es la **salida compilada/exportada de Framer** (un builder visual), no algo escrito a mano:

- Todo vive en **un único archivo HTML** de 550KB. El CSS completo (incluyendo cientos de reglas y un bloque `:root` con ~60 custom properties) está comprimido en **una sola línea física**.
- Las clases siguen el patrón `framer-<hash>` (ej. `framer-1fp7q8p-container`, `framer-eT7hn`) — identificadores de instancia generados por el compilador, sin significado semántico ni reutilización manual.
- El JS de interacción real (React + runtime de Framer) vive en un **archivo externo** (`script_main.CjszV4-h.mjs`, cargado como `<script type="module">`); el HTML solo incluye inline el motor de animación "appear" y su configuración en JSON.
- No hay separación de componentes en el sentido de desarrollo — es un árbol DOM plano con muchísima repetición estructural (ej. nav duplicado para desktop/mobile, footer triplicado para Desktop/Tablet/Phone en vez de un solo componente responsivo).
- **Conclusión:** la arquitectura del archivo en sí **no es reutilizable ni imitable**. Lo valioso no es la arquitectura del archivo, sino las **decisiones de diseño** que codifica (paleta, ritmo, tipografía, timing de animación, jerarquía de secciones).

## 2. Sistema de diseño detectado

**Color:** paleta dominada por neutros (`#000`/`#fff`, escala de grises de `#f5f5f5` a `#292929`), un azul de acento genérico (`#007bff`/`#09f`) usado en links/selección, y una paleta secundaria cálida (`#e3cfb3` beige, `#ffc175`/`#ffc37a` durazno-dorado, `#c7944e` café claro) — la más cercana a la dirección de Café con Fe. Overlays y sombras suaves usan hex de 8 dígitos con alpha (`#00000026`) en vez de `rgba()`.

**Tipografía:** dos familias — **Ranchers** (display, estilo skate/urbano, para títulos) e **Inter** (400–700 + italics, para texto, con subsetting por unicode-range). Escala de tamaños muy dispersa (12px a 220px).

**Espaciado:** sin escala estricta tipo "8pt grid" — predominancia de 10px/16px con valores irregulares (44px, 14px, `150px 44px 64px`), típico de ajuste manual en un builder visual.

**Breakpoints:** 3 niveles — desktop (`≥1200px`), tablet (`810–1199px`), mobile (`≤809px`) — más `@media (pointer: fine)` para reservar `:hover` a dispositivos con puntero preciso.

**Bordes/sombras:** casi no hay `box-shadow` (lenguaje visual plano); `border-radius` mayormente `inherit`, con `40px` explícito para botones tipo píldora.

**Organización del CSS:** inline, generado, no mantenible a mano — el tipo de organización a **no** replicar.

## 3. Layout y estructura de páginas

Orden de secciones: Nav → Hero (producto + selector) → Best Sellers (carousel) → Legends Collection (colección + CTA) → Categories (grid con overlay) → The Approach/Features → World Wide Shipping (ilustración animada) → Brands → FAQ's → Footer (3 variantes redundantes por breakpoint).

Estructura clásica de landing premium: emoción → oferta → historia → beneficios → confianza → objeciones → cierre. Esa **secuencia narrativa** es reutilizable independientemente del rubro.

## 4. Componentes reutilizables identificados

- **Product Card** (imagen + nombre), repetida 8 veces entre dos carousels.
- **Category Card** con overlay de gradiente `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,.5) 100%)` sobre imagen.
- **Color Swatch button** (selector interactivo, `tabindex="0"`).
- **Carousel Prev/Next buttons** con `aria-label` correcto.
- **Nav Link** con clase de texto compartida.
- Doble nav (desktop / mobile con botón hamburguesa animado de 2 líneas).

## 5. Animaciones y microinteracciones

**No usa GSAP, ScrollTrigger ni Lenis.** Usa el motor de animación propio de Framer — variante standalone de **Motion** (ex "Framer Motion") embebida inline, ejecutando animaciones vía **Web Animations API** nativa. No hay ni un solo `@keyframes` en todo el archivo.

- 11 bloques `data-framer-appear-id` vinculados a definiciones JSON (`initial` → `animate`) con `opacity`, `x`, `y`, `scale`, `rotate` y `transition` (duration, delay, easing cúbico `[0.12, 0.23, 0.5, 1]`, o springs con `bounce: 0`).
- Ejemplos: fade-in + slide vertical (`y: 50→0`, duration 1.5s, delay 0.5s); rotación + slide desde arriba; scale-in (`0.3→1`) + slide.
- Variantes de timing por breakpoint.
- Respeta `prefers-reduced-motion`.
- `will-change: transform` en 43 elementos.
- Hover states en CSS puro; al menos un componente draggable (`cursor: grab/grabbing`).

**Lectura clave:** el efecto premium no viene de trucos exóticos, sino de **moderación y consistencia** — duración generosa (1–1.5s), easing suave, poco rebote, animaciones de una sola vez al entrar en viewport.

## 6. Responsive y accesibilidad

3 breakpoints simples, imágenes con `srcset` de 3 resoluciones (sin `loading="lazy"` explícito ni formatos modernos). Buen uso de `alt`, `aria-label`, `aria-roledescription="carousel"`. Puntos débiles: FAQ sin `aria-expanded`, y **no existe ni un solo `<form>`** en todo el sitio.

---

## 7. Qué conviene conservar

- La narrativa de secciones (emoción → oferta → historia → beneficios → confianza → objeciones → cierre), adaptada a comunidad.
- El patrón "appear on scroll" sutil y moderado (fade + slide + scale, respetando `prefers-reduced-motion`).
- Overlay de gradiente sobre imágenes para legibilidad de texto.
- Botones tipo píldora para CTAs cálidos.
- Simplicidad de 3 breakpoints.
- `will-change`/promoción de capas para animaciones fluidas.
- Buen uso de `alt`/`aria-label` en elementos interactivos.
- Imágenes grandes, full-bleed, con `srcset` responsivo.

## 8. Qué conviene mejorar (no replicar)

- CSS monolítico e ilegible → Tailwind + tokens semánticos.
- Naming `framer-hash` → componentes React con nombres claros.
- Nav y footer duplicados por breakpoint → un solo componente responsivo.
- Cero formularios → formularios reales y accesibles (registro, checkout, login admin).
- Azul de acento genérico → paleta café/rosa berry/dorado.
- Tipografía Ranchers (skate/urbano) → serif elegante.
- FAQ sin `aria-expanded` → accordion accesible desde el inicio.
- Sin SEO estructurado → `Event` JSON-LD para eventos.
- Sin manejo de estados de carga/error/vacío → skeletons y errores explícitos con Supabase.
- Imágenes solo PNG → `next/image` con AVIF/WebP y lazy loading nativo.

---

## 9. Identidad visual de Café con Fe

Dirección: **cafetería boutique íntima, no iglesia.** Cálida, elegante, con espacio para respirar.

| Uso | Nombre | Hex |
|---|---|---|
| Fondo cálido base | Crema | `#FAF6EF` |
| Fondo secundario | Beige | `#EFE1CC` |
| Texto principal | Espresso | `#3A2A20` |
| Acento primario | Rosa Berry | `#A4405A` |
| Acento cálido | Dorado Vela | `#C9A15A` |
| Superficie madera | Nogal | `#6F4E37` |
| Neutros de apoyo | Grises cálidos | `#8A7F73` → `#2B241E` |

**Tipografía:** Fraunces (serif variable, cálida) para títulos; Inter para cuerpo de texto.

**Fotografía:** luz cálida natural, manos alrededor de tazas, conversación genuina entre mujeres, texturas de madera y tela — sin stock genérico ni iconografía religiosa tradicional.

## 10. Mapeo de secciones (referencia → Café con Fe)

| Referencia | Café con Fe |
|---|---|
| Nav doble | Header único responsivo: logo, Inicio/Eventos/Tienda/Comunidad, CTA "Próximo encuentro" |
| Hero (producto + selector) | Hero emocional: foto grande de comunidad, CTA "Ver próximo evento" / "Conócenos" |
| Best Sellers (carousel) | "Próximos Encuentros": eventos con fecha, sede, CTA de registro |
| Legends Collection | "Nuestra Historia": manifiesto de marca |
| Categories (grid overlay) | "Así se siente un encuentro": mosaico fotográfico |
| The Approach / Features | "Qué vas a encontrar": 3–4 beneficios |
| World Wide Shipping | Testimonios: citas y fotos reales |
| Brands | Aliados/patrocinadores (si aplica) |
| FAQ's | FAQ real (¿tengo que ser religiosa?, costo, sede, ¿ir sola?) |
| Footer (triplicado) | Un footer responsivo: redes, contacto, links, newsletter |

`Tienda` reutiliza Product Card. `Comunidad/Testimonios` reutiliza Category Card como grid de testimonios.

## 11. Adaptación a Next.js + Tailwind

```
app/
  (public)/  → Home, eventos, eventos/[slug], tienda, tienda/[slug], comunidad
  (admin)/   → login, dashboard, eventos, productos, registros
components/
  ui/        → Button, Card, Badge, Input
  sections/  → Hero, EventCard, TestimonialCard, ProductCard, Header, Footer
  motion/    → <Reveal> (whileInView, replica fade+slide+scale con Motion for React)
lib/
  supabase/  → client.ts, server.ts
styles/
  globals.css → tokens de diseño (ver sección 9)
```

- Tokens de diseño con nombres semánticos, no hashes.
- Espaciado con la escala default de Tailwind (más consistente que la referencia).
- Animación con `motion`: componente `<Reveal>`, easing `[0.12, 0.23, 0.5, 1]`, respetando `useReducedMotion()`.
- Imágenes con `next/image` (AVIF/WebP automático).
- Formularios con validación (`react-hook-form` + `zod`).
- SEO con metadata de Next.js + `Event` JSON-LD.

---

## 12. Roadmap de etapas

1. ✅ Análisis del sitio de referencia
2. Setup del proyecto + fundamentos del design system (tokens)
3. Componentes del design system (Button, Card, Header, Footer, `<Reveal>`)
4. Home completa con animaciones
5. Eventos (listado + detalle) con datos mock
6. Supabase (schema + auth) + registro real a eventos
7. Tienda
8. Comunidad / testimonios
9. Panel admin (login, CRUD, registros, export CSV, dashboard)
10. Pulido, performance, SEO, deploy a Vercel

Cada etapa se aborda con su propio plan y aprobación explícita antes de implementar.
