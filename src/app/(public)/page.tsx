import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Accordion } from "@/components/ui/Accordion";
import { LaceEdge } from "@/components/ui/LaceEdge";
import { FlowerDot } from "@/components/ui/FlowerDot";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PetalField } from "@/components/motion/PetalField";
import { EventCard } from "@/components/sections/EventCard";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { FundadoraSection } from "@/components/sections/FundadoraSection";
import { CommunityGallery } from "@/components/sections/CommunityGallery";
import { getPublishedEvents } from "@/lib/events";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { getPublishedFaqs } from "@/lib/faqs";
import { getSiteImages } from "@/lib/site-images";
import { getSiteSettings } from "@/lib/site-settings";
import { cn, focusRing } from "@/lib/utils";

const AUDIENCE = [
  "Si no crees y te interesa saber de Jesús",
  "Si ya crees y buscas alimento",
  "Si no estás segura, pero quieres buscar a Jesús",
  "Si quieres crecer tu fe",
  "Si buscas sanación de tu corazón",
  "Si estás cansada de tu vida",
  "Si ya crees y quieres crecer",
  "Si buscas una tarde para desconectar y estar con Jesús",
];

const inkLink = cn(
  "font-sans text-sm font-medium underline underline-offset-4",
  focusRing,
  "rounded-sm",
);

function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <p
      className={cn(
        "font-sans text-xs font-semibold tracking-[0.32em] uppercase",
        onDark ? "text-blush" : "text-berry",
      )}
    >
      {children}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  onDark?: boolean;
}) {
  return (
    <div className="max-w-reading">
      {eyebrow ? <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "font-display mt-3 text-3xl font-light sm:text-4xl",
          onDark ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

export default async function Home() {
  const [events, testimonials, faqs, images, settings] = await Promise.all([
    getPublishedEvents().then((e) => e.slice(0, 3)),
    getPublishedTestimonials(),
    getPublishedFaqs(),
    getSiteImages(),
    getSiteSettings(),
  ]);

  return (
    <main>
      {/* Hero — postal con borde de encaje sobre fondo oscuro con pétalos */}
      <section className="bg-espresso relative overflow-hidden px-[clamp(14px,3vw,44px)] py-[clamp(28px,4vw,60px)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[.16]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 21%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 78.5% 41%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 67.5% 81%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 32.5% 81%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 21.5% 41%,var(--color-blush) 5.5%,transparent 6.5%)",
            backgroundSize: "110px 110px",
          }}
        />
        <PetalField count={12} />
        <Reveal className="relative mx-auto max-w-[1000px]" y={26} duration={1.1}>
          <div className="bg-surface shadow-2xl">
            <LaceEdge cutout="var(--color-blush)" edge="top" />
            <div className="px-[clamp(22px,5vw,72px)] pt-[clamp(30px,4vw,54px)] pb-[clamp(38px,5vw,66px)] text-center">
              <p className="text-berry font-sans text-xs tracking-[0.36em] uppercase">
                Hermosillo · una vez al mes
              </p>
              <Image
                src="/brand/hero-main.jpg"
                alt=""
                width={736}
                height={412}
                priority
                aria-hidden="true"
                className="mx-auto mt-6 h-auto w-full max-w-[520px]"
              />
              <RevealHeading
                as="h1"
                delay={0.3}
                className="font-display mx-auto mt-6 max-w-[22ch] text-[clamp(28px,4.6vw,54px)] leading-[1.14] font-light"
              >
                Donde el corazón sana y el propósito despierta
              </RevealHeading>
              <p className="text-wood mx-auto mt-4 max-w-md font-sans text-base leading-snug font-medium sm:text-xl">
                No temas, porque yo te redimí; te puse nombre, mía eres tú.
              </p>
              <p className="text-ink-tertiary mt-2 font-sans text-xs tracking-[0.14em] uppercase sm:text-sm">
                Isaías 43:1
              </p>
              <div className="mt-8 flex justify-center">
                <Link href="#proximos-encuentros" className={buttonVariants({ size: "lg" })}>
                  Aparta tu lugar
                </Link>
              </div>
              <p className="font-script text-berry mt-7 text-[clamp(22px,2.6vw,30px)]">
                con fe y con cariño
              </p>
            </div>
            <LaceEdge cutout="var(--color-blush)" edge="bottom" />
          </div>
        </Reveal>
      </section>

      {/* Para quién está dirigido */}
      <section className="max-w-content px-container-x py-section-y-lg mx-auto">
        <Reveal>
          <SectionHeading eyebrow="Para quién está dirigido" title="Si te suena alguna de estas" />
        </Reveal>
        <div className="border-border bg-border mt-10 grid grid-cols-1 gap-px border sm:grid-cols-2">
          {AUDIENCE.map((item, index) => (
            <Reveal
              key={item}
              delay={index * 0.05}
              className="bg-surface flex items-center gap-4 p-6"
            >
              <FlowerDot size={26} />
              <p className="text-ink font-sans text-base leading-snug sm:text-lg">{item}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Próximos encuentros */}
      <section
        id="proximos-encuentros"
        className="max-w-content px-container-x py-section-y mx-auto"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Agenda" title="Próximos encuentros" />
            <Link href="/eventos" className={cn(inkLink, "text-ink")}>
              Ver todos
            </Link>
          </div>
        </Reveal>
        {events.length > 0 ? (
          <div className="gap-content-gap mt-10 grid grid-cols-1 sm:grid-cols-3">
            {events.map((event, index) => (
              <Reveal key={event.slug} delay={index * 0.1}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="Aún no hay próximos encuentros"
              description="Vuelve pronto — publicamos las fechas con unos días de anticipación."
            />
          </div>
        )}
      </section>

      {/* Lo que creemos */}
      <section id="creemos" className="bg-espresso py-section-y relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[.18]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,var(--color-blush) 0 1px,transparent 1px 18px)",
          }}
        />
        <Reveal className="max-w-reading px-container-x relative mx-auto text-center">
          <Eyebrow onDark>Lo que creemos</Eyebrow>
          <h2 className="font-display text-cream mt-3 text-3xl font-light sm:text-4xl">
            Cuando una mujer sana, <span className="text-blush italic">una generación cambia.</span>
          </h2>
          <p className="text-cream/76 mt-5 font-sans text-base leading-relaxed">
            Nos reunimos una vez al mes, alrededor de una mesa, en una ubicación que se confirma en
            cada encuentro. Un espacio para conectar con Dios — no un evento más.
          </p>
        </Reveal>
      </section>

      {/* Así se siente un encuentro */}
      <section className="max-w-content px-container-x py-section-y mx-auto">
        <Reveal>
          <SectionHeading eyebrow="La experiencia" title="Así se siente un encuentro" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <CommunityGallery images={images} />
        </Reveal>
      </section>

      {/* Testimonios */}
      {testimonials.length > 0 ? (
        <section className="max-w-content px-container-x py-section-y-lg mx-auto">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="La comunidad" title="Lo que dicen quienes ya vinieron" />
              <Link href="/nosotras" className={cn(inkLink, "text-ink")}>
                Leer más historias
              </Link>
            </div>
          </Reveal>
          <div className="gap-content-gap mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8 flex justify-center">
            <Link
              href="/nosotras#escribir-testimonio"
              className={buttonVariants({ variant: "secondary" })}
            >
              Escribir mi testimonio
            </Link>
          </Reveal>
        </section>
      ) : null}

      {/* FAQ */}
      {faqs.length > 0 ? (
        <section className="max-w-content px-container-x py-section-y mx-auto">
          <Reveal>
            <SectionHeading eyebrow="Preguntas frecuentes" title="Antes de que preguntes" />
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <Accordion items={faqs} />
          </Reveal>
        </section>
      ) : null}

      <FundadoraSection settings={settings} images={images} linkToNosotras />

      {/* Cierre */}
      <section className="bg-espresso py-section-y-lg relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 20%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 79% 41%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 68% 82%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 32% 82%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 21% 41%,var(--color-blush) 5.5%,transparent 6.5%)",
            backgroundSize: "96px 96px",
          }}
        />
        <Reveal className="max-w-reading px-container-x relative mx-auto text-center">
          <h2 className="font-display text-cream text-3xl font-light sm:text-4xl">
            ¿Qué situación enfrentas hoy?
          </h2>
          <p className="text-cream/80 mt-4 font-sans text-base">Queremos acompañarte.</p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/oracion"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-blush text-espresso hover:bg-cream",
              )}
            >
              Solicitar oración
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
