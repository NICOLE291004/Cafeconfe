import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createClient } from "@/lib/supabase/server";
import { deleteFaq } from "./actions";

export const metadata: Metadata = { title: "Preguntas frecuentes" };

export default async function AdminFaqPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from("faqs")
    .select("id, question, status")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Preguntas frecuentes</h1>
        <Link href="/admin/faq/nuevo" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Nueva pregunta
        </Link>
      </div>

      {faqs && faqs.length > 0 ? (
        <div className="border-border bg-surface mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-secondary text-ink-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Pregunta</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq) => (
                <tr key={faq.id} className="border-border border-t">
                  <td className="px-4 py-3">{faq.question}</td>
                  <td className="px-4 py-3">
                    <Badge variant={faq.status === "published" ? "berry" : "neutral"}>
                      {faq.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/faq/${faq.id}`}
                        aria-label="Editar"
                        className="text-ink-tertiary hover:text-ink flex h-9 w-9 items-center justify-center rounded-md"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                      <DeleteButton
                        action={deleteFaq.bind(null, faq.id)}
                        confirmMessage={`¿Eliminar la pregunta "${faq.question}"?`}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="Aún no hay preguntas frecuentes"
            description="Agrega la primera para empezar."
          />
        </div>
      )}
    </div>
  );
}
