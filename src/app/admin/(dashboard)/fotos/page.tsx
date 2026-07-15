import type { Metadata } from "next";
import { SiteImagesForm } from "@/components/admin/SiteImagesForm";
import { getSiteImages } from "@/lib/site-images";

export const metadata: Metadata = { title: "Fotos del sitio" };

export default async function FotosPage() {
  const images = await getSiteImages();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Fotos del sitio</h1>
      <p className="text-ink-secondary mt-1 font-sans text-sm">
        Estas fotos aparecen en el Home y en Comunidad. Mientras no subas una, se muestra un
        marcador de posición — no se rompe nada.
      </p>
      <div className="mt-6">
        <SiteImagesForm images={images} />
      </div>
    </div>
  );
}
