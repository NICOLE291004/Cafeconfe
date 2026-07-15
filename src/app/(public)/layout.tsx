import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
