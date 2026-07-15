import Link from "next/link";
import { cn, focusRing } from "@/lib/utils";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";

const FOOTER_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Eventos", href: "/eventos" },
  { label: "Tienda", href: "/tienda" },
  { label: "Comunidad", href: "/comunidad" },
  { label: "Contacto", href: "/comunidad#contacto" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="border-border bg-surface-secondary border-t">
      <div className="max-w-content px-container-x py-section-y mx-auto flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-ink text-xl font-medium">Café con Fe</p>
          <p className="text-ink-secondary max-w-reading mt-2 font-sans text-sm">
            Una comunidad de mujeres en Hermosillo que se reúne para conectar con Dios, en un
            ambiente cálido, íntimo y sin solemnidad.
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-ink-secondary hover:text-ink rounded-sm font-sans text-sm transition-colors",
                focusRing,
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex gap-3">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                "text-ink-secondary border-border hover:text-ink flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                focusRing,
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>

      <div className="border-border px-container-x border-t py-4">
        <p className="text-ink-tertiary max-w-content mx-auto font-sans text-xs">
          © {new Date().getFullYear()} Café con Fe. Hermosillo, Sonora.
        </p>
      </div>
    </footer>
  );
}
