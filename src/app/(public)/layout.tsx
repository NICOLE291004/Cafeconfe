import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { getSiteSettings } from "@/lib/site-settings";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header whatsappUrl={settings.whatsappUrl} />
      {children}
      <Footer whatsappUrl={settings.whatsappUrl} instagramUrl={settings.instagramUrl} />
    </>
  );
}
