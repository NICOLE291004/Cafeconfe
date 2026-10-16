"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { normalizePhone } from "@/lib/registrations";

export interface WalkInState {
  status: "idle" | "success" | "error";
  message?: string;
}

function refresh() {
  revalidatePath("/admin/registros");
  revalidatePath("/eventos");
}

export async function cancelRegistration(id: string) {
  const supabase = await createClient();
  await supabase.from("registrations").update({ status: "cancelled" }).eq("id", id);
  refresh();
}

export async function setAttendance(id: string, attended: boolean) {
  const supabase = await createClient();
  await supabase.from("registrations").update({ attended }).eq("id", id);
  refresh();
}

/**
 * Inscribe en el evento a alguien que llegó sin registro y marca su asistencia.
 * Si ya estaba registrada (o cancelada) en ese evento, solo la reactiva y marca asistencia.
 */
export async function addWalkIn(
  eventId: string,
  _prev: WalkInState,
  formData: FormData,
): Promise<WalkInState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!name || !phone) {
    return { status: "error", message: "Nombre y teléfono son obligatorios." };
  }

  const supabase = await createClient();
  const digits = normalizePhone(phone);

  const { data: existing } = await supabase
    .from("registrations")
    .select("id, phone")
    .eq("event_id", eventId);
  const match =
    digits.length >= 7 ? (existing ?? []).find((r) => normalizePhone(r.phone) === digits) : null;

  if (match) {
    await supabase
      .from("registrations")
      .update({ status: "confirmed", attended: true })
      .eq("id", match.id);
    refresh();
    return { status: "success", message: `${name} ya estaba registrada — se marcó su asistencia.` };
  }

  const { error } = await supabase.from("registrations").insert({
    event_id: eventId,
    name,
    phone,
    email: email || null,
    attended: true,
  });

  if (error) {
    return {
      status: "error",
      message:
        error.code === "23505"
          ? "Ese correo ya está registrado en este encuentro."
          : "No se pudo inscribir. Intenta de nuevo.",
    };
  }

  refresh();
  return { status: "success", message: `${name} quedó inscrita y con asistencia marcada.` };
}

/** Inscribe a una mujer que ya existe en otro evento, copiando sus datos, y marca asistencia. */
export async function enrollExisting(
  eventId: string,
  person: { name: string; phone: string; email: string | null; wantsWhatsapp: boolean },
) {
  const supabase = await createClient();
  await supabase.from("registrations").insert({
    event_id: eventId,
    name: person.name,
    phone: person.phone,
    email: person.email,
    wants_whatsapp: person.wantsWhatsapp,
    attended: true,
  });
  refresh();
}
