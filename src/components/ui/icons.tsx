/**
 * Lucide no incluye logotipos de marca (Instagram/Facebook fueron removidos
 * por licenciamiento). Estos son trazos simples propios, en el mismo
 * lenguaje visual (24x24, stroke, esquinas redondeadas) para no mezclar
 * estilos de ícono en el footer.
 */
import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.5 3H11.5v6" />
      <rect x="3" y="3" width="18" height="18" rx="5" />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 3a9 9 0 0 0-7.75 13.53L3 21l4.6-1.21A9 9 0 1 0 12 3Z" />
      <path d="M8.5 8.8c.3-.7 1-1.2 1.5-1.1.3 0 .6.5.9 1.2.2.5.5 1 .3 1.4-.1.3-.4.5-.6.7-.2.2-.3.4-.1.7.5.9 1.5 1.9 2.4 2.4.3.2.5.1.7-.1.2-.2.4-.5.7-.6.4-.2.9.1 1.4.3.7.3 1.2.6 1.2.9.1.6-.4 1.2-1 1.6-.7.4-1.5.5-2.5.2-1.8-.6-3.6-2.3-4.5-3.9-.5-.9-.8-1.9-.4-2.7Z" />
    </svg>
  );
}
