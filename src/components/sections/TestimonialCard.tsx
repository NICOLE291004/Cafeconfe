import { Card } from "@/components/ui/Card";
import { FlowerDot } from "@/components/ui/FlowerDot";
import type { TestimonialDisplay } from "@/lib/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: TestimonialDisplay }) {
  return (
    <Card className="flex h-full flex-col gap-3 p-5 shadow-none">
      <FlowerDot size={20} />
      <p className="font-display flex-1 text-base leading-relaxed italic">“{testimonial.quote}”</p>
      <p className="text-berry font-sans text-[11px] font-medium tracking-[0.18em] uppercase">
        {testimonial.name}
      </p>
    </Card>
  );
}
