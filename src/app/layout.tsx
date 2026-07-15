import type { Metadata } from "next";
import { fraunces, inter } from "@/lib/fonts";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Café con Fe",
  description:
    "Una comunidad de mujeres en Hermosillo que se reúne para conectar con Dios en un ambiente cálido, íntimo y sin la solemnidad de la iglesia tradicional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-surface text-ink font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
