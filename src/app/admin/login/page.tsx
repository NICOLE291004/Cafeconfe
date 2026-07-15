"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { login, type LoginState } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" isLoading={pending} className="w-full">
      Entrar
    </Button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, { status: "idle" });

  return (
    <main className="bg-surface-secondary px-container-x flex min-h-screen items-center justify-center">
      <div className="border-border bg-surface w-full max-w-sm rounded-xl border p-8 shadow-md">
        <p className="font-display text-2xl font-medium">Café con Fe</p>
        <p className="text-ink-secondary mt-1 font-sans text-sm">Panel de administración</p>

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
      </div>
    </main>
  );
}
