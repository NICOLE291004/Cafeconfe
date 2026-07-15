"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SettingsFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function updateSiteSettings(
  _prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const whatsapp_url = String(formData.get("whatsapp_url") ?? "").trim();
  const instagram_url = String(formData.get("instagram_url") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_settings")
    .update({ whatsapp_url, instagram_url, email, phone, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) {
    return { status: "error", message: `No se pudo guardar: ${error.message}` };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Configuración guardada." };
}
