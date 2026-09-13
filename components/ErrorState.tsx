import Button from './Button';

export default function ErrorState({ title = 'Something went wrong', message, onRetry }: any) {
  return (
    <div className="max-w-md mx-auto my-12 p-8 border border-brand-red/30 bg-brand-red-light/30 text-center">
      <h3 className="font-mono text-base font-bold text-cream-900 uppercase tracking-wider mb-2">{title}</h3>
      <p className="text-sm text-brand-muted mb-6 leading-relaxed">{message}</p>
      {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try Again</Button>}
    </div>
  );
}
