import { forwardRef } from "react";
import { cn, focusRing } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "border-border bg-surface text-ink h-11 w-full rounded-md border px-4 font-sans text-sm",
          "disabled:cursor-not-allowed disabled:opacity-50",
          focusRing,
          className,
        )}
        {...props}
      >
        {children}
      </select>
    );
  },
);

Select.displayName = "Select";
