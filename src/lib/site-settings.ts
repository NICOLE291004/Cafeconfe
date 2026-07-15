import { createPublicClient } from "@/lib/supabase/public";

export interface SiteSettings {
  whatsappUrl: string;
  instagramUrl: string;
  email: string;
  phone: string;
}

const FALLBACK: SiteSettings = {
  whatsappUrl: "",
  instagramUrl: "",
  email: "",
  phone: "",
};

/**
 * Usa el cliente público (sin cookies) a propósito: esta configuración es
 * la misma para cualquier visitante, así que no vale la pena forzar
 * render dinámico en cada página pública solo por leerla (Header/Footer
 * viven en el layout compartido).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("whatsapp_url, instagram_url, email, phone")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return FALLBACK;

    return {
      whatsappUrl: data.whatsapp_url,
      instagramUrl: data.instagram_url,
      email: data.email,
      phone: data.phone,
    };
  } catch {
    return FALLBACK;
  }
}
