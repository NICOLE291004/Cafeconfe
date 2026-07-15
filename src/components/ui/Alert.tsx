import { CircleAlert, CircleCheck, Info } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("flex items-start gap-3 rounded-lg border p-4 font-sans text-sm", {
  variants: {
    variant: {
      error: "border-error bg-error-soft text-espresso",
      success: "border-success bg-success-soft text-espresso",
      info: "border-border bg-surface-secondary text-espresso",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

const icons = {
  error: CircleAlert,
  success: CircleCheck,
  info: Info,
} as const;

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

export function Alert({ className, variant = "info", children, ...props }: AlertProps) {
  const Icon = icons[variant ?? "info"];
  return (
    <div className={cn(alertVariants({ variant }), className)} role="alert" {...props}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
