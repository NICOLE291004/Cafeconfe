import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-xl border p-6 shadow-sm",
        interactive && "transition-shadow focus-within:shadow-md hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}
