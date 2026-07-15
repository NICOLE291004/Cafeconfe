"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface ProductFormState {
  status: "idle" | "error";
  message?: string;
}

function parseProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceMxn = Number(formData.get("price_mxn") ?? 0);
  const stock = Number(formData.get("stock") ?? 0);
  const status = String(formData.get("status") ?? "draft");

  return {
    name,
    slug,
    description,
    price_cents: Math.round(priceMxn * 100),
    stock,
    status,
  };
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const values = parseProductForm(formData);

  if (!values.name || !values.slug) {
    return { status: "error", message: "Nombre y slug son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("products").insert(values);

  if (error) {
    return { status: "error", message: `No se pudo crear: ${error.message}` };
  }

  revalidatePath("/admin/productos");
  revalidatePath("/tienda");
  redirect("/admin/productos");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const values = parseProductForm(formData);

  if (!values.name || !values.slug) {
    return { status: "error", message: "Nombre y slug son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("products").update(values).eq("id", id);

  if (error) {
    return { status: "error", message: `No se pudo guardar: ${error.message}` };
  }

  revalidatePath("/admin/productos");
  revalidatePath("/tienda");
  redirect("/admin/productos");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/productos");
  revalidatePath("/tienda");
  redirect("/admin/productos");
}
