"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function markPrayerRequestAttended(id: string) {
  const supabase = await createClient();
  await supabase.from("prayer_requests").update({ status: "atendida" }).eq("id", id);
  revalidatePath("/admin/peticiones");
}
