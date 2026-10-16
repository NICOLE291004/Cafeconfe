import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { PrayerRequestForm } from "@/components/sections/PrayerRequestForm";
import { submitPrayerRequest } from "./actions";

export const metadata: Metadata = {
  title: "Solicitud de Oración",
  description: "Comparte tu petición de oración con nosotras — la tratamos con discreción y amor.",
};

export default function OracionPage() {
  return (
    <main className="max-w-reading px-container-x py-section-y-lg mx-auto">
      <Reveal>
        <p className="text-berry font-sans text-xs font-medium tracking-[0.24em] uppercase">
          Un espacio seguro
        </p>
        <RevealHeading
          as="h1"
          delay={0.1}
          className="font-display mt-3 text-4xl font-light sm:text-5xl"
        >
          Solicitud de Oración
        </RevealHeading>
        <p className="text-ink-secondary mt-4 font-sans text-base leading-relaxed">
          ¿Estás pasando por un momento difícil? Queremos acompañarte.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <PrayerRequestForm action={submitPrayerRequest} />
      </Reveal>
    </main>
  );
}
