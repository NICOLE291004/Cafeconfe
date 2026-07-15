"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { focusRing, cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Eventos", href: "/eventos" },
  { label: "Tienda", href: "/tienda" },
  { label: "Comunidad", href: "/comunidad" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-border bg-surface/90 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="max-w-content px-container-x mx-auto flex items-center justify-between py-4">
        <Link
          href="/"
          className={cn("font-display text-ink text-xl font-medium", focusRing, "rounded-sm")}
          onClick={() => setIsMenuOpen(false)}
        >
          Café con Fe
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-ink-secondary hover:text-ink font-sans text-sm transition-colors",
                focusRing,
                "rounded-sm",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button size="sm">Próximo encuentro</Button>
        </div>

        <button
          type="button"
          className={cn(
            "text-ink -mr-2 flex h-10 w-10 items-center justify-center rounded-md md:hidden",
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
              <Button className="mt-2 w-full" onClick={() => setIsMenuOpen(false)}>
                Próximo encuentro
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
