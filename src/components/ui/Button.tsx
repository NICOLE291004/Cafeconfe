import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, focusRing } from "@/lib/utils";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-sans font-medium",
    "transition-colors disabled:pointer-events-none disabled:opacity-50",
    focusRing,
  ),
  {
    variants: {
      variant: {
        primary: "bg-berry text-cream shadow-sm hover:bg-berry/90",
        secondary: "border border-border-strong bg-transparent text-ink hover:bg-surface-secondary",
        ghost: "bg-transparent text-ink hover:bg-surface-secondary",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, isLoading, iconLeft, iconRight, disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? <Spinner /> : iconLeft}
        {children}
        {!isLoading && iconRight}
      </button>
    );
  },
);

Button.displayName = "Button";
