"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { login, type LoginState } from "@/app/admin/login/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" isLoading={pending} className="w-full">
      Entrar
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, { status: "idle" });

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-4">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}

      <FormField label="Correo" htmlFor="email">
        <Input id="email" name="email" type="email" placeholder="tu@correo.com" required />
      </FormField>
      <FormField label="Contraseña" htmlFor="password">
        <Input id="password" name="password" type="password" required />
      </FormField>

      <SubmitButton />
    </form>
  );
}
