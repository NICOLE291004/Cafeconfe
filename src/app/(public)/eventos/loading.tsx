export default function LoadingEventos() {
  return (
    <main className="max-w-content px-container-x py-section-y-lg mx-auto animate-pulse">
      <div className="bg-surface-secondary h-4 w-24 rounded" />
      <div className="bg-surface-secondary mt-3 h-10 w-96 max-w-full rounded" />
      <div className="bg-surface-secondary max-w-reading mt-4 h-4 w-full rounded" />

      <div className="gap-content-gap mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-surface-secondary h-40 rounded-xl" />
        ))}
      </div>
    </main>
  );
}
