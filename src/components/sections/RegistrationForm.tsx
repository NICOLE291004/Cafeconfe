"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { WelcomeScreen } from "@/components/sections/WelcomeScreen";
import type { RegisterState } from "@/app/(public)/eventos/[slug]/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" isLoading={pending} className="w-full sm:w-auto">
      Registrarme
    </Button>
  );
}

interface RegistrationFormProps {
  action: (prevState: RegisterState, formData: FormData) => Promise<RegisterState>;
  whatsappUrl?: string;
}

export function RegistrationForm({ action, whatsappUrl }: RegistrationFormProps) {
  const [state, formAction] = useActionState(action, { status: "idle" });

  if (state.status === "success") {
    return <WelcomeScreen whatsappUrl={whatsappUrl} />;
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}
      <FormField label="Nombre" htmlFor="reg-name">
        <Input id="reg-name" name="name" placeholder="Tu nombre" required />
      </FormField>
      <FormField label="Teléfono" htmlFor="reg-phone">
        <Input id="reg-phone" name="phone" type="tel" placeholder="662 000 0000" required />
      </FormField>
      <FormField label="Correo (opcional)" htmlFor="reg-email">
        <Input id="reg-email" name="email" type="email" placeholder="tu@correo.com" />
      </FormField>
      <Checkbox
        id="reg-wants-whatsapp"
        name="wants_whatsapp"
        label="Quiero recibir avisos por la comunidad de WhatsApp"
      />
      <SubmitButton />
    </form>
  );
}
