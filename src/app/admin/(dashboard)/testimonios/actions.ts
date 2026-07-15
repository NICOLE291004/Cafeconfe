"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface TestimonialFormState {
  status: "idle" | "error";
  message?: string;
}

function parseForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    quote: String(formData.get("quote") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
    status: String(formData.get("status") ?? "draft"),
  };
}

export async function createTestimonial(
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const values = parseForm(formData);
  if (!values.name || !values.quote) {
    return { status: "error", message: "Nombre y testimonio son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert(values);
  if (error) return { status: "error", message: `No se pudo crear: ${error.message}` };

  revalidatePath("/admin/testimonios");
  revalidatePath("/");
  revalidatePath("/comunidad");
  redirect("/admin/testimonios");
}

export async function updateTestimonial(
  id: string,
  _prevState: TestimonialFormState,
  formData: FormData,
): Promise<TestimonialFormState> {
  const values = parseForm(formData);
  if (!values.name || !values.quote) {
    return { status: "error", message: "Nombre y testimonio son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").update(values).eq("id", id);
  if (error) return { status: "error", message: `No se pudo guardar: ${error.message}` };

  revalidatePath("/admin/testimonios");
  revalidatePath("/");
  revalidatePath("/comunidad");
  redirect("/admin/testimonios");
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/admin/testimonios");
  revalidatePath("/");
  revalidatePath("/comunidad");
  redirect("/admin/testimonios");
}
