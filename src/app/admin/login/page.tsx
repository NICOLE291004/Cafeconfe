import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { getSiteImages } from "@/lib/site-images";

export default async function AdminLoginPage() {
  const images = await getSiteImages();

  return (
    <main className="bg-surface-secondary px-container-x flex min-h-screen items-center justify-center">
      <div className="border-border bg-surface w-full max-w-sm rounded-xl border p-8 shadow-md">
        <Logo logoUrl={images.logo} />
        <p className="text-ink-secondary mt-1 font-sans text-sm">Panel de administración</p>
        <LoginForm />
      </div>
    </main>
  );
}
