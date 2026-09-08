import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="max-w-content px-container-x mx-auto flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="text-berry font-sans text-sm font-medium tracking-wide uppercase">404</p>
      <h1 className="font-display mt-2 text-4xl font-light sm:text-5xl">
        No encontramos esta página
      </h1>
      <p className="text-ink-secondary max-w-reading mt-4 font-sans text-base leading-relaxed">
        Puede que el enlace haya cambiado o que el encuentro/producto ya no esté disponible.
      </p>
      <Link href="/" className={`${buttonVariants({ size: "lg" })} mt-8`}>
        Volver al inicio
      </Link>
    </main>
  );
}
