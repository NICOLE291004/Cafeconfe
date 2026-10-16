import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Tag } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { LaceEdge } from "@/components/ui/LaceEdge";
import { Photo } from "@/components/ui/Photo";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedEvents, getPastEvents } from "@/lib/events";
import { cn, focusRing } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Los próximos encuentros mensuales de Un Café con Fe en Hermosillo.",
};

export default async function EventosPage() {
  const [events, pastEvents] = await Promise.all([getPublishedEvents(), getPastEvents()]);

  return (
    <main>
      <section className="bg-blush relative overflow-hidden py-[clamp(56px,7vw,96px)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg,rgba(62,39,35,.22) 0 1px,transparent 1px 16px)",
          }}
        />
        <div className="max-w-content px-container-x relative mx-auto text-center">
          <Reveal>
            <p className="text-berry font-sans text-xs tracking-[0.36em] uppercase">
              Una vez al mes
            </p>
          </Reveal>
          <RevealHeading
            as="h1"
            delay={0.1}
            className="font-display mt-4 text-[clamp(42px,8vw,88px)] leading-[0.98] font-light"
          >
            Encuentros
          </RevealHeading>
          <Reveal delay={0.3}>
            <p className="text-ink-secondary mx-auto mt-5 max-w-[46ch] font-sans text-lg leading-relaxed">
              Nos reunimos una vez al mes. Elige la fecha que te acomode y aparta tu lugar — los
              cupos son limitados.
            </p>
          </Reveal>
        </div>
        <LaceEdge
          cutout="var(--color-cream)"
          edge="bottom"
          className="absolute right-0 bottom-0 left-0"
        />
      </section>

      <section className="max-w-content px-container-x py-section-y mx-auto">
        {events.length > 0 ? (
          <div className="flex flex-col gap-4">
            {events.map((event, index) => (
              <Reveal key={event.slug} delay={index * 0.1}>
                <Link
                  href={`/eventos/${event.slug}`}
                  className={cn(
                    "border-border bg-surface hover:bg-surface-secondary grid grid-cols-1 border transition-colors sm:grid-cols-[minmax(0,240px)_1fr]",
                    focusRing,
                  )}
                >
                  <Photo
                    src={event.imageUrl}
                    alt={event.title}
                    caption={`Foto: ${event.title}`}
                    className="aspect-video sm:aspect-auto sm:h-full"
                  />
                  <div className="flex flex-col gap-3 p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-berry font-sans text-xs tracking-[0.24em] uppercase">
                        {event.date}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl leading-tight font-medium sm:text-4xl">
                      {event.title}
                    </h2>
                    <p className="text-ink-secondary max-w-[54ch] font-sans text-base leading-relaxed">
                      {event.description}
                    </p>
                    <div className="border-border text-ink-secondary mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-dashed pt-5 font-sans text-sm">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-2">
                        <Tag className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                        {event.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aún no hay próximos encuentros"
            description="Vuelve pronto — publicamos las fechas con unos días de anticipación."
          />
        )}
      </section>

      {pastEvents.length > 0 ? (
        <section className="max-w-content px-container-x py-section-y-lg mx-auto">
          <Reveal>
            <p className="text-berry font-sans text-xs font-medium tracking-[0.24em] uppercase">
              Encuentros anteriores
            </p>
            <p className="text-ink-secondary mt-2 font-sans text-sm">
              Ya llevamos {pastEvents.length} encuentro{pastEvents.length === 1 ? "" : "s"} — esto
              es lo que hemos hecho hasta ahora.
            </p>
          </Reveal>
          <div className="border-border mt-8 border-t">
            {pastEvents.map((event, index) => (
              <Reveal key={event.slug} delay={index * 0.05}>
                <div className="border-border flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-5">
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                    <span className="text-berry font-sans text-xs tracking-[0.2em] uppercase">
                      {event.date}
                    </span>
                    <span className="font-display text-2xl">{event.title}</span>
                  </div>
                  <span className="text-ink-tertiary flex items-center gap-2 font-sans text-sm">
                    <CalendarDays className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    {event.location}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
