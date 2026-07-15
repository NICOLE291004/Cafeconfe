"use server";

import { createClient } from "@/lib/supabase/server";

export interface RegisterState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function registerForEvent(
  eventId: string,
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || !email) {
    return { status: "error", message: "Nombre y correo son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("registrations").insert({
    event_id: eventId,
    name,
    email,
    phone: phone || null,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        status: "error",
        message: "Ya habías registrado ese correo para este encuentro.",
      };
    }
    return { status: "error", message: "No pudimos guardar tu registro. Intenta de nuevo." };
  }

  return { status: "success", message: "¡Listo! Te esperamos en el próximo encuentro." };
}
