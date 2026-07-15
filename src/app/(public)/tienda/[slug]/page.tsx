import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { buttonVariants } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InstagramIcon } from "@/components/ui/icons";
import { getProductBySlug } from "@/lib/products";

interface ProductoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Café con Fe`,
    description: product.description,
  };
}

export default async function ProductoDetailPage({ params }: ProductoPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-content px-container-x py-section-y-lg mx-auto">
      <Reveal>
        <Link
          href="/tienda"
          className="text-ink-secondary font-sans text-sm underline underline-offset-4"
        >
          ← Toda la tienda
        </Link>
      </Reveal>

      <div className="gap-content-gap mt-6 grid grid-cols-1 items-start lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <PlaceholderImage caption={`Foto: ${product.name}`} className="aspect-square" />
            {!product.inStock ? (
              <Badge variant="neutral" className="absolute top-3 right-3">
                Agotado
              </Badge>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="font-display text-4xl font-medium sm:text-5xl">{product.name}</h1>

          <span className="text-ink-secondary mt-4 flex items-center gap-3 font-sans text-lg">
            <Tag className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            {product.price}
          </span>

          <p className="text-ink-secondary max-w-reading mt-6 font-sans text-base leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8">
            {product.inStock ? (
              <>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: "lg" })}
                >
                  <InstagramIcon className="h-4 w-4" strokeWidth={1.5} />
                  Comprar por Instagram
                </a>
                <p className="text-ink-tertiary max-w-reading mt-3 font-sans text-xs">
                  Escríbenos por Instagram mencionando esta pieza y coordinamos pago y entrega. El
                  carrito y pago en línea llegan más adelante.
                </p>
              </>
            ) : (
              <p className="text-ink-tertiary font-sans text-sm">
                Esta pieza está agotada por ahora — síguenos en redes para saber cuándo vuelve.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
