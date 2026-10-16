import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ExportCsvButton } from "@/components/admin/ExportCsvButton";
import { CancelRegistrationButton } from "@/components/admin/CancelRegistrationButton";
import { AttendanceButton } from "@/components/admin/AttendanceButton";
import { RegistrationSearch } from "@/components/admin/RegistrationSearch";
import { WalkInForm } from "@/components/admin/WalkInForm";
import { createClient } from "@/lib/supabase/server";
import { normalizeText, normalizePhone, personKey, pickCurrentEvent } from "@/lib/registrations";
import { addWalkIn, cancelRegistration, enrollExisting, setAttendance } from "./actions";

export const metadata: Metadata = { title: "Registros" };

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

interface Reg {
  id: string;
  event_id: string;
  name: string;
  email: string | null;
  phone: string;
  wants_whatsapp: boolean;
  attended: boolean;
  status: "confirmed" | "cancelled";
  created_at: string;
  key: string;
}

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-MX", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Hermosillo",
  }).format(new Date(iso));

const formatEventDate = (iso: string) =>
  new Intl.DateTimeFormat("es-MX", {
    dateStyle: "long",
    timeZone: "America/Hermosillo",
  }).format(new Date(iso));

export default async function AdminRegistrosPage({ searchParams }: PageProps) {
  const { q = "" } = await searchParams;
  const supabase = await createClient();

  const [{ data: eventsData }, { data: regsData }] = await Promise.all([
    supabase
      .from("events")
      .select("id, title, event_date")
      .order("event_date", { ascending: false }),
    supabase
      .from("registrations")
      .select("id, event_id, name, email, phone, wants_whatsapp, attended, status, created_at")
      .order("created_at", { ascending: true }),
  ]);

  const events = eventsData ?? [];
  const regs: Reg[] = (regsData ?? []).map((r) => ({ ...r, key: personKey(r.name, r.phone) }));

  const currentEvent = pickCurrentEvent(events);

  const eventTitle = new Map(events.map((e) => [e.id, e.title]));

  // Registros previos por persona, en orden de llegada: "Nueva" si es el primero que se ve de ella.
  const byPerson = new Map<string, Reg[]>();
  for (const r of regs) {
    const list = byPerson.get(r.key) ?? [];
    list.push(r);
    byPerson.set(r.key, list);
  }
  const priorEvents = (r: Reg) =>
    new Set(
      (byPerson.get(r.key) ?? [])
        .filter((o) => o.event_id !== r.event_id && o.created_at <= r.created_at)
        .map((o) => o.event_id),
    ).size;

  // Búsqueda: una fila por persona, con todos sus eventos.
  const query = normalizeText(q);
  const queryDigits = q.replace(/\D/g, "");
  const results = query
    ? [...byPerson.values()]
        .filter((rs) =>
          rs.some(
            (r) =>
              normalizeText(r.name).includes(query) ||
              (queryDigits.length >= 3 && normalizePhone(r.phone).includes(queryDigits)),
          ),
        )
        .map((rs) => ({ latest: rs[rs.length - 1], regs: rs }))
    : [];

  const csvRows = [...regs].reverse().map((r) => ({
    Nombre: r.name,
    Teléfono: r.phone,
    Correo: r.email ?? "",
    WhatsApp: r.wants_whatsapp ? "Sí" : "No",
    Evento: eventTitle.get(r.event_id) ?? "",
    Estado: r.status === "confirmed" ? "Confirmado" : "Cancelado",
    Asistió: r.attended ? "Sí" : "No",
    Fecha: formatDate(r.created_at),
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Registros</h1>
        <ExportCsvButton filename="registros-cafeconfe.csv" rows={csvRows} />
      </div>

      {events.length === 0 ? (
        <EmptyState
          title="Aún no hay encuentros"
          description="Crea un encuentro y aquí aparecerán sus registros."
        />
      ) : (
        <>
          <section className="flex flex-col gap-3">
            <RegistrationSearch initialQuery={q} />

            {query ? (
              <div className="border-border bg-surface overflow-hidden rounded-xl border">
                {results.length > 0 ? (
                  <ul>
                    {results.map(({ latest, regs: rs }) => {
                      const current = currentEvent
                        ? rs.find((r) => r.event_id === currentEvent.id)
                        : undefined;
                      return (
                        <li
                          key={latest.key}
                          className="border-border flex flex-wrap items-center justify-between gap-4 border-t px-4 py-3 first:border-t-0"
                        >
                          <div className="min-w-0">
                            <p className="font-sans text-sm font-medium">{latest.name}</p>
                            <p className="text-ink-secondary font-sans text-sm">
                              {latest.phone}
                              {latest.email ? ` · ${latest.email}` : ""}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {rs.map((r) => (
                                <Badge key={r.id} variant={r.attended ? "berry" : "outline"}>
                                  {eventTitle.get(r.event_id) ?? "Evento"}
                                  {r.attended ? " · asistió" : ""}
                                  {r.status === "cancelled" ? " · cancelado" : ""}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          {currentEvent ? (
                            <div className="flex flex-col items-end gap-1">
                              <p className="text-ink-tertiary font-sans text-xs">
                                {currentEvent.title}
                              </p>
                              {current ? (
                                <AttendanceButton
                                  action={setAttendance.bind(null, current.id, !current.attended)}
                                  attended={current.attended}
                                />
                              ) : (
                                <form
                                  action={enrollExisting.bind(null, currentEvent.id, {
                                    name: latest.name,
                                    phone: latest.phone,
                                    email: null,
                                    wantsWhatsapp: latest.wants_whatsapp,
                                  })}
                                >
                                  <Button type="submit" size="sm" variant="secondary">
                                    Inscribir y marcar asistencia
                                  </Button>
                                </form>
                              )}
                            </div>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-ink-secondary px-4 py-6 font-sans text-sm">
                    No encontramos a nadie con “{q}”. Puedes inscribirla abajo como nueva.
                  </p>
                )}
              </div>
            ) : null}
          </section>

          {currentEvent ? (
            <section className="border-border bg-surface rounded-xl border p-5">
              <h2 className="font-display text-xl font-medium">Inscribir a quien llega</h2>
              <p className="text-ink-secondary mt-1 mb-4 font-sans text-sm">
                Se inscribe en “{currentEvent.title}” y se marca su asistencia.
              </p>
              <WalkInForm action={addWalkIn.bind(null, currentEvent.id)} />
            </section>
          ) : null}

          <div className="flex flex-col gap-4">
            {events.map((event) => {
              const list = regs
                .filter((r) => r.event_id === event.id)
                .sort((a, b) => b.created_at.localeCompare(a.created_at));
              const confirmed = list.filter((r) => r.status === "confirmed");
              const attendedCount = confirmed.filter((r) => r.attended).length;

              return (
                <details
                  key={event.id}
                  open={event.id === currentEvent?.id}
                  className="border-border bg-surface group overflow-hidden rounded-xl border"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4">
                    <div>
                      <h2 className="font-display text-xl font-medium">{event.title}</h2>
                      <p className="text-ink-secondary font-sans text-sm">
                        {formatEventDate(event.event_date)} · {confirmed.length} registradas ·{" "}
                        {attendedCount} asistieron
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {event.id === currentEvent?.id ? <Badge variant="berry">Actual</Badge> : null}
                      <ChevronDown
                        className="text-ink-tertiary h-5 w-5 transition-transform group-open:rotate-180"
                        strokeWidth={1.5}
                      />
                    </div>
                  </summary>

                  {list.length > 0 ? (
                    <div className="border-border overflow-x-auto border-t">
                      <table className="w-full text-left font-sans text-sm">
                        <thead className="bg-surface-secondary text-ink-secondary">
                          <tr>
                            <th className="px-4 py-3 font-medium">Nombre</th>
                            <th className="px-4 py-3 font-medium">Teléfono</th>
                            <th className="px-4 py-3 font-medium">Correo</th>
                            <th className="px-4 py-3 font-medium">WhatsApp</th>
                            <th className="px-4 py-3 font-medium">Estado</th>
                            <th className="px-4 py-3 font-medium">Fecha</th>
                            <th className="px-4 py-3 font-medium">Asistencia</th>
                            <th className="px-4 py-3" />
                          </tr>
                        </thead>
                        <tbody>
                          {list.map((r) => {
                            const prior = priorEvents(r);
                            return (
                              <tr key={r.id} className="border-border border-t">
                                <td className="px-4 py-3">
                                  <div className="flex flex-wrap items-center gap-2">
                                    {r.name}
                                    {prior > 0 ? (
                                      <Badge variant="blush">
                                        Ya vino antes{prior > 1 ? ` · ${prior} eventos` : ""}
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline">Nueva</Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="text-ink-secondary px-4 py-3">{r.phone}</td>
                                <td className="text-ink-secondary px-4 py-3">{r.email || "—"}</td>
                                <td className="px-4 py-3">
                                  {r.wants_whatsapp ? <Badge variant="berry">Sí</Badge> : "—"}
                                </td>
                                <td className="px-4 py-3">
                                  <Badge variant={r.status === "confirmed" ? "berry" : "neutral"}>
                                    {r.status === "confirmed" ? "Confirmado" : "Cancelado"}
                                  </Badge>
                                </td>
                                <td className="text-ink-secondary px-4 py-3">
                                  {formatDate(r.created_at)}
                                </td>
                                <td className="px-4 py-3">
                                  {r.status === "confirmed" ? (
                                    <AttendanceButton
                                      action={setAttendance.bind(null, r.id, !r.attended)}
                                      attended={r.attended}
                                    />
                                  ) : (
                                    "—"
                                  )}
                                </td>
                                <td className="px-4 py-3">
                                  {r.status === "confirmed" ? (
                                    <div className="flex justify-end">
                                      <CancelRegistrationButton
                                        action={cancelRegistration.bind(null, r.id)}
                                      />
                                    </div>
                                  ) : null}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-ink-secondary border-border border-t px-5 py-6 font-sans text-sm">
                      Aún no hay registros para este encuentro.
                    </p>
                  )}
                </details>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
