import Link from "next/link";
import { Coffee, HeartHandshake, Sparkles, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { EmptyState } from "@/components/ui/EmptyState";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { EventCard } from "@/components/sections/EventCard";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { mockFaqs, mockTestimonials } from "@/lib/mock-data";
import { getPublishedEvents } from "@/lib/events";

const FEATURES = [
  {
    icon: Coffee,
    title: "Ambiente cálido",
    description: "Café de verdad, luz suave y conversación — nada de solemnidad ni protocolo.",
  },
  {
    icon: HeartHandshake,
    title: "Sin dogma",
    description: "No importa en qué punto de tu fe estés. Aquí se viene a conectar, no a juzgar.",
  },
  {
    icon: Users,
    title: "Comunidad real",
    description: "Mujeres que se vuelven a ver cada mes. Vínculos que se sostienen fuera del café.",
  },
  {
    icon: Sparkles,
    title: "Una pausa de verdad",
    description: "Un espacio mensual para respirar, sin la prisa del resto de la semana.",
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="max-w-reading">
      {eyebrow ? (
        <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display mt-2 text-3xl font-medium sm:text-4xl">{title}</h2>
    </div>
  );
}

export default async function Home() {
  const events = (await getPublishedEvents()).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="max-w-content gap-content-gap px-container-x py-section-y-lg mx-auto grid grid-cols-1 items-center lg:grid-cols-2">
        <Reveal>
          <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">
            Hermosillo, Sonora
          </p>
          <h1 className="font-display mt-3 text-5xl font-medium sm:text-6xl">
            Una pausa cálida para conectar con Dios.
          </h1>
          <p className="text-ink-secondary max-w-reading mt-6 font-sans text-lg leading-relaxed">
            Café con Fe es una comunidad de mujeres que se reúne una vez al mes en un ambiente
            íntimo tipo cafetería — sin la solemnidad de la iglesia tradicional, con toda la
            cercanía de una charla entre amigas.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="#proximos-encuentros" className={buttonVariants({ size: "lg" })}>
              Ver próximo encuentro
            </Link>
            <Link
              href="#nuestra-historia"
              className={buttonVariants({ size: "lg", variant: "secondary" })}
            >
              Conócenos
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.15} scale={0.96}>
          <PlaceholderImage
            caption="Foto: mesa de café con luz cálida y manos alrededor de una taza"
            className="aspect-[4/5]"
          />
        </Reveal>
      </section>

      {/* Próximos encuentros */}
      <section
        id="proximos-encuentros"
        className="max-w-content px-container-x py-section-y mx-auto"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Agenda" title="Próximos encuentros" />
            <Link
              href="/eventos"
              className="text-berry font-sans text-sm font-medium underline underline-offset-4"
            >
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

      {/* Nuestra historia */}
      <section id="nuestra-historia" className="bg-surface-secondary py-section-y">
        <div className="max-w-content gap-content-gap px-container-x mx-auto grid grid-cols-1 items-center lg:grid-cols-2">
          <Reveal>
            <PlaceholderImage
              caption="Foto: fundadoras de Café con Fe conversando"
              className="aspect-square"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Nuestra historia" title="Nació de una necesidad real" />
            <p className="text-ink-secondary max-w-reading mt-6 font-sans text-base leading-relaxed">
              Café con Fe empezó porque varias amigas buscábamos un espacio para hablar de fe sin la
              rigidez de un templo — un lugar donde la conversación se sintiera tan natural como un
              café entre amigas. Hoy es una comunidad mensual que crece boca a boca, hecha para
              mujeres que quieren una pausa honesta en medio de la semana.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Así se siente un encuentro */}
      <section className="max-w-content px-container-x py-section-y mx-auto">
        <Reveal>
          <SectionHeading eyebrow="La experiencia" title="Así se siente un encuentro" />
        </Reveal>
        <div className="gap-content-gap mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal delay={0} className="lg:col-span-2">
            <PlaceholderImage
              caption="Foto: grupo de mujeres riendo alrededor de una mesa"
              className="aspect-video lg:aspect-[21/9]"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <PlaceholderImage
              caption="Foto: taza de café con detalle de vela"
              className="aspect-square"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <PlaceholderImage
              caption="Foto: dos mujeres conversando de cerca"
              className="aspect-square"
            />
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-2">
            <PlaceholderImage
              caption="Foto: vista amplia del espacio del café"
              className="aspect-video lg:aspect-[21/9]"
            />
          </Reveal>
        </div>
      </section>

      {/* Qué vas a encontrar */}
      <section className="bg-surface-secondary py-section-y">
        <div className="max-w-content px-container-x mx-auto">
          <Reveal>
            <SectionHeading
              eyebrow="Qué vas a encontrar"
              title="Cuatro cosas que no van a cambiar"
            />
          </Reveal>
          <div className="gap-content-gap mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.1}>
                <Card className="h-full">
                  <feature.icon
                    className="text-berry h-7 w-7"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <p className="font-display mt-4 text-lg font-medium">{feature.title}</p>
                  <p className="text-ink-secondary mt-2 font-sans text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="max-w-content px-container-x py-section-y mx-auto">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Comunidad" title="Lo que dicen quienes ya vinieron" />
            <Link
              href="/comunidad"
              className="text-berry font-sans text-sm font-medium underline underline-offset-4"
            >
              Ver más
            </Link>
          </div>
        </Reveal>
        <div className="gap-content-gap mt-10 grid grid-cols-1 sm:grid-cols-3">
          {mockTestimonials.slice(0, 3).map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-content px-container-x py-section-y mx-auto">
        <Reveal>
          <SectionHeading eyebrow="Preguntas frecuentes" title="Antes de que preguntes" />
        </Reveal>
        <Reveal delay={0.1} className="mt-10">
          <Accordion items={mockFaqs} />
        </Reveal>
      </section>

      {/* Cierre */}
      <section className="bg-espresso py-section-y-lg">
        <Reveal className="max-w-reading px-container-x mx-auto text-center">
          <h2 className="font-display text-cream text-3xl font-medium sm:text-4xl">
            Te esperamos en el próximo encuentro.
          </h2>
          <p className="text-cream/80 mt-4 font-sans text-base">
            Los cupos son limitados cada mes — regístrate con tiempo.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/eventos" className={buttonVariants({ size: "lg" })}>
              Ver próximo encuentro
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
