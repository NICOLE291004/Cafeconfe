import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/motion/Reveal";
import { focusRing, cn } from "@/lib/utils";
import type { SiteSettings } from "@/lib/site-settings";
import type { SiteImages } from "@/lib/site-images";

const inkLink = cn(
  "font-sans text-sm font-medium underline underline-offset-4",
  focusRing,
  "rounded-sm",
);

/**
 * Full bleed, dos columnas iguales (foto + panel oscuro) — tal como la
 * sección "Fundadora" del Figma. Se usa en Home y en Nosotras para no
 * duplicar el layout.
 */
export function FundadoraSection({
  settings,
  images,
  linkToNosotras = false,
}: {
  settings: SiteSettings;
  images: SiteImages;
  linkToNosotras?: boolean;
}) {
  if (!settings.founderBio) return null;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <Reveal>
        <Photo
          src={images.fundadora ?? "/brand/fundadora.png"}
          alt={settings.founderName || "Fundadora de Un Café con Fe"}
          caption="Foto: retrato de la fundadora, luz natural"
          className="aspect-[4/5] rounded-none lg:aspect-auto lg:h-full lg:min-h-[560px]"
        />
      </Reveal>
      <Reveal
        delay={0.1}
        className="bg-espresso flex flex-col justify-center px-8 py-16 sm:px-14 lg:px-16"
      >
        <p className="text-blush font-sans text-xs font-semibold tracking-[0.2em] uppercase">
          Fundadora
        </p>
        <h2 className="font-display text-cream mt-3 text-[42px] leading-[1.05] font-light sm:text-[56px] lg:text-[72px] lg:leading-[1.02]">
          {settings.founderName || "Pendiente de agregar"}
        </h2>
        <p className="text-cream/76 mt-5 max-w-[525px] font-sans text-base leading-relaxed">
          {settings.founderBio}
        </p>
        {linkToNosotras ? (
          <Link href="/nosotras" className={cn(inkLink, "text-cream mt-5 inline-flex")}>
            Conocer más de nosotras
          </Link>
        ) : null}
      </Reveal>
    </section>
  );
}
