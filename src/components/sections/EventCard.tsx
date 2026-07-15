import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { focusRing, cn } from "@/lib/utils";
import type { EventDisplay } from "@/lib/events";

export function EventCard({ event }: { event: EventDisplay }) {
  return (
    <Link href={`/eventos/${event.slug}`} className={cn("block rounded-xl", focusRing)}>
      <Card interactive className="flex h-full flex-col gap-4 p-4">
        <Photo
          src={event.imageUrl}
          alt={event.title}
          caption={`Foto: ${event.title}`}
          className="aspect-video"
        />

        <div className="px-2 pb-2">
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-xl font-medium">{event.title}</p>
            {event.spotsLeft <= 8 ? <Badge variant="gold">Pocos cupos</Badge> : null}
          </div>

          <div className="text-ink-secondary mt-3 flex flex-col gap-2 font-sans text-sm">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              {event.location}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
