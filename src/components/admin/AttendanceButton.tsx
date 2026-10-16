import { Check } from "lucide-react";
import { cn, focusRing } from "@/lib/utils";

interface AttendanceButtonProps {
  action: () => Promise<void>;
  attended: boolean;
}

export function AttendanceButton({ action, attended }: AttendanceButtonProps) {
  return (
    <form action={action}>
      <button
        type="submit"
        aria-pressed={attended}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-md border px-3 font-sans text-xs font-medium transition-colors",
          attended
            ? "border-success bg-success/10 text-success"
            : "border-border text-ink-secondary hover:bg-surface-secondary",
          focusRing,
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2} />
        {attended ? "Asistió" : "Marcar asistencia"}
      </button>
    </form>
  );
}
