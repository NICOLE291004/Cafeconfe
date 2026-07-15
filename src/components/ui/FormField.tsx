import { cn } from "@/lib/utils";
import { Label } from "./Label";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  helperText?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  label,
  htmlFor,
  helperText,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? (
        <p className="text-error font-sans text-xs">{error}</p>
      ) : helperText ? (
        <p className="text-ink-tertiary font-sans text-xs">{helperText}</p>
      ) : null}
    </div>
  );
}
