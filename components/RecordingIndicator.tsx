export default function RecordingIndicator() {
  return (
    <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-brand-red-light border border-brand-red/20 text-brand-red text-xs font-mono font-semibold uppercase tracking-wider">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red"></span>
      </span>
      Recording Live
    </div>
  );
}
