export default function LoadingEventoDetail() {
  return (
    <main className="max-w-content px-container-x py-section-y-lg mx-auto animate-pulse">
      <div className="bg-surface-secondary h-4 w-32 rounded" />
      <div className="gap-content-gap mt-6 grid grid-cols-1 items-start lg:grid-cols-2">
        <div className="bg-surface-secondary aspect-[4/5] rounded-2xl" />
        <div>
          <div className="bg-surface-secondary h-10 w-3/4 rounded" />
          <div className="bg-surface-secondary mt-6 h-4 w-1/2 rounded" />
          <div className="bg-surface-secondary mt-3 h-4 w-1/3 rounded" />
          <div className="bg-surface-secondary mt-6 h-24 w-full rounded" />
        </div>
      </div>
    </main>
  );
}
