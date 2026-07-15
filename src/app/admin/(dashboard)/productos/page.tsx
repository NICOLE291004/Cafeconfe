import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct } from "./actions";

export default async function AdminProductosPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name, slug, price_cents, stock, status")
    .order("name", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-medium">Productos</h1>
        <Link href="/admin/productos/nuevo" className={buttonVariants({ size: "sm" })}>
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Nuevo producto
        </Link>
      </div>

      {products && products.length > 0 ? (
        <div className="border-border bg-surface mt-6 overflow-hidden rounded-xl border">
          <table className="w-full text-left font-sans text-sm">
            <thead className="bg-surface-secondary text-ink-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Existencias</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-border border-t">
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="text-ink-secondary px-4 py-3">
                    ${(product.price_cents / 100).toFixed(0)} MXN
                  </td>
                  <td className="px-4 py-3">
                    {product.stock > 0 ? product.stock : <Badge variant="neutral">Agotado</Badge>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={product.status === "published" ? "berry" : "neutral"}>
                      {product.status === "published" ? "Publicado" : "Borrador"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        aria-label="Editar"
                        className="text-ink-tertiary hover:text-ink flex h-9 w-9 items-center justify-center rounded-md"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.5} />
                      </Link>
                      <DeleteButton
                        action={deleteProduct.bind(null, product.id)}
                        confirmMessage={`¿Eliminar "${product.name}"?`}
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
          <EmptyState title="Aún no hay productos" description="Crea el primero para empezar." />
        </div>
      )}
    </div>
  );
}
