"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { FaqFormState } from "@/app/admin/(dashboard)/faq/actions";

export interface FaqFormValues {
  question: string;
  answer: string;
  sortOrder: number;
  status: string;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      {label}
    </Button>
  );
}

interface FaqFormProps {
  action: (prevState: FaqFormState, formData: FormData) => Promise<FaqFormState>;
  initialValues?: FaqFormValues;
  submitLabel: string;
}

export function FaqForm({ action, initialValues, submitLabel }: FaqFormProps) {
  const [state, formAction] = useActionState<FaqFormState, FormData>(action, { status: "idle" });

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}

      <FormField label="Pregunta" htmlFor="question">
        <Input id="question" name="question" defaultValue={initialValues?.question} required />
      </FormField>

      <FormField label="Respuesta" htmlFor="answer">
        <Textarea id="answer" name="answer" defaultValue={initialValues?.answer} required />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Orden" htmlFor="sort_order" helperText="Menor = aparece primero.">
          <Input
            id="sort_order"
            name="sort_order"
            type="number"
            step="1"
            defaultValue={initialValues?.sortOrder ?? 0}
          />
        </FormField>
        <FormField label="Estado" htmlFor="status">
          <Select id="status" name="status" defaultValue={initialValues?.status ?? "draft"}>
            <option value="draft">Borrador</option>
            <option value="published">Publicado</option>
          </Select>
        </FormField>
      </div>

      <div>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
