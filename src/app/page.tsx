import { Reveal } from "@/components/motion/Reveal";

export default function Home() {
  return (
    <main className="px-container-x py-section-y-lg flex min-h-[70vh] items-center justify-center">
      <Reveal className="max-w-reading text-center">
        <h1 className="font-display text-4xl font-medium sm:text-5xl">Café con Fe</h1>
        <p className="text-ink-secondary mt-4 font-sans text-base sm:text-lg">
          El Home real llega en la Etapa 4. Mientras tanto, revisa el design system en{" "}
          <a href="/design-system" className="text-berry underline underline-offset-4">
            /design-system
          </a>
          .
        </p>
      </Reveal>
    </main>
  );
}
