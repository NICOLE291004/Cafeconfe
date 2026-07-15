import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  logoUrl?: string | null;
}

/**
 * Si hay un logo subido desde /admin/fotos, se usa esa imagen tal cual
 * (se asume que ya incluye el nombre si hace falta). Si no, cae en la
 * marca por defecto: un anillo cálido (dorado) con un corazón (berry)
 * al centro — comunidad y cercanía, sin iconografía religiosa literal.
 */
export function Logo({ className, markClassName, showWordmark = true, logoUrl }: LogoProps) {
  if (logoUrl) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <Image
          src={logoUrl}
          alt="Un Café con Fe"
          width={160}
          height={40}
          className="h-8 w-auto object-contain"
          priority
        />
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className={cn("h-7 w-7 shrink-0", markClassName)} aria-hidden="true">
        <circle cx="16" cy="16" r="14" fill="none" stroke="#C9A15A" strokeWidth="1.75" />
        <path
          d="M16 21.5c-4.2-2.6-6.3-5.3-6.3-7.9a3.15 3.15 0 0 1 6.3-1.05 3.15 3.15 0 0 1 6.3 1.05c0 2.6-2.1 5.3-6.3 7.9Z"
          fill="#A4405A"
        />
      </svg>
      {showWordmark ? (
        <span className="font-display text-ink text-xl font-medium">Un Café con Fe</span>
      ) : null}
    </span>
  );
}
