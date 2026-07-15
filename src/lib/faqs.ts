import { createPublicClient } from "@/lib/supabase/public";

export interface FaqDisplay {
  question: string;
  answer: string;
}

export async function getPublishedFaqs(): Promise<FaqDisplay[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("question, answer")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}
