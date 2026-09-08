import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { PageCurtain } from "@/components/decor/PageCurtain";
import { getSiteSettings } from "@/lib/site-settings";
import { getSiteImages } from "@/lib/site-images";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const [settings, images] = await Promise.all([getSiteSettings(), getSiteImages()]);

  return (
    <>
      <PageCurtain />
      <Header whatsappUrl={settings.whatsappUrl} logoUrl={images.logo} />
      {children}
      <Footer
        whatsappUrl={settings.whatsappUrl}
        instagramUrl={settings.instagramUrl}
        logoUrl={images.logo}
      />
    </>
  );
}
