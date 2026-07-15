"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import type { TestimonialFormState } from "@/app/admin/(dashboard)/testimonios/actions";

export interface TestimonialFormValues {
  name: string;
  quote: string;
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

interface TestimonialFormProps {
  action: (prevState: TestimonialFormState, formData: FormData) => Promise<TestimonialFormState>;
  initialValues?: TestimonialFormValues;
  submitLabel: string;
}

export function TestimonialForm({ action, initialValues, submitLabel }: TestimonialFormProps) {
  const [state, formAction] = useActionState<TestimonialFormState, FormData>(action, {
    status: "idle",
  });

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}

      <FormField label="Nombre" htmlFor="name">
        <Input id="name" name="name" defaultValue={initialValues?.name} required />
      </FormField>

      <FormField label="Testimonio" htmlFor="quote">
        <Textarea id="quote" name="quote" defaultValue={initialValues?.quote} required />
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
