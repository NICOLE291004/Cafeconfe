import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { Logo } from "@/components/ui/Logo";
import { getSiteImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: {
    default: "Panel de administración",
    template: "%s — Panel de administración",
  },
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const images = await getSiteImages();

  return (
    <div className="bg-surface-secondary flex min-h-screen">
      <aside className="border-border bg-surface flex w-64 shrink-0 flex-col border-r px-4 py-6">
        <div className="px-3">
          <Logo logoUrl={images.logo} />
        </div>
        <p className="text-ink-tertiary px-3 font-sans text-xs">Panel de administración</p>

        <div className="mt-8 flex-1">
          <AdminNav />
        </div>

        <LogoutButton />
      </aside>

      <main className="flex-1 px-8 py-8">{children}</main>
    </div>
  );
}
