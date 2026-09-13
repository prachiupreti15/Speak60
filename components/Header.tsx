import Logo from './Logo';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-cream-200 bg-cream-50/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-8 text-sm font-medium">
          <Link href="/#how-it-works" className="text-brand-muted hover:text-cream-900 transition-colors">
            How it works
          </Link>
          <Link href="/challenge" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-brand-red hover:bg-brand-red-hover transition-colors">
            Start practicing
          </Link>
        </nav>
      </div>
    </header>
  );
}
