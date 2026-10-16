"use server";

import { createClient } from "@/lib/supabase/server";

export interface PrayerRequestState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitPrayerRequest(
  _prevState: PrayerRequestState,
  formData: FormData,
): Promise<PrayerRequestState> {
  const request = String(formData.get("request") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const wantsCall = formData.get("wants_call") === "on";

  if (!request) {
    return { status: "error", message: "Cuéntanos tu petición antes de enviar." };
  }

  if (!phone) {
    return { status: "error", message: "Déjanos un teléfono para poder contactarte." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("prayer_requests").insert({
    request,
    name: name || null,
    phone,
    wants_call: wantsCall,
  });

  if (error) {
    return { status: "error", message: "No pudimos guardar tu petición. Intenta de nuevo." };
  }

  return { status: "success" };
}
