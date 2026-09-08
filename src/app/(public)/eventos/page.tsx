import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { EventCard } from "@/components/sections/EventCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LaceRibbon } from "@/components/decor/LaceRibbon";
import { getPublishedEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Los próximos encuentros mensuales de Un Café con Fe en Hermosillo.",
};

export default async function EventosPage() {
  const events = await getPublishedEvents();

  return (
    <main>
      <section className="bg-gold">
        <div className="max-w-content px-container-x py-section-y mx-auto text-center">
          <Reveal>
            <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">
              Una vez al mes
            </p>
            <h1 className="reveal-write font-display mt-2 text-4xl font-light sm:text-6xl">
              Encuentros
            </h1>
            <p className="text-ink-secondary max-w-reading mx-auto mt-4 font-sans text-base leading-relaxed">
              Nos reunimos una vez al mes. Elige la fecha que te acomode y aparta tu lugar — los
              cupos son limitados.
            </p>
          </Reveal>
        </div>
        <LaceRibbon variant="bottom" background="#f4c9d6" notch="#faf3ec" />
      </section>

      <div className="max-w-content px-container-x py-section-y mx-auto">
        {events.length > 0 ? (
          <div className="gap-content-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, index) => (
              <Reveal key={event.slug} delay={index * 0.1}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aún no hay próximos encuentros"
            description="Vuelve pronto — publicamos las fechas con unos días de anticipación."
          />
        )}
      </div>
    </main>
  );
}
