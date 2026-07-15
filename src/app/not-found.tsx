import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="bg-surface text-ink flex min-h-screen flex-col items-center justify-center px-6 text-center font-sans">
      <p className="text-berry text-sm font-medium tracking-wide uppercase">404</p>
      <h1 className="font-display mt-2 text-4xl font-medium">No encontramos esta página</h1>
      <Link
        href="/"
        className="bg-berry text-cream rounded-pill mt-8 px-8 py-3 text-sm font-medium"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
