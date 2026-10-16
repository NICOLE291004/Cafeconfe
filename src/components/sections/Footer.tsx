import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import { cn, focusRing } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/icons";

const PAGE_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Encuentros", href: "/eventos" },
  { label: "Nosotras", href: "/nosotras" },
  { label: "Tienda", href: "/tienda" },
  { label: "Oración", href: "/oracion" },
];

const INFO_LINKS = [{ label: "Contacto", href: "/nosotras#contacto" }];

interface FooterProps {
  logoUrl?: string | null;
  whatsappUrl?: string;
  instagramUrl?: string;
}

export function Footer({ whatsappUrl, instagramUrl, logoUrl }: FooterProps) {
  const socialLinks = [
    instagramUrl ? { label: "Instagram", href: instagramUrl, icon: InstagramIcon } : null,
  ].filter((link): link is { label: string; href: string; icon: typeof InstagramIcon } =>
    Boolean(link),
  );

  return (
    <footer className="bg-espresso">
      <div className="max-w-content px-container-x py-section-y-lg mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
        <div className="max-w-reading">
          <Logo
            logoUrl={logoUrl}
            defaultSrc="/brand/logo-footer.png"
            width={1240}
            height={1268}
            onDark
            invertOnDark
            className="h-14"
          />
          <h2 className="font-display text-cream mt-6 text-2xl font-medium">
            Únete a nuestra comunidad
          </h2>
          <p className="text-cream/70 mt-3 max-w-[390px] font-sans text-[15px] leading-relaxed">
            En nuestra comunidad de WhatsApp recibes las fechas de cada encuentro, avisos y
            contenido para acompañarte entre semana.
          </p>
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "mt-6")}
            >
              Unirme por WhatsApp
            </a>
          ) : null}
          {socialLinks.length > 0 ? (
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "text-cream/70 hover:text-cream border-cream/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                    focusRing,
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex gap-16">
          <nav className="flex flex-col gap-4">
            <p className="text-blush font-sans text-[11px] font-medium tracking-[0.28em] uppercase">
              Páginas
            </p>
            {PAGE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-cream/70 hover:text-cream rounded-sm font-sans text-[16px] tracking-[-0.01em] transition-colors",
                  focusRing,
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <nav className="flex flex-col gap-4">
            <p className="text-blush font-sans text-[11px] font-medium tracking-[0.28em] uppercase">
              Información
            </p>
            {INFO_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-cream/70 hover:text-cream rounded-sm font-sans text-[16px] tracking-[-0.01em] transition-colors",
                  focusRing,
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-blush/30 px-container-x border-t py-4">
        <p className="text-cream/60 max-w-content mx-auto font-sans text-[11px] tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Un Café con Fe. Hermosillo, Sonora.
        </p>
      </div>
    </footer>
  );
}
