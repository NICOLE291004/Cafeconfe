const colorSwatches = [
  { name: "cream", className: "bg-cream", hex: "#FAF6EF" },
  { name: "beige", className: "bg-beige", hex: "#EFE1CC" },
  { name: "espresso", className: "bg-espresso", hex: "#3A2A20" },
  { name: "berry", className: "bg-berry", hex: "#A4405A" },
  { name: "gold", className: "bg-gold", hex: "#C9A15A" },
  { name: "walnut", className: "bg-walnut", hex: "#6F4E37" },
];

const warmGrayScale = [100, 200, 300, 400, 500, 600, 700, 800, 900];

const shadowScale = ["xs", "sm", "md", "lg", "xl"];

const radiusScale = [
  { name: "sm", className: "rounded-sm" },
  { name: "md", className: "rounded-md" },
  { name: "lg", className: "rounded-lg" },
  { name: "xl", className: "rounded-xl" },
  { name: "2xl", className: "rounded-2xl" },
  { name: "pill", className: "rounded-pill" },
];

export default function Home() {
  return (
    <main className="px-container-x">
      <div className="border-border-strong max-w-content mx-auto border-b-2 border-dashed py-6 text-center">
        <p className="text-ink-secondary font-sans text-sm">
          Verificación de Design Tokens — Etapa 2. Esta página es temporal, no es el sitio final.
        </p>
      </div>

      <section className="max-w-content py-section-y-lg mx-auto">
        <h1 className="font-display text-5xl font-medium sm:text-7xl">Café con Fe</h1>
        <p className="font-display mt-4 text-2xl italic sm:text-3xl">
          Una pausa cálida para conectar con Dios.
        </p>
        <p className="text-ink-secondary max-w-reading mt-8 font-sans text-base leading-relaxed sm:text-lg">
          Este párrafo confirma que Inter carga correctamente en varios pesos:{" "}
          <span className="font-normal">regular 400,</span>{" "}
          <span className="font-medium">medium 500</span> y{" "}
          <span className="font-semibold">semibold 600</span>. La tipografía de cuerpo debe sentirse
          legible, cálida y nunca fría.
        </p>
      </section>

      <section className="bg-surface-secondary max-w-content px-container-x py-section-y mx-auto rounded-2xl">
        <h2 className="font-display text-2xl font-medium">Paleta — primitivos</h2>
        <div className="gap-content-gap mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {colorSwatches.map((swatch) => (
            <div key={swatch.name} className="text-center">
              <div className={`${swatch.className} border-border h-24 w-full rounded-lg border`} />
              <p className="mt-2 font-sans text-sm font-medium">{swatch.name}</p>
              <p className="text-ink-tertiary font-sans text-xs">{swatch.hex}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display mt-16 text-2xl font-medium">Escala de grises cálidos</h2>
        <div className="gap-content-gap mt-8 grid grid-cols-3 sm:grid-cols-9">
          {warmGrayScale.map((step) => (
            <div key={step} className="text-center">
              <div
                className="border-border h-16 w-full rounded-lg border"
                style={{ background: `var(--color-warmgray-${step})` }}
              />
              <p className="mt-2 font-sans text-xs">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-content py-section-y mx-auto">
        <h2 className="font-display text-2xl font-medium">Ritmo de espaciado</h2>
        <div className="mt-8 flex flex-col gap-4">
          <div className="bg-surface-secondary py-section-y rounded-lg text-center font-sans text-sm">
            py-section-y (clamp 64px → 128px)
          </div>
          <div className="bg-beige py-section-y-lg rounded-lg text-center font-sans text-sm">
            py-section-y-lg (clamp 80px → 160px)
          </div>
          <div className="border-border-strong max-w-content mx-auto rounded-lg border-2 border-dashed py-4 text-center font-sans text-sm">
            max-w-content = 1280px
          </div>
        </div>
      </section>

      <section className="bg-surface-secondary max-w-content px-container-x py-section-y mx-auto rounded-2xl">
        <h2 className="font-display text-2xl font-medium">Sombras</h2>
        <p className="text-ink-secondary max-w-reading mt-2 font-sans text-sm">
          Cajas color crema sobre este panel beige, para que la sombra tenue y tintada en espresso
          sea visible (sobre el fondo crema de la página, sería casi imperceptible — señal de que la
          escala es sutil a propósito).
        </p>
        <div className="gap-content-gap mt-8 grid grid-cols-2 sm:grid-cols-5">
          {shadowScale.map((step) => (
            <div key={step} className="text-center">
              <div
                className="bg-surface h-20 w-full rounded-lg"
                style={{ boxShadow: `var(--shadow-${step})` }}
              />
              <p className="mt-2 font-sans text-xs">shadow-{step}</p>
            </div>
          ))}
        </div>

        <h2 className="font-display mt-16 text-2xl font-medium">Radios</h2>
        <div className="gap-content-gap mt-8 grid grid-cols-3 sm:grid-cols-6">
          {radiusScale.map((radius) => (
            <div key={radius.name} className="text-center">
              <div className={`bg-walnut h-20 w-full ${radius.className}`} />
              <p className="mt-2 font-sans text-xs">{radius.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-content py-section-y-lg mx-auto">
        <h2 className="font-display text-2xl font-medium">Botón de muestra</h2>
        <p className="text-ink-secondary max-w-reading mt-2 font-sans text-sm">
          Este es un botón crudo con los tokens aplicados directamente, solo para verificar
          contraste y sombra. El componente{" "}
          <code className="bg-surface-secondary rounded-sm px-1.5 py-0.5">Button</code> reutilizable
          llega en la Etapa 3.
        </p>
        <button
          type="button"
          className="bg-berry hover:bg-berry/90 rounded-pill text-cream mt-6 px-8 py-3 font-sans text-sm font-medium shadow-sm transition-colors"
        >
          Ver próximo encuentro
        </button>
      </section>
    </main>
  );
}
