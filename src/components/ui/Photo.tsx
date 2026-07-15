import Image from "next/image";
import { PlaceholderImage } from "./PlaceholderImage";
import { cn } from "@/lib/utils";

interface PhotoProps {
  src: string | null;
  alt: string;
  caption: string;
  className?: string;
}

/** Foto real si hay una subida; si no, el placeholder honesto de siempre. */
export function Photo({ src, alt, caption, className }: PhotoProps) {
  if (!src) {
    return <PlaceholderImage caption={caption} className={className} />;
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
