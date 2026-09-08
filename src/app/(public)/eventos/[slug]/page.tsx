import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, Tag } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Photo } from "@/components/ui/Photo";
import { RegistrationForm } from "@/components/sections/RegistrationForm";
import { getEventBySlug } from "@/lib/events";
import { getSiteSettings } from "@/lib/site-settings";
import { registerForEvent } from "./actions";

interface EventoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventoDetailPage({ params }: EventoPageProps) {
  const { slug } = await params;
  const [event, settings] = await Promise.all([getEventBySlug(slug), getSiteSettings()]);

  if (!event) {
    notFound();
  }

  const registerAction = registerForEvent.bind(null, event.eventId);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.dateIso,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: "Hermosillo, Sonora, México",
    },
    organizer: {
      "@type": "Organization",
      name: "Un Café con Fe",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: (event.priceCents / 100).toFixed(2),
      priceCurrency: "MXN",
      availability:
        event.spotsLeft > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      url: `${siteUrl}/eventos/${event.slug}`,
    },
  };

  return (
    <main className="max-w-content px-container-x py-section-y-lg mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Reveal>
        <Link
          href="/eventos"
          className="text-ink-secondary font-sans text-sm underline underline-offset-4"
        >
          ← Todos los encuentros
        </Link>
      </Reveal>

      <div className="gap-content-gap mt-6 grid grid-cols-1 items-start lg:grid-cols-2">
        <Reveal>
          <Photo
            src={event.imageUrl}
            alt={event.title}
            caption={`Foto: ambiente del encuentro "${event.title}"`}
            className="aspect-[4/5]"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display text-4xl font-light sm:text-5xl">{event.title}</h1>

          <div className="text-ink-secondary mt-6 flex flex-col gap-3 font-sans text-base">
            <span className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {event.date}
            </span>
            <span className="flex items-center gap-3">
              <MapPin className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {event.location}
            </span>
            <span className="flex items-center gap-3">
              <Tag className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {event.price} — incluye tu café
            </span>
          </div>

          <p className="text-ink-secondary max-w-reading mt-6 font-sans text-base leading-relaxed">
            {event.description}
          </p>

          {event.spotsLeft > 0 ? (
            <>
              <p className="text-ink-tertiary mt-2 font-sans text-sm">
                Quedan {event.spotsLeft} lugares disponibles.
              </p>
              <div className="max-w-reading mt-8">
                <RegistrationForm action={registerAction} whatsappUrl={settings.whatsappUrl} />
              </div>
            </>
          ) : (
            <p className="text-error mt-6 font-sans text-sm font-medium">
              Ya no hay lugares disponibles para este encuentro.
            </p>
          )}
        </Reveal>
      </div>
    </main>
  );
}
