import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { InstagramIcon, FacebookIcon } from "@/components/ui/icons";
import { focusRing, cn } from "@/lib/utils";
import { mockTestimonials } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Comunidad",
  description: "Historias de las mujeres que ya forman parte de Café con Fe.",
};

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
];

export default function ComunidadPage() {
  return (
    <main>
      <section className="max-w-content px-container-x py-section-y-lg mx-auto">
        <Reveal>
          <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">
            Comunidad
          </p>
          <h1 className="font-display max-w-reading mt-2 text-4xl font-medium sm:text-5xl">
            Mujeres que ya encontraron su pausa
          </h1>
          <p className="text-ink-secondary max-w-reading mt-4 font-sans text-base leading-relaxed">
            Cada mes se suman más mujeres a Café con Fe. Esto es lo que dicen quienes ya vinieron —
            sin filtro, sin guion.
          </p>
        </Reveal>

        <div className="gap-content-gap mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {mockTestimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface-secondary py-section-y">
        <div className="max-w-content px-container-x mx-auto">
          <Reveal>
            <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">
              Momentos
            </p>
            <h2 className="font-display mt-2 text-3xl font-medium sm:text-4xl">
              Así se ve la comunidad
            </h2>
          </Reveal>
          <div className="gap-content-gap mt-10 grid grid-cols-1 sm:grid-cols-3">
            <Reveal delay={0}>
              <PlaceholderImage
                caption="Foto: grupo grande del encuentro de julio"
                className="aspect-square"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <PlaceholderImage caption="Foto: dos asistentes riendo" className="aspect-square" />
            </Reveal>
            <Reveal delay={0.15}>
              <PlaceholderImage
                caption="Foto: mesa llena de tazas y notas"
                className="aspect-square"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="contacto" className="max-w-content px-container-x py-section-y-lg mx-auto">
        <Reveal className="max-w-reading">
          <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">
            Contacto
          </p>
          <h2 className="font-display mt-2 text-3xl font-medium sm:text-4xl">
            ¿Tienes preguntas antes de venir?
          </h2>
          <p className="text-ink-secondary mt-4 font-sans text-base leading-relaxed">
            Escríbenos por redes — respondemos personalmente, no hay bots ni formularios de contacto
            genéricos.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "border-border text-ink-secondary hover:text-ink flex h-12 w-12 items-center justify-center rounded-full border transition-colors",
                  focusRing,
                )}
                aria-label={label}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}
