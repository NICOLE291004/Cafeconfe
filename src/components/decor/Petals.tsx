interface PetalsProps {
  count?: number;
}

/**
 * Pétalos cayendo, ambientales, solo en el hero de Inicio. Posiciones y
 * tiempos son deterministas (fórmula a partir del índice, no Math.random)
 * para que coincidan entre el render de servidor y el de cliente.
 */
export function Petals({ count = 12 }: PetalsProps) {
  const petals = Array.from({ length: count }, (_, i) => {
    const left = (i * 37 + 11) % 97;
    const size = 12 + ((i * 7) % 11);
    const duration = 13 + ((i * 5) % 9);
    const delay = (i * 1.35) % 12;
    const color = i % 3 === 0 ? "rgba(250,243,236,.85)" : "rgba(244,201,214,.9)";
    return { key: i, left, size, duration, delay, color };
  });

  return (
    <div
      aria-hidden="true"
      className="motion-reduce:hidden pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      {petals.map((p) => (
        <span
          key={p.key}
          className="animate-petal-fall absolute top-0"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: 0,
            backgroundImage: [
              `radial-gradient(circle at 50% 20%, ${p.color} 20%, transparent 21%)`,
              `radial-gradient(circle at 79% 41%, ${p.color} 20%, transparent 21%)`,
              `radial-gradient(circle at 68% 82%, ${p.color} 20%, transparent 21%)`,
              `radial-gradient(circle at 32% 82%, ${p.color} 20%, transparent 21%)`,
              `radial-gradient(circle at 21% 41%, ${p.color} 20%, transparent 21%)`,
            ].join(", "),
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
