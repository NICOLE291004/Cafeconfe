import { Quote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { MockTestimonial } from "@/lib/mock-data";

export function TestimonialCard({ testimonial }: { testimonial: MockTestimonial }) {
  return (
    <Card className="flex h-full flex-col gap-4">
      <Quote className="text-gold h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      <p className="font-display flex-1 text-lg leading-relaxed italic">“{testimonial.quote}”</p>
      <p className="text-ink-secondary font-sans text-sm font-medium">{testimonial.name}</p>
    </Card>
  );
}
