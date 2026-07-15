import { createPublicClient } from "@/lib/supabase/public";

export interface TestimonialDisplay {
  name: string;
  quote: string;
}

export async function getPublishedTestimonials(): Promise<TestimonialDisplay[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("name, quote")
      .eq("status", "published")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}
