import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { EventCard } from "@/components/sections/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Los próximos encuentros mensuales de Un Café con Fe en Hermosillo.",
};

export default async function EventosPage() {
  const events = await getPublishedEvents();

  return (
    <main className="max-w-content px-container-x py-section-y-lg mx-auto">
      <Reveal>
        <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">Agenda</p>
        <h1 className="font-display mt-2 text-4xl font-medium sm:text-5xl">Próximos encuentros</h1>
        <p className="text-ink-secondary max-w-reading mt-4 font-sans text-base leading-relaxed">
          Nos reunimos una vez al mes. Elige la fecha que te acomode y aparta tu lugar — los cupos
          son limitados.
        </p>
      </Reveal>

      {events.length > 0 ? (
        <div className="gap-content-gap mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <Reveal key={event.slug} delay={index * 0.1}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState
            title="Aún no hay próximos encuentros"
            description="Vuelve pronto — publicamos las fechas con unos días de anticipación."
          />
        </div>
      )}
    </main>
  );
}
