import { createClient } from "@/lib/supabase/server";
import type { EventRow } from "@/lib/supabase/types";

/** Misma forma que consumen EventCard / la página de detalle. */
export interface EventDisplay {
  slug: string;
  title: string;
  date: string;
  dateIso: string;
  location: string;
  spotsLeft: number;
  price: string;
  priceCents: number;
  description: string;
  eventId: string;
}

function formatEventDate(iso: string): string {
  const date = new Date(iso);
  const datePart = new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Hermosillo",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("es-MX", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Hermosillo",
  }).format(date);
  return `${datePart} · ${timePart}`;
}

function formatPrice(cents: number): string {
  if (cents === 0) return "Gratis";
  return `$${(cents / 100).toFixed(0)} MXN`;
}

/**
 * Next.js usa una excepción interna (digest DYNAMIC_SERVER_USAGE) para
 * abortar un intento de prerender estático cuando detecta `cookies()`.
 * No es un error real — si la atrapamos aquí sin relanzarla, el log de
 * build se llena de ruido confuso (aunque el fallback a render dinámico
 * de todos modos funciona, porque ya se registró al llamar cookies()).
 */
function isNextDynamicUsageError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    (err as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

async function toDisplay(
  event: EventRow,
  registrationCounts: Map<string, number>,
): Promise<EventDisplay> {
  const confirmed = registrationCounts.get(event.id) ?? 0;
  return {
    slug: event.slug,
    title: event.title,
    date: formatEventDate(event.event_date),
    dateIso: event.event_date,
    location: event.location,
    spotsLeft: Math.max(event.capacity - confirmed, 0),
    price: formatPrice(event.price_cents),
    priceCents: event.price_cents,
    description: event.description,
    eventId: event.id,
  };
}

async function getRegistrationCounts(eventIds: string[]): Promise<Map<string, number>> {
  if (eventIds.length === 0) return new Map();
  const supabase = await createClient();
  const { data } = await supabase
    .from("registrations")
    .select("event_id")
    .eq("status", "confirmed")
    .in("event_id", eventIds);

  const counts = new Map<string, number>();
  for (const row of data ?? []) {
    counts.set(row.event_id, (counts.get(row.event_id) ?? 0) + 1);
  }
  return counts;
}

export async function getPublishedEvents(): Promise<EventDisplay[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .order("event_date", { ascending: true });

    if (error || !data) {
      console.error("getPublishedEvents:", error?.message);
      return [];
    }

    const counts = await getRegistrationCounts(data.map((e) => e.id));
    return Promise.all(data.map((event) => toDisplay(event, counts)));
  } catch (err) {
    if (isNextDynamicUsageError(err)) throw err;
    console.error("getPublishedEvents:", err);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventDisplay | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;

    const counts = await getRegistrationCounts([data.id]);
    return toDisplay(data, counts);
  } catch (err) {
    if (isNextDynamicUsageError(err)) throw err;
    console.error("getEventBySlug:", err);
    return null;
  }
}
