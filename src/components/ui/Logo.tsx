import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  logoUrl?: string | null;
}

/** Logo por defecto de la marca (el mismo lockup usado en el diseño de referencia). */
const DEFAULT_LOGO = "/brand/logo-cafe-con-fe.png";

/**
 * Si hay un logo subido desde /admin/fotos, se usa esa imagen tal cual.
 * Si no, cae en el lockup oficial de la marca en vez de un ícono genérico.
 */
export function Logo({ className, logoUrl }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={logoUrl || DEFAULT_LOGO}
        alt="Un Café con Fe"
        width={60}
        height={40}
        className="h-10 w-auto object-contain"
        priority
      />
    </span>
  );
}
