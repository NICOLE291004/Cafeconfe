import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createClient } from "@/lib/supabase/server";
import { updateTestimonial } from "../actions";

export const metadata: Metadata = { title: "Editar testimonio" };

interface EditarTestimonioPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarTestimonioPage({ params }: EditarTestimonioPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!testimonial) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Editar testimonio</h1>
      <div className="mt-6">
        <TestimonialForm
          action={updateTestimonial.bind(null, testimonial.id)}
          submitLabel="Guardar cambios"
          initialValues={{
            name: testimonial.name,
            quote: testimonial.quote,
            sortOrder: testimonial.sort_order,
            status: testimonial.status,
          }}
        />
      </div>
    </div>
  );
}
