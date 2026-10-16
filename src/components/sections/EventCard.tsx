import Link from "next/link";
import { CalendarDays, MapPin, Tag } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Photo } from "@/components/ui/Photo";
import { focusRing, cn } from "@/lib/utils";
import type { EventDisplay } from "@/lib/events";

export function EventCard({ event }: { event: EventDisplay }) {
  return (
    <Link
      href={`/eventos/${event.slug}`}
      className={cn("block transition-transform duration-300 hover:-translate-y-1.5", focusRing)}
    >
      <Card interactive className="flex h-full flex-col gap-4 p-8 shadow-none hover:shadow-lg">
        <Photo
          src={event.imageUrl}
          alt={event.title}
          caption={`Foto: ${event.title}`}
          className="aspect-video"
        />

        <div>
          <p className="font-display text-xl font-medium">{event.title}</p>

          <div className="text-ink-secondary mt-3 flex flex-col gap-2 font-sans text-sm">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {event.date} · dura 1h 30min aprox.
            </span>
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
      </Card>
    </Link>
  );
}
