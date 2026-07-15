import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaqForm } from "@/components/admin/FaqForm";
import { createClient } from "@/lib/supabase/server";
import { updateFaq } from "../actions";

export const metadata: Metadata = { title: "Editar pregunta" };

interface EditarFaqPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarFaqPage({ params }: EditarFaqPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: faq } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();

  if (!faq) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Editar pregunta</h1>
      <div className="mt-6">
        <FaqForm
          action={updateFaq.bind(null, faq.id)}
          submitLabel="Guardar cambios"
          initialValues={{
            question: faq.question,
            answer: faq.answer,
            sortOrder: faq.sort_order,
            status: faq.status,
          }}
        />
      </div>
    </div>
  );
}
