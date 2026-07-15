"use client";

import { Trash2 } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";

interface DeleteButtonProps {
  action: () => Promise<void>;
  confirmMessage: string;
}

export function DeleteButton({ action, confirmMessage }: DeleteButtonProps) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <button
        type="submit"
        aria-label="Eliminar"
        className={cn(
          "text-ink-tertiary hover:text-error flex h-9 w-9 items-center justify-center rounded-md transition-colors",
          focusRing,
        )}
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </form>
  );
}
