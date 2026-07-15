import type { Metadata } from "next";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = { title: "Configuración General" };

export default async function ConfiguracionPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Configuración General</h1>
      <p className="text-ink-secondary mt-1 font-sans text-sm">
        Estos datos se usan en todo el sitio público (Header, Footer, pantalla de registro).
      </p>
      <div className="mt-6">
        <SiteSettingsForm settings={settings} />
      </div>
    </div>
  );
}
