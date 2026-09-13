import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2 font-mono font-bold text-lg tracking-tight text-cream-900 hover:opacity-85">
      <span className="inline-block w-3 h-3 bg-brand-red rounded-full group-hover:scale-110 transition-transform" />
      <span>SPEAK60</span>
    </Link>
  );
}
