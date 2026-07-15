"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface FaqFormState {
  status: "idle" | "error";
  message?: string;
}

function parseForm(formData: FormData) {
  return {
    question: String(formData.get("question") ?? "").trim(),
    answer: String(formData.get("answer") ?? "").trim(),
    sort_order: Number(formData.get("sort_order") ?? 0),
    status: String(formData.get("status") ?? "draft"),
  };
}

export async function createFaq(
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  const values = parseForm(formData);
  if (!values.question || !values.answer) {
    return { status: "error", message: "Pregunta y respuesta son obligatorias." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").insert(values);
  if (error) return { status: "error", message: `No se pudo crear: ${error.message}` };

  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function updateFaq(
  id: string,
  _prevState: FaqFormState,
  formData: FormData,
): Promise<FaqFormState> {
  const values = parseForm(formData);
  if (!values.question || !values.answer) {
    return { status: "error", message: "Pregunta y respuesta son obligatorias." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").update(values).eq("id", id);
  if (error) return { status: "error", message: `No se pudo guardar: ${error.message}` };

  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}

export async function deleteFaq(id: string) {
  const supabase = await createClient();
  await supabase.from("faqs").delete().eq("id", id);
  revalidatePath("/admin/faq");
  revalidatePath("/");
  redirect("/admin/faq");
}
