"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import {
  updateSiteSettings,
  type SettingsFormState,
} from "@/app/admin/(dashboard)/configuracion/actions";
import type { SiteSettings } from "@/lib/site-settings";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" isLoading={pending}>
      Guardar cambios
    </Button>
  );
}

export function SiteSettingsForm({ settings }: { settings: SiteSettings }) {
  const [state, formAction] = useActionState<SettingsFormState, FormData>(updateSiteSettings, {
    status: "idle",
  });

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-5">
      {state.status === "error" ? <Alert variant="error">{state.message}</Alert> : null}
      {state.status === "success" ? <Alert variant="success">{state.message}</Alert> : null}

      <FormField
        label="Enlace del grupo de WhatsApp"
        htmlFor="whatsapp_url"
        helperText="El enlace de invitación completo, ej. https://chat.whatsapp.com/xxxxx"
      >
        <Input
          id="whatsapp_url"
          name="whatsapp_url"
          type="url"
          placeholder="https://chat.whatsapp.com/..."
          defaultValue={settings.whatsappUrl}
        />
      </FormField>

      <FormField label="Instagram" htmlFor="instagram_url">
        <Input
          id="instagram_url"
          name="instagram_url"
          type="url"
          placeholder="https://instagram.com/cafeconfe"
          defaultValue={settings.instagramUrl}
        />
      </FormField>

      <FormField label="Correo electrónico" htmlFor="email">
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="hola@cafeconfe.mx"
          defaultValue={settings.email}
        />
      </FormField>

      <FormField label="Teléfono" htmlFor="phone">
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="662 000 0000"
          defaultValue={settings.phone}
        />
      </FormField>

      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
