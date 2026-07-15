import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { CancelRegistrationButton } from "@/components/admin/CancelRegistrationButton";
import { createClient } from "@/lib/supabase/server";
import { cancelRegistration } from "./actions";

export const metadata: Metadata = { title: "Registros" };

export default async function AdminRegistrosPage() {
  const supabase = await createClient();
  const { data: registrations } = await supabase
    .from("registrations")
    .select("id, name, email, phone, status, created_at, events(title)")
    .order("created_at", { ascending: false });

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("es-MX", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Hermosillo",
    }).format(new Date(iso));

  const list = (registrations ?? []).map((r) => {
    const event = Array.isArray(r.events) ? r.events[0] : r.events;
    return { ...r, eventTitle: event?.title ?? "" };
  });

  const csvRows = list.map((r) => ({
    Nombre: r.name,
    Correo: r.email,
    Teléfono: r.phone ?? "",
    Evento: r.eventTitle,
    Estado: r.status === "confirmed" ? "Confirmado" : "Cancelado",
    Fecha: formatDate(r.created_at),
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Registros</h1>
        <ExportCsvButton filename="registros-cafeconfe.csv" rows={csvRows} />
      </div>

      {list.length > 0 ? (
        <div className="border-border bg-surface mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-secondary text-ink-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Correo</th>
                <th className="px-4 py-3 font-medium">Evento</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="border-border border-t">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="text-ink-secondary px-4 py-3">{r.email}</td>
                  <td className="text-ink-secondary px-4 py-3">{r.eventTitle}</td>
                  <td className="px-4 py-3">
                    <Badge variant={r.status === "confirmed" ? "berry" : "neutral"}>
                      {r.status === "confirmed" ? "Confirmado" : "Cancelado"}
                    </Badge>
                  </td>
                  <td className="text-ink-secondary px-4 py-3">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    {r.status === "confirmed" ? (
                      <div className="flex justify-end">
                        <CancelRegistrationButton action={cancelRegistration.bind(null, r.id)} />
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="Aún no hay registros"
            description="Cuando alguien se registre a un encuentro, aparecerá aquí."
          />
        </div>
      )}
    </div>
  );
}
