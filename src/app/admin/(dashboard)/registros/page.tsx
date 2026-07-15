import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminRegistrosPage() {
  const supabase = await createClient();
  const { data: registrations } = await supabase
    .from("registrations")
    .select("id, name, email, phone, status, created_at, events(title)")
    .order("created_at", { ascending: false });

  const rows = (registrations ?? []).map((r) => {
    const event = Array.isArray(r.events) ? r.events[0] : r.events;
    return {
      Nombre: r.name,
      Correo: r.email,
      Teléfono: r.phone ?? "",
      Evento: event?.title ?? "",
      Estado: r.status,
      Fecha: new Intl.DateTimeFormat("es-MX", {
        dateStyle: "short",
        timeStyle: "short",
        timeZone: "America/Hermosillo",
      }).format(new Date(r.created_at)),
    };
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Registros</h1>
        <ExportCsvButton filename="registros-cafeconfe.csv" rows={rows} />
      </div>

      {rows.length > 0 ? (
        <div className="border-border bg-surface mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-secondary text-ink-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Correo</th>
                <th className="px-4 py-3 font-medium">Evento</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-border border-t">
                  <td className="px-4 py-3">{row.Nombre}</td>
                  <td className="text-ink-secondary px-4 py-3">{row.Correo}</td>
                  <td className="text-ink-secondary px-4 py-3">{row.Evento}</td>
                  <td className="px-4 py-3">
                    <Badge variant={row.Estado === "confirmed" ? "berry" : "neutral"}>
                      {row.Estado === "confirmed" ? "Confirmado" : "Cancelado"}
                    </Badge>
                  </td>
                  <td className="text-ink-secondary px-4 py-3">{row.Fecha}</td>
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
