import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Speak60 — Spontaneous Speech Practice',
  description: 'Master spontaneous 60-second speaking with real-time transcription and AI feedback.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F4E4BC] text-[#171717] antialiased min-h-screen flex flex-col justify-between">
        {/* SINGLE TOP NAVBAR */}
        <header className="w-full border-b-2 border-black bg-[#F4E4BC] py-4 px-6 sm:px-12 flex justify-between items-center sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-3.5 h-3.5 bg-red-600 inline-block shadow-sharp-red"></span>
            <span className="font-mono font-black text-xl tracking-tighter uppercase text-black">
              SPEAK60
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/#how-it-works"
              className="text-xs font-mono font-bold uppercase tracking-wider text-black hover:text-red-600 transition-colors hidden sm:inline-block"
            >
              How it works
            </Link>
            <Link
              href="/challenge"
              className="px-4 py-2 bg-red-600 text-white font-mono text-xs font-bold uppercase tracking-widest border border-black shadow-sharp hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            >
              Start practicing ➔
            </Link>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 flex flex-col">{children}</main>

        {/* SINGLE BOTTOM FOOTER */}
        <footer className="w-full border-t-2 border-black bg-[#F4E4BC] py-4 px-6 sm:px-12 text-center text-xs text-black font-mono flex justify-between items-center">
          <div className="uppercase tracking-wider">SPEAK60 // EDITORIAL SPEECH</div>
          <div className="uppercase tracking-wider text-red-600 font-bold">© PRACHI UPRETI</div>
        </footer>
      </body>
    </html>
  );
}