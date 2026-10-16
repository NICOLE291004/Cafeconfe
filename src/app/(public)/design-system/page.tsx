import { CalendarHeart, Heart, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FormField } from "@/components/ui/FormField";
import { Alert } from "@/components/ui/Alert";
import { EmptyState } from "@/components/ui/EmptyState";
import { LaceEdge } from "@/components/ui/LaceEdge";
import { FlowerDot } from "@/components/ui/FlowerDot";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PetalField } from "@/components/motion/PetalField";

const colorSwatches = [
  { name: "cream (Lino)", className: "bg-cream", hex: "#FAF3EC" },
  { name: "beige (Lienzo)", className: "bg-beige", hex: "#F3E7DB" },
  { name: "espresso (Tinta)", className: "bg-espresso", hex: "#3E2723" },
  { name: "berry (Vino)", className: "bg-berry", hex: "#7A3B48" },
  { name: "blush (Rubor)", className: "bg-blush", hex: "#F4C9D6" },
  { name: "walnut / wood (Barro)", className: "bg-walnut", hex: "#3E2723" },
  { name: "error", className: "bg-error", hex: "#B4533E" },
  { name: "success", className: "bg-success", hex: "#6B8F71" },
];

const warmGrayScale = [100, 200, 300, 400, 500, 600, 700, 800, 900];
const shadowScale = ["xs", "sm", "md", "lg", "xl"];
const radiusScale = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
  { name: "2xl", className: "rounded-2xl" },
  { name: "pill", className: "rounded-pill" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="max-w-content px-container-x py-section-y mx-auto">
      <h2 className="font-display text-3xl font-medium">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main>
      <div className="border-border-strong max-w-content px-container-x mx-auto border-b-2 border-dashed py-6 text-center">
        <p className="text-ink-secondary font-sans text-sm">
          Design System — Un Café con Fe. Página interna de referencia, no forma parte del sitio
          público.
        </p>
      </div>

      <Section title="Paleta">
        <div className="gap-content-gap grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {colorSwatches.map((swatch) => (
            <div key={swatch.name} className="text-center">
              <div className={`${swatch.className} border-border h-20 w-full border`} />
              <p className="mt-2 font-sans text-sm font-medium">{swatch.name}</p>
              <p className="text-ink-tertiary font-sans text-xs">{swatch.hex}</p>
            </div>
          ))}
        </div>
        <div className="gap-content-gap mt-8 grid grid-cols-3 sm:grid-cols-9">
          {warmGrayScale.map((step) => (
            <div key={step} className="text-center">
              <div
                className="border-border h-14 w-full border"
                style={{ background: `var(--color-warmgray-${step})` }}
              />
              <p className="mt-2 font-sans text-xs">{step}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografía">
        <p className="text-ink-tertiary font-sans text-xs tracking-[0.2em] uppercase">
          Display — Cormorant Garamond
        </p>
        <h1 className="font-display mt-2 text-6xl font-light">No venimos perfectas.</h1>
        <p className="font-display text-berry mt-1 text-6xl font-light italic">
          Venimos dispuestas.
        </p>

        <p className="text-ink-tertiary mt-8 font-sans text-xs tracking-[0.2em] uppercase">
          Texto — EB Garamond
        </p>
        <p className="text-ink-secondary max-w-reading mt-2 font-sans text-base leading-relaxed">
          Cuerpo en EB Garamond: <span className="font-normal">regular 400</span>,{" "}
          <span className="font-medium">medium 500</span>,{" "}
          <span className="font-normal italic">y su cursiva</span>.
        </p>

        <p className="text-ink-tertiary mt-8 font-sans text-xs tracking-[0.2em] uppercase">
          Script — Pinyon Script
        </p>
        <p className="font-script text-berry mt-2 text-4xl">con fe y con cariño</p>
      </Section>

      <Section title="Sombras y radios">
        <div className="bg-surface-secondary px-container-x py-8">
          <div className="gap-content-gap grid grid-cols-2 sm:grid-cols-5">
            {shadowScale.map((step) => (
              <div key={step} className="text-center">
                <div
                  className="bg-surface h-20 w-full"
                  style={{ boxShadow: `var(--shadow-${step})` }}
                />
                <p className="mt-2 font-sans text-xs">shadow-{step}</p>
              </div>
            ))}
          </div>
          <div className="gap-content-gap mt-8 grid grid-cols-3 sm:grid-cols-6">
            {radiusScale.map((radius) => (
              <div key={radius.name} className="text-center">
                <div className={`bg-walnut h-20 w-full ${radius.className}`} />
                <p className="mt-2 font-sans text-xs">{radius.name}</p>
              </div>
            ))}
          </div>
          <p className="text-ink-tertiary mt-4 font-sans text-xs">
            Cantos rectos por diseño — solo botones e insignias son píldora.
          </p>
        </div>
      </Section>

      <Section title="Piezas decorativas">
        <div className="gap-content-gap grid grid-cols-1 sm:grid-cols-2">
          <div>
            <p className="text-ink-tertiary font-sans text-xs tracking-[0.2em] uppercase">
              LaceEdge — borde de encaje
            </p>
            <div className="bg-blush mt-3">
              <LaceEdge cutout="var(--color-cream)" edge="top" />
              <div className="p-6 text-center">
                <p className="font-sans text-sm">Franja de color con muescas festoneadas</p>
              </div>
              <LaceEdge cutout="var(--color-cream)" edge="bottom" />
            </div>
          </div>
          <div>
            <p className="text-ink-tertiary font-sans text-xs tracking-[0.2em] uppercase">
              FlowerDot — viñeta
            </p>
            <div className="mt-3 flex items-center gap-6">
              <FlowerDot />
              <FlowerDot
                petalColor="var(--color-berry)"
                centerColor="var(--color-cream)"
                size={40}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-ink-tertiary font-sans text-xs tracking-[0.2em] uppercase">
            PetalField + RevealHeading — hero
          </p>
          <div className="bg-espresso relative mt-3 overflow-hidden px-6 py-16 text-center">
            <PetalField count={10} />
            <RevealHeading
              as="h2"
              className="font-display text-cream relative mx-auto max-w-md text-4xl font-light"
            >
              Un ratito con Él, una taza caliente.
            </RevealHeading>
          </div>
        </div>
      </Section>

      <Section title="Botones">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" iconLeft={<Heart className="h-4 w-4" strokeWidth={1.5} />}>
            Con ícono
          </Button>
          <Button variant="primary" isLoading>
            Cargando
          </Button>
          <Button variant="primary" disabled>
            Deshabilitado
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge variant="berry">Próximo</Badge>
          <Badge variant="blush">Destacado</Badge>
          <Badge variant="neutral">Agotado</Badge>
          <Badge variant="outline">Nuevo</Badge>
        </div>
      </Section>

      <Section title="Cards">
        <div className="gap-content-gap grid grid-cols-1 sm:grid-cols-2">
          <Card>
            <p className="font-display text-lg font-medium">Card estática</p>
            <p className="text-ink-secondary mt-2 font-sans text-sm">
              Superficie base con sombra y borde suaves.
            </p>
          </Card>
          <Card interactive>
            <p className="font-display text-lg font-medium">Card interactiva</p>
            <p className="text-ink-secondary mt-2 font-sans text-sm">
              Pasa el cursor — la sombra sube de sm a md. Se usará para EventCard/ProductCard.
            </p>
          </Card>
        </div>
      </Section>

      <Section title="Formularios">
        <div className="gap-content-gap grid grid-cols-1 sm:grid-cols-2">
          <FormField label="Nombre" htmlFor="demo-name" helperText="Como aparecerá en tu registro.">
            <Input id="demo-name" placeholder="Tu nombre" />
          </FormField>
          <FormField label="Correo" htmlFor="demo-email" error="Ingresa un correo válido.">
            <Input id="demo-email" placeholder="tu@correo.com" invalid />
          </FormField>
          <FormField label="Mensaje" htmlFor="demo-message" className="sm:col-span-2">
            <Textarea id="demo-message" placeholder="Cuéntanos algo…" />
          </FormField>
        </div>
      </Section>

      <Section title="Alertas">
        <div className="flex flex-col gap-4">
          <Alert variant="error">No pudimos guardar tu registro. Intenta de nuevo.</Alert>
          <Alert variant="success">¡Listo! Te esperamos en el próximo encuentro.</Alert>
          <Alert variant="info">Los cupos son limitados por mes.</Alert>
        </div>
      </Section>

      <Section title="Estado vacío">
        <EmptyState
          icon={CalendarHeart}
          title="Aún no hay próximos encuentros"
          description="Vuelve pronto — publicamos las fechas del siguiente mes con unos días de anticipación."
          action={
            <Button iconLeft={<Mail className="h-4 w-4" strokeWidth={1.5} />}>Avísame</Button>
          }
        />
      </Section>

      <Section title="Reveal (scroll para ver la animación)">
        <div className="flex flex-col gap-6">
          {[0, 1, 2].map((i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card>
                <p className="font-sans text-sm">
                  Bloque {i + 1} — aparece con fade + slide + scale al entrar en el viewport.
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
