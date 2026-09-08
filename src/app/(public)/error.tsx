"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="max-w-content px-container-x mx-auto flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-error font-sans text-sm font-medium tracking-wide uppercase">
        Algo salió mal
      </p>
      <h1 className="font-display mt-2 text-3xl font-light sm:text-4xl">
        No pudimos cargar esta página
      </h1>
      <p className="text-ink-secondary max-w-reading mt-4 font-sans text-base leading-relaxed">
        Intenta de nuevo en un momento. Si el problema sigue, escríbenos por redes.
      </p>
      <Button size="lg" className="mt-8" onClick={() => reset()}>
        Reintentar
      </Button>
    </main>
  );
}
