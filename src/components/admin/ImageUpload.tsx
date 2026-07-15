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
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setIsUploading(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${pathPrefix}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(path, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("site-images").getPublicUrl(path);
      setUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
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
