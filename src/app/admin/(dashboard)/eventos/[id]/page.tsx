import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import { createClient } from "@/lib/supabase/server";
import { updateEvent } from "../actions";

export const metadata: Metadata = { title: "Editar evento" };

function toLocalInputValue(iso: string): string {
  const date = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Hermosillo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}

interface EditarEventoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarEventoPage({ params }: EditarEventoPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from("events").select("*").eq("id", id).maybeSingle();

  if (!event) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Editar evento</h1>
      <div className="mt-6">
        <EventForm
          action={updateEvent.bind(null, event.id)}
          submitLabel="Guardar cambios"
          initialValues={{
            title: event.title,
            slug: event.slug,
            description: event.description,
            eventDateLocal: toLocalInputValue(event.event_date),
            location: event.location,
            priceMxn: event.price_cents / 100,
            capacity: event.capacity,
            status: event.status,
          }}
        />
      </div>
    </div>
  );
}
