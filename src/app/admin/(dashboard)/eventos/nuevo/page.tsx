import type { Metadata } from "next";
import { EventForm } from "@/components/admin/EventForm";
import { createEvent } from "../actions";

export const metadata: Metadata = { title: "Nuevo evento" };

export default function NuevoEventoPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Nuevo evento</h1>
      <div className="mt-6">
        <EventForm action={createEvent} submitLabel="Crear evento" />
      </div>
    </div>
  );
}
