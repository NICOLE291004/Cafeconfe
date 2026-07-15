import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-pill px-3 py-1 font-sans text-xs font-medium",
  {
    variants: {
      variant: {
        berry: "bg-berry text-cream",
        gold: "bg-gold text-espresso",
        neutral: "bg-surface-secondary text-ink-secondary",
        outline: "border border-border-strong text-ink-secondary",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
