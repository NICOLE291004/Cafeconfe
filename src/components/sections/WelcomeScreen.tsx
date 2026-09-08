import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { buttonVariants } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface WelcomeScreenProps {
  whatsappUrl?: string;
}

export function WelcomeScreen({ whatsappUrl }: WelcomeScreenProps) {
  return (
    <Card className="text-center">
      <p className="font-display text-2xl font-light">¡Qué alegría que estés aquí! ☕</p>
      <p className="text-ink-secondary mt-4 font-sans text-base leading-relaxed">
        Tu lugar ya está reservado para nuestro próximo encuentro de Un Café con Fe. Nos emociona
        que ahora formes parte de esta comunidad.
      </p>
      <p className="text-ink-secondary mt-4 font-sans text-base leading-relaxed">
        Para mantenerte informada sobre recordatorios, ubicación, cambios de horario, recursos y
        próximos encuentros, queremos invitarte a nuestra comunidad de WhatsApp.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            <WhatsAppIcon className="h-4 w-4" strokeWidth={1.5} />
            Unirme a la Comunidad
          </a>
        ) : null}
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full sm:w-auto")}
        >
          Volver al inicio
        </Link>
      </div>
    </Card>
  );
}
