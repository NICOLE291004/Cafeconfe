import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { createClient } from "@/lib/supabase/server";
import { updateProduct } from "../actions";

export const metadata: Metadata = { title: "Editar producto" };

interface EditarProductoPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarProductoPage({ params }: EditarProductoPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Editar producto</h1>
      <div className="mt-6">
        <ProductForm
          action={updateProduct.bind(null, product.id)}
          submitLabel="Guardar cambios"
          initialValues={{
            name: product.name,
            slug: product.slug,
            description: product.description,
            priceMxn: product.price_cents / 100,
            stock: product.stock,
            status: product.status,
          }}
        />
      </div>
    </div>
  );
}
