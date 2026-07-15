"use client";

import { LogOut } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";
import { logout } from "@/app/admin/(dashboard)/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className={cn(
          "text-ink-secondary hover:text-ink flex items-center gap-2 rounded-md px-3 py-2 font-sans text-sm",
          focusRing,
        )}
      >
        <LogOut className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        Cerrar sesión
      </button>
    </form>
  );
}
