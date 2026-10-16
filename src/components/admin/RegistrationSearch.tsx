"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function RegistrationSearch({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(initialQuery);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => {
      const q = value.trim();
      router.replace(q ? `${pathname}?q=${encodeURIComponent(q)}` : pathname, { scroll: false });
    }, 300);
    return () => clearTimeout(t);
  }, [value, pathname, router]);

  return (
    <div className="relative">
      <Search
        className="text-ink-tertiary pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <Input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar por nombre o teléfono en todos los encuentros…"
        aria-label="Buscar mujeres"
        className="pl-11"
      />
    </div>
  );
}
