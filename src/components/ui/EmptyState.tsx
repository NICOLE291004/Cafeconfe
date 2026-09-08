import type { LucideIcon } from "lucide-react";
import { CalendarHeart } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon = CalendarHeart,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="border-border-strong flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-16 text-center">
      <Icon className="text-ink-tertiary h-10 w-10" strokeWidth={1.25} aria-hidden="true" />
      <p className="font-display text-ink text-xl font-normal">{title}</p>
      {description ? (
        <p className="text-ink-secondary max-w-reading font-sans text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
