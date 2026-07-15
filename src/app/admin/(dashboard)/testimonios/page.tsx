import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createClient } from "@/lib/supabase/server";
import { deleteTestimonial } from "./actions";

export const metadata: Metadata = { title: "Testimonios" };

export default async function AdminTestimoniosPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("id, name, quote, status")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Testimonios</h1>
        <Link href="/admin/testimonios/nuevo" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Nuevo testimonio
        </Link>
      </div>

      {testimonials && testimonials.length > 0 ? (
        <div className="border-border bg-surface mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-secondary text-ink-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Testimonio</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id} className="border-border border-t">
                  <td className="px-4 py-3">{t.name}</td>
                  <td className="text-ink-secondary max-w-xs truncate px-4 py-3">{t.quote}</td>
                  <td className="px-4 py-3">
                    <Badge variant={t.status === "published" ? "berry" : "neutral"}>
                      {t.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/testimonios/${t.id}`}
                        aria-label="Editar"
                        className="text-ink-tertiary hover:text-ink flex h-9 w-9 items-center justify-center rounded-md"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                      <DeleteButton
                        action={deleteTestimonial.bind(null, t.id)}
                        confirmMessage={`¿Eliminar el testimonio de "${t.name}"?`}
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
            title="Aún no hay testimonios"
            description="Agrega el primero para empezar."
          />
        </div>
      )}
    </div>
  );
}
