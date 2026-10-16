import { createPublicClient } from "@/lib/supabase/public";

export const SITE_IMAGE_KEYS = [
  "logo",
  "comunidad_1",
  "comunidad_2",
  "comunidad_3",
  "comunidad_4",
  "comunidad_5",
  "comunidad_6",
  "fundadora",
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
