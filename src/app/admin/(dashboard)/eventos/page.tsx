import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createClient } from "@/lib/supabase/server";
import { deleteEvent } from "./actions";

const STATUS_VARIANT = {
  published: "berry",
  draft: "neutral",
  cancelled: "outline",
} as const;

const STATUS_LABEL = {
  published: "Publicado",
  draft: "Borrador",
  cancelled: "Cancelado",
} as const;

export default async function AdminEventosPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("id, title, slug, event_date, status")
    .order("event_date", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Eventos</h1>
        <Link href="/admin/eventos/nuevo" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Nuevo evento
        </Link>
      </div>

      {events && events.length > 0 ? (
        <div className="border-border bg-surface mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-secondary text-ink-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-border border-t">
                  <td className="px-4 py-3">{event.title}</td>
                  <td className="text-ink-secondary px-4 py-3">
                    {new Intl.DateTimeFormat("es-MX", {
                      dateStyle: "medium",
                      timeZone: "America/Hermosillo",
                    }).format(new Date(event.event_date))}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_VARIANT[event.status as keyof typeof STATUS_VARIANT]}>
                      {STATUS_LABEL[event.status as keyof typeof STATUS_LABEL]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/eventos/${event.id}`}
                        aria-label="Editar"
                        className="text-ink-tertiary hover:text-ink flex h-9 w-9 items-center justify-center rounded-md"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                      <DeleteButton
                        action={deleteEvent.bind(null, event.id)}
                        confirmMessage={`¿Eliminar "${event.title}"? Esto también borra sus registros.`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState title="Aún no hay eventos" description="Crea el primero para empezar." />
        </div>
      )}
    </div>
  );
}
