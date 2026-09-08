import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  caption: string;
  className?: string;
}

/**
 * Aún no hay fotografía real de la comunidad. En vez de simular una foto,
 * este bloque se declara honestamente como un espacio reservado — con la
 * descripción de qué foto debería ir ahí, para facilitar el reemplazo en
 * cuanto existan assets reales.
 */
export function PlaceholderImage({ caption, className }: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "border-border-strong relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed bg-beige px-6 py-16 text-center",
        className,
      )}
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, var(--color-beige) 0 11px, var(--color-cream) 11px 22px)",
      }}
    >
      <Camera className="text-ink-tertiary h-8 w-8" strokeWidth={1.25} aria-hidden="true" />
      <p className="text-ink-tertiary max-w-reading font-sans text-xs">{caption}</p>
    </div>
  );
}
