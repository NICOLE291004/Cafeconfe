import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Photo } from "@/components/ui/Photo";
import { focusRing, cn } from "@/lib/utils";
import type { ProductDisplay } from "@/lib/products";

export function ProductCard({ product }: { product: ProductDisplay }) {
  return (
    <Link href={`/tienda/${product.slug}`} className={cn("block rounded-xl", focusRing)}>
      <Card interactive className="flex h-full flex-col gap-4 p-4">
        <div className="relative">
          <Photo
            src={product.imageUrl}
            alt={product.name}
            caption={`Foto: ${product.name}`}
            className="aspect-square"
          />
          {!product.inStock ? (
            <Badge variant="neutral" className="absolute top-3 right-3">
              Agotado
            </Badge>
          ) : null}
        </div>
        <div>
          <p className="font-display text-lg font-medium">{product.name}</p>
          <p className="text-ink-secondary mt-1 font-sans text-sm">{product.price}</p>
        </div>
      </Card>
    </Link>
  );
}
