"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn, focusRing } from "@/lib/utils";

interface ImageUploadProps {
  name?: string;
  initialUrl?: string;
  pathPrefix: string;
  label?: string;
}

const HEIC_EXT = /\.(heic|heif)$/i;

function isHeic(file: File) {
  const type = file.type.toLowerCase();
  return type === "image/heic" || type === "image/heif" || HEIC_EXT.test(file.name);
}

export function ImageUpload({
  name = "image_url",
  initialUrl = "",
  pathPrefix,
  label = "Foto",
}: ImageUploadProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setError(null);
    setIsUploading(true);

    try {
      let file: File | Blob = rawFile;
      let filename = rawFile.name;
      let contentType = rawFile.type || undefined;

      // Las fotos de iPhone salen en HEIC/HEIF por defecto — ningún
      // navegador excepto Safari puede mostrarlas, así que se convierten a
      // JPEG acá mismo, en el navegador, antes de subirlas.
      if (isHeic(rawFile)) {
        const { default: heic2any } = await import("heic2any");
        const converted = await heic2any({ blob: rawFile, toType: "image/jpeg", quality: 0.85 });
        file = Array.isArray(converted) ? converted[0] : converted;
        filename = filename.replace(HEIC_EXT, "") + ".jpg";
        contentType = "image/jpeg";
      }

      const supabase = createClient();
      const ext = filename.split(".").pop();
      const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: false, contentType });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? `No se pudo subir la imagen: ${err.message}`
          : "No se pudo subir la imagen.",
      );
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <p className="text-ink font-sans text-sm font-medium">{label}</p>
      <input type="hidden" name={name} value={url} />

      <div className="mt-2 flex items-center gap-4">
        {url ? (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="border-border h-24 w-24 rounded-lg border object-cover"
            />
            <button
              type="button"
              onClick={() => setUrl("")}
              aria-label="Quitar foto"
              className={cn(
                "bg-espresso text-cream absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full",
                focusRing,
              )}
            >
              <X className="h-3 w-3" strokeWidth={2} />
            </button>
          </div>
        ) : (
          <div className="border-border-strong bg-surface-secondary flex h-24 w-24 items-center justify-center rounded-lg border border-dashed">
            <ImagePlus className="text-ink-tertiary h-6 w-6" strokeWidth={1.5} />
          </div>
        )}

        <div>
          <label
            className={cn(
              "border-border-strong text-ink hover:bg-surface-secondary inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 font-sans text-sm",
              focusRing,
            )}
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
            ) : (
              <ImagePlus className="h-4 w-4" strokeWidth={1.5} />
            )}
            {isUploading ? "Subiendo…" : url ? "Cambiar foto" : "Subir foto"}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
          {error ? <p className="text-error mt-2 font-sans text-xs">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
