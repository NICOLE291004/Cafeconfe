import type { Metadata } from "next";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { MarkAttendedButton } from "@/components/admin/MarkAttendedButton";
import { createClient } from "@/lib/supabase/server";
import type { PrayerRequestRow } from "@/lib/supabase/types";
import { markPrayerRequestAttended } from "./actions";

export const metadata: Metadata = { title: "Peticiones de oración" };

export default async function AdminPeticionesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<PrayerRequestRow[]>();

  const requests = data ?? [];

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("es-MX", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "America/Hermosillo",
    }).format(new Date(iso));

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Peticiones de oración</h1>
      <p className="text-ink-secondary mt-1 font-sans text-sm">
        Trátalas con discreción — nadie más las ve. Solo el equipo autenticado puede leer esta
        página.
      </p>

      {requests.length > 0 ? (
        <div className="border-border bg-surface mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-secondary text-ink-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Petición</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Teléfono</th>
                <th className="px-4 py-3 font-medium">Consejería</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id} className="border-border border-t align-top">
                  <td className="text-ink max-w-md px-4 py-3 whitespace-pre-line">{r.request}</td>
                  <td className="text-ink-secondary px-4 py-3">{r.name || "Anónima"}</td>
                  <td className="text-ink-secondary px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">
                    {r.wants_call ? <Badge variant="berry">Sí</Badge> : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={r.status === "atendida" ? "neutral" : "berry"}>
                      {r.status === "atendida" ? "Atendida" : "Pendiente"}
                    </Badge>
                  </td>
                  <td className="text-ink-secondary px-4 py-3">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    {r.status === "pendiente" ? (
                      <div className="flex justify-end">
                        <MarkAttendedButton action={markPrayerRequestAttended.bind(null, r.id)} />
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
            title="Aún no hay peticiones"
            description="Cuando alguien envíe una petición de oración desde /oracion, aparecerá aquí."
          />
        </div>
      )}
    </div>
  );
}
