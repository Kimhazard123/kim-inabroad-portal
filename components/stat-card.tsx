export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-primary/10 bg-white/80 p-4">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-sm leading-5 text-slate-600">{label}</div>
    </div>
  );
}
