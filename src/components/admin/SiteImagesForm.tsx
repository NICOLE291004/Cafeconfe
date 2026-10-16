"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateSiteImages, type SiteImagesFormState } from "@/app/admin/(dashboard)/fotos/actions";
import type { SiteImages } from "@/lib/site-images";

const SLOTS: { key: keyof SiteImages; label: string; hint: string }[] = [
  {
    key: "logo",
    label: "Logotipo",
    hint: "Reemplaza la marca por defecto en Header, Footer y el panel admin. Usa un PNG con fondo transparente si es posible.",
  },
  {
    key: "comunidad_1",
    label: "Comunidad — foto 1",
    hint: "Galería deslizable en Home y en Nosotras — las mismas fotos aparecen en ambas páginas.",
  },
  { key: "comunidad_2", label: "Comunidad — foto 2", hint: "" },
  { key: "comunidad_3", label: "Comunidad — foto 3", hint: "" },
  { key: "comunidad_4", label: "Comunidad — foto 4", hint: "" },
  { key: "comunidad_5", label: "Comunidad — foto 5", hint: "" },
  { key: "comunidad_6", label: "Comunidad — foto 6", hint: "" },
  {
    key: "fundadora",
    label: "Fundadora (página Nosotras)",
    hint: "Foto de la fundadora para /nosotras.",
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      Guardar fotos
    </Button>
  );
}

export function SiteImagesForm({ images }: { images: SiteImages }) {
  const [state, formAction] = useActionState<SiteImagesFormState, FormData>(updateSiteImages, {
    status: "idle",
  });

  return (
    <form action={formAction} className="flex flex-col gap-8">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}
      {state.status === "success" ? <Alert variant="success">{state.message}</Alert> : null}

      <div className="gap-content-gap grid grid-cols-1 sm:grid-cols-2">
        {SLOTS.map((slot) => (
          <div key={slot.key} className="border-border rounded-lg border p-4">
            <ImageUpload
              name={slot.key}
              pathPrefix="site"
              initialUrl={images[slot.key] ?? ""}
              label={slot.label}
            />
            {slot.hint ? (
              <p className="text-ink-tertiary mt-2 font-sans text-xs">{slot.hint}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
