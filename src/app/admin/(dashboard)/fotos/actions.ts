"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { SITE_IMAGE_KEYS } from "@/lib/site-images";

export interface SiteImagesFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function updateSiteImages(
  _prevState: SiteImagesFormState,
  formData: FormData,
): Promise<SiteImagesFormState> {
  const supabase = await createClient();

  const rows = SITE_IMAGE_KEYS.map((key) => ({
    key,
    url: String(formData.get(key) ?? "").trim(),
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase.from("site_images").upsert(rows, { onConflict: "key" });

  if (error) {
    return { status: "error", message: `No se pudo guardar: ${error.message}` };
  }

  revalidatePath("/", "layout");
  return { status: "success", message: "Fotos guardadas." };
}
