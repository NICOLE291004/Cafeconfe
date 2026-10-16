"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { focusRing, cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Encuentros", href: "/eventos" },
  { label: "Nosotras", href: "/nosotras" },
];

interface HeaderProps {
  whatsappUrl?: string;
  logoUrl?: string | null;
}

export function Header({ whatsappUrl, logoUrl }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-surface/95 border-border sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="max-w-content px-container-x mx-auto grid grid-cols-2 items-center py-[15px] md:grid-cols-[1fr_auto_1fr]">
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-ink hover:text-berry hover:border-berry border-b border-transparent pb-[3px] font-sans text-[13px] tracking-[0.18em] uppercase transition-colors",
                focusRing,
                "rounded-sm",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className={cn("justify-self-start rounded-sm md:justify-self-center", focusRing)}
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo
            logoUrl={logoUrl}
            defaultSrc="/brand/logo-header.png"
            width={1534}
            height={1025}
            className="h-11 md:h-[52px]"
          />
        </Link>

        <div className="hidden items-center justify-end gap-3 md:flex">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "bg-wood text-cream hover:bg-berry rounded-pill flex h-[38px] items-center px-[20px] font-sans text-[12px] tracking-[0.16em] uppercase transition-colors",
                focusRing,
              )}
            >
              Unirme
            </a>
          ) : null}
        </div>

        <button
          type="button"
          className={cn(
            "text-ink -mr-2 flex h-10 w-10 items-center justify-self-end rounded-md md:hidden",
            focusRing,
          )}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.12, 0.23, 0.5, 1] }}
            className="border-border overflow-hidden border-t md:hidden"
          >
            <div className="px-container-x flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn("text-ink rounded-md px-2 py-3 font-sans text-base", focusRing)}
                >
                  {link.label}
                </Link>
              ))}
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "bg-wood text-cream rounded-pill mt-2 flex items-center justify-center px-4 py-3 font-sans text-[12px] tracking-[0.16em] uppercase",
                    focusRing,
                  )}
                >
                  Unirme
                </a>
              ) : null}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
