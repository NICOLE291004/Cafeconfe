import { forwardRef } from "react";
import { cn, focusRing } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={invalid}
        className={cn(
          "border-border bg-surface text-ink h-11 w-full rounded-md border px-4 font-sans text-sm",
          "placeholder:text-ink-tertiary disabled:cursor-not-allowed disabled:opacity-50",
          focusRing,
          invalid && "border-error focus-visible:ring-error",
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
