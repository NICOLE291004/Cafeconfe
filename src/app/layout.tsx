import type { Metadata } from "next";
import { fraunces, inter } from "@/lib/fonts";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const DESCRIPTION =
  "Una comunidad de mujeres en Hermosillo que se reúne para conectar con Dios en un ambiente cálido, íntimo y sin la solemnidad de la iglesia tradicional.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Un Café con Fe",
    template: "%s — Un Café con Fe",
  },
  description: DESCRIPTION,
  openGraph: {
    title: "Un Café con Fe",
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Un Café con Fe",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Un Café con Fe",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-surface text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
