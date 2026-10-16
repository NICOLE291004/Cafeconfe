"use client";

import { Check } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";

interface MarkAttendedButtonProps {
  action: () => Promise<void>;
}

export function MarkAttendedButton({ action }: MarkAttendedButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("¿Marcar esta petición como atendida?")) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label="Marcar como atendida"
        className={cn(
          "text-ink-tertiary hover:text-success flex h-9 w-9 items-center justify-center rounded-md transition-colors",
          focusRing,
        )}
      >
        <Check className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}
