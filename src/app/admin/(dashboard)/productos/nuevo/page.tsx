import type { Metadata } from "next";
import { ProductForm } from "@/components/admin/ProductForm";
import { createProduct } from "../actions";

export const metadata: Metadata = { title: "Nuevo producto" };

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Nuevo producto</h1>
      <div className="mt-6">
        <ProductForm action={createProduct} submitLabel="Crear producto" />
      </div>
    </div>
  );
}
