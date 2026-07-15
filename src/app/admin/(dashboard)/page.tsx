import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = await createClient();

  const [events, registrations, products, upcoming] = await Promise.all([
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("registrations").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase
      .from("events")
      .select("title, event_date")
      .eq("status", "published")
      .gte("event_date", new Date().toISOString())
      .order("event_date", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);

  return {
    eventsCount: events.count ?? 0,
    registrationsCount: registrations.count ?? 0,
    productsCount: products.count ?? 0,
    nextEvent: upcoming.data,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Eventos totales", value: stats.eventsCount },
    { label: "Registros totales", value: stats.registrationsCount },
    { label: "Productos totales", value: stats.productsCount },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Dashboard</h1>
      <p className="text-ink-secondary mt-1 font-sans text-sm">Resumen general de Café con Fe.</p>

      <div className="gap-content-gap mt-8 grid grid-cols-1 sm:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="text-ink-tertiary font-sans text-sm">{card.label}</p>
            <p className="font-display mt-2 text-4xl font-medium">{card.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <p className="text-ink-tertiary font-sans text-sm">Próximo encuentro</p>
        {stats.nextEvent ? (
          <>
            <p className="font-display mt-2 text-2xl font-medium">{stats.nextEvent.title}</p>
            <p className="text-ink-secondary mt-1 font-sans text-sm">
              {new Intl.DateTimeFormat("es-MX", {
                dateStyle: "long",
                timeStyle: "short",
                timeZone: "America/Hermosillo",
              }).format(new Date(stats.nextEvent.event_date))}
            </p>
          </>
        ) : (
          <p className="text-ink-secondary mt-2 font-sans text-sm">
            No hay encuentros publicados con fecha futura.
          </p>
        )}
      </Card>
    </div>
  );
}
