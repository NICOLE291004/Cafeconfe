"use client";

import { useActionState, useEffect, useRef } from "react";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { WalkInState } from "@/app/admin/(dashboard)/registros/actions";

interface WalkInFormProps {
  action: (prev: WalkInState, formData: FormData) => Promise<WalkInState>;
}

export function WalkInForm({ action }: WalkInFormProps) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" } as WalkInState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]">
        <Input name="name" placeholder="Nombre" aria-label="Nombre" required />
        <Input name="phone" type="tel" placeholder="Teléfono" aria-label="Teléfono" required />
        <Input name="email" type="email" placeholder="Correo (opcional)" aria-label="Correo" />
        <Button type="submit" isLoading={pending} iconLeft={<UserPlus className="h-4 w-4" />}>
          Inscribir
        </Button>
      </div>
      {state.status !== "idle" && state.message ? (
        <Alert variant={state.status === "error" ? "error" : "success"}>{state.message}</Alert>
      ) : null}
    </form>
  );
}
