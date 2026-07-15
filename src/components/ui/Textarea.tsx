import { forwardRef } from "react";
import { cn, focusRing } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid}
        rows={4}
        className={cn(
          "border-border bg-surface text-ink w-full rounded-md border px-4 py-3 font-sans text-sm",
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

Textarea.displayName = "Textarea";
