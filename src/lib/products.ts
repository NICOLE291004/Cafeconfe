import { createClient } from "@/lib/supabase/server";

export interface ProductDisplay {
  slug: string;
  name: string;
  description: string;
  price: string;
  inStock: boolean;
  stock: number;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)} MXN`;
}

function isNextDynamicUsageError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "digest" in err &&
    (err as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE"
  );
}

export async function getPublishedProducts(): Promise<ProductDisplay[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("status", "published")
      .order("name", { ascending: true });

    if (error || !data) {
      console.error("getPublishedProducts:", error?.message);
      return [];
    }

    return data.map((product) => ({
      slug: product.slug,
      name: product.name,
      description: product.description,
      price: formatPrice(product.price_cents),
      inStock: product.stock > 0,
      stock: product.stock,
    }));
  } catch (err) {
    if (isNextDynamicUsageError(err)) throw err;
    console.error("getPublishedProducts:", err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<ProductDisplay | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) return null;

    return {
      slug: data.slug,
      name: data.name,
      description: data.description,
      price: formatPrice(data.price_cents),
      inStock: data.stock > 0,
      stock: data.stock,
    };
  } catch (err) {
    if (isNextDynamicUsageError(err)) throw err;
    console.error("getProductBySlug:", err);
    return null;
  }
}
