import { createClient } from "@/lib/supabase/server";
import type { EventRow } from "@/lib/supabase/types";

/** Misma forma que consumen EventCard / la página de detalle. */
export interface EventDisplay {
  slug: string;
  title: string;
  date: string;
  dateIso: string;
  location: string;
  price: string;
  priceCents: number;
  description: string;
  eventId: string;
  imageUrl: string | null;
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

function toDisplay(event: EventRow): EventDisplay {
  return {
    slug: event.slug,
    title: event.title,
    date: formatEventDate(event.event_date),
    dateIso: event.event_date,
    location: event.location,
    price: formatPrice(event.price_cents),
    priceCents: event.price_cents,
    description: event.description,
    eventId: event.id,
    imageUrl: event.image_url,
  };
}

/** Solo encuentros que todavía no pasan — lo que se muestra como "próximos". */
export async function getPublishedEvents(): Promise<EventDisplay[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .gte("event_date", new Date().toISOString())
      .order("event_date", { ascending: true });

    if (error || !data) {
      console.error("getPublishedEvents:", error?.message);
      return [];
    }

    return data.map(toDisplay);
  } catch (err) {
    if (isNextDynamicUsageError(err)) throw err;
    console.error("getPublishedEvents:", err);
    return [];
  }
}

/** Encuentros que ya pasaron — prueba social ("ya van N encuentros"), no un listado activo. */
export async function getPastEvents(): Promise<EventDisplay[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("status", "published")
      .lt("event_date", new Date().toISOString())
      .order("event_date", { ascending: false });

    if (error || !data) {
      console.error("getPastEvents:", error?.message);
      return [];
    }

    return data.map(toDisplay);
  } catch (err) {
    if (isNextDynamicUsageError(err)) throw err;
    console.error("getPastEvents:", err);
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

    return toDisplay(data);
  } catch (err) {
    if (isNextDynamicUsageError(err)) throw err;
    console.error("getEventBySlug:", err);
    return null;
  }
}
