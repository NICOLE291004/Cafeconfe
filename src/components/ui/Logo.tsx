import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  logoUrl?: string | null;
  onDark?: boolean;
  /** Arte de marca a usar si no hay logo subido desde /admin/fotos. */
  defaultSrc?: string;
  width?: number;
  height?: number;
  invertOnDark?: boolean;
}

/**
 * Si hay un logo subido desde /admin/fotos, se usa esa imagen tal cual
 * (tiene prioridad). Si no, cae en el arte de marca fijo que corresponde
 * a este lugar (header/footer tienen piezas distintas).
 */
export function Logo({
  className,
  logoUrl,
  onDark = false,
  defaultSrc,
  width = 160,
  height = 107,
  invertOnDark = false,
}: LogoProps) {
  const src = logoUrl ?? defaultSrc;

  if (!src) return null;

  return (
    <Image
      src={src}
      alt="Un Café con Fe"
      width={width}
      height={height}
      className={cn(
        "h-11 w-auto object-contain",
        onDark && invertOnDark && "brightness-0 invert",
        className,
      )}
      priority
    />
  );
}
