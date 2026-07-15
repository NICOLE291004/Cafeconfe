"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  HelpCircle,
  LayoutDashboard,
  MessageSquareQuote,
  Package,
  Settings,
  Users,
} from "lucide-react";
import { cn, focusRing } from "@/lib/utils";

const LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Eventos", href: "/admin/eventos", icon: CalendarDays },
  { label: "Productos", href: "/admin/productos", icon: Package },
  { label: "Registros", href: "/admin/registros", icon: Users },
  { label: "Testimonios", href: "/admin/testimonios", icon: MessageSquareQuote },
  { label: "Preguntas frecuentes", href: "/admin/faq", icon: HelpCircle },
  { label: "Configuración General", href: "/admin/configuracion", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => {
        const isActive =
          link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 font-sans text-sm transition-colors",
              isActive
                ? "bg-berry text-cream"
                : "text-ink-secondary hover:bg-surface-secondary hover:text-ink",
              focusRing,
            )}
          >
            <link.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
