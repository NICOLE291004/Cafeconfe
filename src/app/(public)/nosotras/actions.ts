"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface SubmitTestimonialState {
  status: "idle" | "success" | "error";
  message?: string;
}

export async function submitTestimonial(
  _prevState: SubmitTestimonialState,
  formData: FormData,
): Promise<SubmitTestimonialState> {
  const name = String(formData.get("name") ?? "").trim();
  const quote = String(formData.get("quote") ?? "").trim();

  if (!name || !quote) {
    return { status: "error", message: "Tu nombre y tu testimonio son obligatorios." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").insert({
    name,
    quote,
    sort_order: 0,
    status: "draft",
  });

  if (error) {
    return { status: "error", message: "No pudimos guardar tu testimonio. Intenta de nuevo." };
  }

  revalidatePath("/admin/testimonios");
  return { status: "success" };
}
