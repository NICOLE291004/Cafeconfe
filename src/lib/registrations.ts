/** Últimos 10 dígitos — "662 123 4567", "+52 662-123-4567" y "6621234567" son la misma persona. */
export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-10);
}

/** Minúsculas y sin acentos, para buscar sin importar cómo se escribió. */
export function normalizeText(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

/** Identifica a una persona entre eventos: por teléfono, o por nombre si no dio uno válido. */
export function personKey(name: string, phone: string): string {
  const digits = normalizePhone(phone);
  return digits.length >= 7 ? `tel:${digits}` : `nom:${normalizeText(name)}`;
}

/**
 * Evento "actual": el próximo que viene (con 12 h de margen para el día del encuentro);
 * si ya no hay próximos, el más reciente. `events` viene ordenado del más nuevo al más viejo.
 */
export function pickCurrentEvent<T extends { event_date: string }>(events: T[]): T | null {
  const cutoff = Date.now() - 12 * 60 * 60 * 1000;
  const upcoming = events.filter((e) => new Date(e.event_date).getTime() >= cutoff);
  return upcoming.length > 0 ? upcoming[upcoming.length - 1] : (events[0] ?? null);
}
