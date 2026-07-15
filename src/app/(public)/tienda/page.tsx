import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { getPublishedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Productos de Café con Fe para llevar la calidez de los encuentros a casa.",
};

export default async function TiendaPage() {
  const products = await getPublishedProducts();

  return (
    <main className="max-w-content px-container-x py-section-y-lg mx-auto">
      <Reveal>
        <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">Tienda</p>
        <h1 className="font-display mt-2 text-4xl font-medium sm:text-5xl">
          Un poco de Café con Fe para casa
        </h1>
        <p className="text-ink-secondary max-w-reading mt-4 font-sans text-base leading-relaxed">
          Piezas pensadas para extender la calidez del encuentro más allá del café — hechas en pocas
          cantidades, con intención.
        </p>
      </Reveal>

      {products.length > 0 ? (
        <div className="gap-content-gap mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-12">
          <EmptyState
            title="Aún no hay productos"
            description="Estamos preparando la primera colección — vuelve pronto."
          />
        </div>
      )}
    </main>
  );
}
