import type { Metadata } from "next";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export const metadata: Metadata = { title: "Nuevo testimonio" };

export default function NuevoTestimonioPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Nuevo testimonio</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} submitLabel="Crear testimonio" />
      </div>
    </div>
  );
}
