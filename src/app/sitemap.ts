import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient();

  const [{ data: events }, { data: products }] = await Promise.all([
    supabase.from("events").select("slug").eq("status", "published"),
    supabase.from("products").select("slug").eq("status", "published"),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/eventos`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/tienda`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/comunidad`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const eventRoutes: MetadataRoute.Sitemap = (events ?? []).map((event) => ({
    url: `${SITE_URL}/eventos/${event.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = (products ?? []).map((product) => ({
    url: `${SITE_URL}/tienda/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...eventRoutes, ...productRoutes];
}
