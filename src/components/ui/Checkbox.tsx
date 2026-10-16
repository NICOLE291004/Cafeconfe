import { forwardRef } from "react";
import { cn, focusRing } from "@/lib/utils";

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className="text-ink flex w-fit cursor-pointer items-center gap-2.5 font-sans text-sm"
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className={cn(
            "border-border-strong text-berry h-5 w-5 shrink-0 border accent-current",
            focusRing,
            className,
          )}
          {...props}
        />
        {label}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
