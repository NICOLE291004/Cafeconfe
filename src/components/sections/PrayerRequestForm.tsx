"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { FlowerDot } from "@/components/ui/FlowerDot";
import { cn } from "@/lib/utils";
import type { PrayerRequestState } from "@/app/(public)/oracion/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" isLoading={pending} className="w-full sm:w-auto">
      Enviar petición
    </Button>
  );
}

interface PrayerRequestFormProps {
  action: (prevState: PrayerRequestState, formData: FormData) => Promise<PrayerRequestState>;
}

export function PrayerRequestForm({ action }: PrayerRequestFormProps) {
  const [state, formAction] = useActionState(action, { status: "idle" });

  if (state.status === "success") {
    return (
      <Card className="text-center">
        <FlowerDot size={34} className="mx-auto" />
        <p className="font-display mt-5 text-2xl leading-snug font-medium">
          Estamos contigo. Queremos que Dios traiga bendición a tu vida.
        </p>
        <p className="text-ink-secondary mt-4 font-sans text-base leading-relaxed">
          Gracias por confiarnos tu petición — la tratamos con suma discreción y con mucho amor. Si
          necesitas apoyo o guía en esta etapa, puedes solicitar una llamada con nuestro equipo, y
          con mucho amor te acompañaremos.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Volver al inicio
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}

      <FormField label="Tu petición" htmlFor="prayer-request">
        <Textarea
          id="prayer-request"
          name="request"
          rows={6}
          placeholder="Cuéntanos qué está pasando y cómo te gustaría que oremos por ti…"
          required
        />
      </FormField>

      <FormField label="Tu nombre (opcional)" htmlFor="prayer-name">
        <Input id="prayer-name" name="name" placeholder="Puedes dejarlo en blanco si prefieres" />
      </FormField>

      <FormField label="Teléfono" htmlFor="prayer-phone">
        <Input id="prayer-phone" name="phone" type="tel" placeholder="662 000 0000" required />
      </FormField>

      <Checkbox id="prayer-wants-call" name="wants_call" label="Me gustaría consejería" />

      <SubmitButton />
    </form>
  );
}
