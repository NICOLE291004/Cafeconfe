"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface EventFormState {
  status: "idle" | "error";
  message?: string;
}

function toTimestamptz(localDateTime: string): string {
  // Hermosillo no observa horario de verano: UTC-7 todo el año.
  return `${localDateTime}:00-07:00`;
}

function parseEventForm(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "");
  const location = String(formData.get("location") ?? "").trim();
  const priceMxn = Number(formData.get("price_mxn") ?? 0);
  const capacity = Number(formData.get("capacity") ?? 0);
  const status = String(formData.get("status") ?? "draft");
  const imageUrl = String(formData.get("image_url") ?? "").trim();

  return {
    title,
    slug,
    description,
    event_date: toTimestamptz(eventDate),
    location,
    price_cents: Math.round(priceMxn * 100),
    capacity,
    status,
    image_url: imageUrl || null,
  };
}

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const values = parseEventForm(formData);

  if (!values.title || !values.slug || !formData.get("event_date")) {
    return { status: "error", message: "Título, slug y fecha son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("events").insert(values);

  if (error) {
    return { status: "error", message: `No se pudo crear: ${error.message}` };
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  redirect("/admin/eventos");
}

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const values = parseEventForm(formData);

  if (!values.title || !values.slug || !formData.get("event_date")) {
    return { status: "error", message: "Título, slug y fecha son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("events").update(values).eq("id", id);

  if (error) {
    return { status: "error", message: `No se pudo guardar: ${error.message}` };
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  redirect("/admin/eventos");
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  redirect("/admin/eventos");
}
