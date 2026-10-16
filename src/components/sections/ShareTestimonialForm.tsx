"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { FlowerDot } from "@/components/ui/FlowerDot";
import type { SubmitTestimonialState } from "@/app/(public)/nosotras/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending} className="w-full sm:w-auto">
      Compartir mi testimonio
    </Button>
  );
}

interface ShareTestimonialFormProps {
  action: (
    prevState: SubmitTestimonialState,
    formData: FormData,
  ) => Promise<SubmitTestimonialState>;
}

export function ShareTestimonialForm({ action }: ShareTestimonialFormProps) {
  const [state, formAction] = useActionState(action, { status: "idle" });

  if (state.status === "success") {
    return (
      <Card className="max-w-md text-center">
        <FlowerDot size={26} className="mx-auto" />
        <p className="font-display mt-4 text-xl font-medium">¡Gracias por compartir tu historia!</p>
        <p className="text-ink-secondary mt-2 font-sans text-sm leading-relaxed">
          En cuanto lo revisemos, va a aparecer aquí.
        </p>
      </Card>
    );
  }

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-4">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}
      <FormField label="Tu nombre" htmlFor="testimonial-name">
        <Input id="testimonial-name" name="name" placeholder="Tu nombre" required />
      </FormField>
      <FormField label="Tu testimonio" htmlFor="testimonial-quote">
        <Textarea
          id="testimonial-quote"
          name="quote"
          rows={4}
          placeholder="Cuéntanos qué significó para ti Un Café con Fe…"
          required
        />
      </FormField>
      <SubmitButton />
    </form>
  );
}
