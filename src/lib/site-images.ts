import { createPublicClient } from "@/lib/supabase/public";

export const SITE_IMAGE_KEYS = [
  "logo",
  "hero",
  "historia",
  "mosaico_1",
  "mosaico_2",
  "mosaico_3",
  "mosaico_4",
  "comunidad_1",
  "comunidad_2",
  "comunidad_3",
] as const;

export type SiteImageKey = (typeof SITE_IMAGE_KEYS)[number];

export type SiteImages = Record<SiteImageKey, string | null>;

const EMPTY: SiteImages = Object.fromEntries(SITE_IMAGE_KEYS.map((k) => [k, null])) as SiteImages;

export async function getSiteImages(): Promise<SiteImages> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("site_images").select("key, url");

    if (error || !data) return EMPTY;

    const images = { ...EMPTY };
    for (const row of data) {
      if (SITE_IMAGE_KEYS.includes(row.key as SiteImageKey)) {
        images[row.key as SiteImageKey] = row.url || null;
      }
    }
    return images;
  } catch {
    return EMPTY;
  }
}
