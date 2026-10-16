import type { Metadata } from "next";
import { Mail, Phone, PenLine } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/motion/RevealHeading";
import { LaceEdge } from "@/components/ui/LaceEdge";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { FundadoraSection } from "@/components/sections/FundadoraSection";
import { CommunityGallery } from "@/components/sections/CommunityGallery";
import { ShareTestimonialForm } from "@/components/sections/ShareTestimonialForm";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/icons";
import { buttonVariants } from "@/components/ui/Button";
import { focusRing, cn } from "@/lib/utils";
import { getSiteSettings } from "@/lib/site-settings";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { getSiteImages } from "@/lib/site-images";
import { submitTestimonial } from "./actions";

export const metadata: Metadata = {
  title: "Nosotras",
  description:
    "Quién está detrás de Un Café con Fe, cómo nació, y las mujeres que ya forman parte de esta comunidad.",
};

function TextPlaceholder({ hint }: { hint: string }) {
  return (
    <div className="border-border-strong text-ink-tertiary flex flex-col items-start gap-3 border border-dashed px-6 py-8 font-sans text-sm">
      <PenLine className="h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <p className="max-w-reading">{hint}</p>
    </div>
  );
}

export default async function NosotrasPage() {
  const [settings, testimonials, images] = await Promise.all([
    getSiteSettings(),
    getPublishedTestimonials(),
    getSiteImages(),
  ]);

  const socialLinks = [
    settings.instagramUrl
      ? { label: "Instagram", href: settings.instagramUrl, icon: InstagramIcon }
      : null,
  ].filter((link): link is { label: string; href: string; icon: typeof InstagramIcon } =>
    Boolean(link),
  );

  // El Home ya muestra el testimonio[0] + 2 más — aquí solo lo que no se repite.
  const communityOnlyTestimonials = testimonials.length > 3 ? testimonials.slice(3) : testimonials;

  return (
    <main>
      <section className="bg-espresso relative overflow-hidden pt-[clamp(58px,8vw,100px)] pb-[clamp(56px,7vw,90px)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[.28]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 20%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 79% 41%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 68% 82%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 32% 82%,var(--color-blush) 5.5%,transparent 6.5%),radial-gradient(circle at 21% 41%,var(--color-blush) 5.5%,transparent 6.5%)",
            backgroundSize: "100px 100px",
          }}
        />
        <div className="max-w-content px-container-x relative mx-auto text-center">
          <Reveal>
            <p className="text-blush font-sans text-xs tracking-[0.36em] uppercase">Nosotras</p>
          </Reveal>
          <RevealHeading
            as="h1"
            delay={0.1}
            className="font-display text-cream mt-4 text-[clamp(38px,7.2vw,84px)] leading-[0.98] font-light"
          >
            Quién está detrás de la mesa
          </RevealHeading>
          <Reveal delay={0.3}>
            <p className="text-cream/76 max-w-reading mx-auto mt-5 font-sans text-base leading-relaxed">
              Un Café con Fe no es anónimo. Esto es quién lo empezó, por qué, y las mujeres que ya
              forman parte de esta comunidad.
            </p>
          </Reveal>
        </div>
      </section>

      <FundadoraSection settings={settings} images={images} />

      <section className="max-w-content px-container-x py-section-y-lg mx-auto">
        <Reveal>
          <p className="text-berry font-sans text-xs font-medium tracking-[0.24em] uppercase">
            Nuestra historia
          </p>
          <h2 className="font-display max-w-reading mt-3 text-3xl font-light sm:text-4xl">
            Cómo empezó Café con Fe
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          {settings.storyText ? (
            <p className="text-ink-secondary max-w-reading font-sans text-lg leading-[1.78] whitespace-pre-line">
              {settings.storyText}
            </p>
          ) : (
            <TextPlaceholder hint="Aquí va la historia real de cómo nació Café con Fe — se agrega desde /admin/configuracion." />
          )}
        </Reveal>
      </section>

      {communityOnlyTestimonials.length > 0 ? (
        <section className="max-w-content px-container-x py-section-y mx-auto">
          <Reveal>
            <p className="text-berry font-sans text-xs font-medium tracking-[0.24em] uppercase">
              Comunidad
            </p>
            <h2 className="font-display max-w-reading mt-3 text-3xl font-light sm:text-4xl">
              Mujeres que ya encontraron su pausa
            </h2>
            <p className="text-ink-secondary max-w-reading mt-4 font-sans text-base leading-relaxed">
              Cada mes se suman más mujeres a Un Café con Fe. Esto es lo que dicen quienes ya
              vinieron — sin filtro, sin guion.
            </p>
          </Reveal>

          <div className="gap-content-gap mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {communityOnlyTestimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section
        id="escribir-testimonio"
        className="max-w-content px-container-x py-section-y mx-auto scroll-mt-24"
      >
        <Reveal>
          <p className="text-berry font-sans text-xs font-medium tracking-[0.24em] uppercase">
            Tu historia
          </p>
          <h2 className="font-display max-w-reading mt-3 text-3xl font-light sm:text-4xl">
            ¿Tienes tu propia historia? Compártela
          </h2>
          <p className="text-ink-secondary max-w-reading mt-4 font-sans text-base leading-relaxed">
            Lo que escribas lo revisamos antes de publicarlo — con calma, con cariño.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <ShareTestimonialForm action={submitTestimonial} />
        </Reveal>
      </section>

      <section className="bg-beige py-section-y">
        <div className="max-w-content px-container-x mx-auto">
          <Reveal>
            <p className="text-berry font-sans text-xs font-medium tracking-[0.24em] uppercase">
              Momentos
            </p>
            <h2 className="font-display mt-3 text-3xl font-light sm:text-4xl">
              Así se ve la comunidad
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <CommunityGallery images={images} />
          </Reveal>
        </div>
      </section>

      <section
        id="contacto"
        className="bg-blush relative overflow-hidden py-[clamp(64px,8vw,110px)]"
      >
        <LaceEdge
          cutout="var(--color-cream)"
          edge="top"
          className="absolute top-0 right-0 left-0"
        />
        <div className="max-w-content px-container-x relative mx-auto">
          <Reveal className="max-w-reading">
            <p className="text-berry font-sans text-xs font-medium tracking-[0.24em] uppercase">
              Contacto
            </p>
            <h2 className="font-display mt-3 text-3xl font-light sm:text-4xl">
              ¿Tienes preguntas antes de venir?
            </h2>
            <p className="text-ink-secondary mt-4 font-sans text-base leading-relaxed">
              Escríbenos por redes — respondemos personalmente, no hay bots ni formularios de
              contacto genéricos.
            </p>

            {settings.whatsappUrl ? (
              <a
                href={settings.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "lg" }), "mt-6")}
              >
                <WhatsAppIcon className="h-4 w-4" strokeWidth={1.5} />
                Únete a la Comunidad
              </a>
            ) : null}

            {settings.email || settings.phone ? (
              <div className="text-ink-secondary mt-6 flex flex-col gap-2 font-sans text-sm">
                {settings.email ? (
                  <a
                    href={`mailto:${settings.email}`}
                    className={cn("hover:text-ink flex w-fit items-center gap-2", focusRing)}
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    {settings.email}
                  </a>
                ) : null}
                {settings.phone ? (
                  <a
                    href={`tel:${settings.phone}`}
                    className={cn("hover:text-ink flex w-fit items-center gap-2", focusRing)}
                  >
                    <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                    {settings.phone}
                  </a>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "border-ink text-ink hover:bg-ink hover:text-cream flex h-12 w-12 items-center justify-center border transition-colors",
                    focusRing,
                  )}
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
