"use client";

import { Ban } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";

interface CancelRegistrationButtonProps {
  action: () => Promise<void>;
}

export function CancelRegistrationButton({ action }: CancelRegistrationButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("¿Marcar este registro como cancelado?")) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label="Cancelar registro"
        className={cn(
          "text-ink-tertiary hover:text-error flex h-9 w-9 items-center justify-center rounded-md transition-colors",
          focusRing,
        )}
      >
        <Ban className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}
