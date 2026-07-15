import type { Metadata } from "next";
import { FaqForm } from "@/components/admin/FaqForm";
import { createFaq } from "../actions";

export const metadata: Metadata = { title: "Nueva pregunta" };

export default function NuevaFaqPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Nueva pregunta frecuente</h1>
      <div className="mt-6">
        <FaqForm action={createFaq} submitLabel="Crear pregunta" />
      </div>
    </div>
  );
}
