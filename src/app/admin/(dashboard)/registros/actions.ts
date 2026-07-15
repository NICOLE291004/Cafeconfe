"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function cancelRegistration(id: string) {
  const supabase = await createClient();
  await supabase.from("registrations").update({ status: "cancelled" }).eq("id", id);
  revalidatePath("/admin/registros");
  revalidatePath("/eventos");
}
