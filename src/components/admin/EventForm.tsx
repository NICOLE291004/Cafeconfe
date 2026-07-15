"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ImageUpload } from "@/components/admin/ImageUpload";
import type { EventFormState } from "@/app/admin/(dashboard)/eventos/actions";

export interface EventFormValues {
  title: string;
  slug: string;
  description: string;
  eventDateLocal: string;
  location: string;
  priceMxn: number;
  capacity: number;
  status: string;
  imageUrl?: string;
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      {label}
    </Button>
  );
}

interface EventFormProps {
  action: (prevState: EventFormState, formData: FormData) => Promise<EventFormState>;
  initialValues?: EventFormValues;
  submitLabel: string;
}

export function EventForm({ action, initialValues, submitLabel }: EventFormProps) {
  const [state, formAction] = useActionState<EventFormState, FormData>(action, { status: "idle" });

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}

      <ImageUpload
        pathPrefix="events"
        initialUrl={initialValues?.imageUrl}
        label="Foto del encuentro"
      />

      <FormField label="Título" htmlFor="title">
        <Input id="title" name="title" defaultValue={initialValues?.title} required />
      </FormField>

      <FormField
        label="Slug"
        htmlFor="slug"
        helperText="Se usa en la URL: /eventos/tu-slug — sin espacios ni acentos."
      >
        <Input id="slug" name="slug" defaultValue={initialValues?.slug} required />
      </FormField>

      <FormField label="Descripción" htmlFor="description">
        <Textarea id="description" name="description" defaultValue={initialValues?.description} />
      </FormField>

      <FormField label="Fecha y hora" htmlFor="event_date" helperText="Hora local de Hermosillo.">
        <Input
          id="event_date"
          name="event_date"
          type="datetime-local"
          defaultValue={initialValues?.eventDateLocal}
          required
        />
      </FormField>

      <FormField label="Sede" htmlFor="location">
        <Input id="location" name="location" defaultValue={initialValues?.location} />
      </FormField>

      <div className="grid grid-cols-2 gap-5">
        <FormField label="Precio (MXN)" htmlFor="price_mxn">
          <Input
            id="price_mxn"
            name="price_mxn"
            type="number"
            min={0}
            step="1"
            defaultValue={initialValues?.priceMxn}
          />
        </FormField>
        <FormField label="Capacidad" htmlFor="capacity">
          <Input
            id="capacity"
            name="capacity"
            type="number"
            min={1}
            step="1"
            defaultValue={initialValues?.capacity ?? 20}
          />
        </FormField>
      </div>

      <FormField label="Estado" htmlFor="status">
        <Select id="status" name="status" defaultValue={initialValues?.status ?? "draft"}>
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
          <option value="cancelled">Cancelado</option>
        </Select>
      </FormField>

      <div>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
