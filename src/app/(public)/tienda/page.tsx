import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/sections/ProductCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LaceRibbon } from "@/components/decor/LaceRibbon";
import { getPublishedProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Productos de Un Café con Fe para llevar la calidez de los encuentros a casa.",
};

export default async function TiendaPage() {
  const products = await getPublishedProducts();

  return (
    <main>
      <section className="bg-surface-secondary">
        <div className="max-w-content px-container-x py-section-y mx-auto text-center">
          <Reveal>
            <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">
              Tienda
            </p>
            <h1 className="reveal-write font-display mt-2 text-4xl font-light sm:text-5xl">
              Un poco de Café con Fe para casa
            </h1>
            <p className="text-ink-secondary max-w-reading mx-auto mt-4 font-sans text-base leading-relaxed">
              Piezas pensadas para extender la calidez del encuentro más allá del café — hechas en
              pocas cantidades, con intención.
            </p>
          </Reveal>
        </div>
        <LaceRibbon variant="bottom" background="#f3e7db" notch="#faf3ec" />
      </section>

      <div className="max-w-content px-container-x py-section-y mx-auto">
        {products.length > 0 ? (
          <div className="gap-content-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.08}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aún no hay productos"
            description="Estamos preparando la primera colección — vuelve pronto."
          />
        )}
      </div>
    </main>
  );
}
