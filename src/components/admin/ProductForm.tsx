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
import type { ProductFormState } from "@/app/admin/(dashboard)/productos/actions";

export interface ProductFormValues {
  name: string;
  slug: string;
  description: string;
  priceMxn: number;
  stock: number;
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

interface ProductFormProps {
  action: (prevState: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  initialValues?: ProductFormValues;
  submitLabel: string;
}

export function ProductForm({ action, initialValues, submitLabel }: ProductFormProps) {
  const [state, formAction] = useActionState<ProductFormState, FormData>(action, {
    status: "idle",
  });

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}

      <ImageUpload
        pathPrefix="products"
        initialUrl={initialValues?.imageUrl}
        label="Foto del producto"
      />

      <FormField label="Nombre" htmlFor="name">
        <Input id="name" name="name" defaultValue={initialValues?.name} required />
      </FormField>

      <FormField
        label="Slug"
        htmlFor="slug"
        helperText="Se usa en la URL: /tienda/tu-slug — sin espacios ni acentos."
      >
        <Input id="slug" name="slug" defaultValue={initialValues?.slug} required />
      </FormField>

      <FormField label="Descripción" htmlFor="description">
        <Textarea id="description" name="description" defaultValue={initialValues?.description} />
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
        <FormField label="Existencias" htmlFor="stock">
          <Input
            id="stock"
            name="stock"
            type="number"
            min={0}
            step="1"
            defaultValue={initialValues?.stock ?? 0}
          />
        </FormField>
      </div>

      <FormField label="Estado" htmlFor="status">
        <Select id="status" name="status" defaultValue={initialValues?.status ?? "draft"}>
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
        </Select>
      </FormField>

      <div>
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
