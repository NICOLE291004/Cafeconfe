/** Espejo de src/../supabase/schema.sql — mantener sincronizados a mano. */

export interface EventRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  price_cents: number;
  capacity: number;
  image_url: string | null;
  status: "draft" | "published" | "cancelled";
  created_at: string;
}

export interface RegistrationRow {
  id: string;
  event_id: string;
  name: string;
  email: string | null;
  phone: string;
  wants_whatsapp: boolean;
  attended: boolean;
  status: "confirmed" | "cancelled";
  created_at: string;
}

export interface PrayerRequestRow {
  id: string;
  request: string;
  name: string | null;
  phone: string;
  wants_call: boolean;
  status: "pendiente" | "atendida";
  created_at: string;
}

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_cents: number;
  image_url: string | null;
  stock: number;
  status: "draft" | "published";
  created_at: string;
}
