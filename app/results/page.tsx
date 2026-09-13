import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full px-6 py-16 text-center font-sans">
      <div className="flex flex-col items-center my-auto">
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-400 mb-6 block font-semibold">
          SPONTANEOUS SPEAKING PRACTICE
        </span>

        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#171717] tracking-tight leading-[1.1] mb-6">
          Master speaking <br />
          <span className="italic font-serif font-normal text-[#E53935]">under pressure.</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed mb-10 font-sans">
          Get a random topic. Speak for 60 seconds. Get real-time transcription and instant AI feedback on your fluency, structure, and pacing.
        </p>

        <Link
          href="/challenge"
          className="px-8 py-3.5 bg-[#E53935] text-white font-medium text-sm rounded hover:bg-red-700 transition-all shadow-sm inline-block"
        >
          Start 60s Challenge
        </Link>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="mt-20 pt-12 border-t border-[#E5E1DC] text-left">
        <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 mb-6 block font-bold">
          // HOW SPEAK60 WORKS
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E5E1DC] p-5 shadow-editorial">
            <span className="font-mono text-xs text-[#E53935] font-bold mb-2 block">01 // PROMPT</span>
            <h3 className="font-bold text-sm text-[#171717] mb-2">RANDOM TOPIC</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Assigned across business, technology, or opinion categories with zero prep time.
            </p>
          </div>
          <div className="bg-white border border-[#E5E1DC] p-5 shadow-editorial">
            <span className="font-mono text-xs text-[#E53935] font-bold mb-2 block">02 // AUDIO</span>
            <h3 className="font-bold text-sm text-[#171717] mb-2">60s RECORDING</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Record your voice response live. Pacing, duration, and pause words are calculated in real-time.
            </p>
          </div>
          <div className="bg-white border border-[#E5E1DC] p-5 shadow-editorial">
            <span className="font-mono text-xs text-[#E53935] font-bold mb-2 block">03 // AI ANALYSIS</span>
            <h3 className="font-bold text-sm text-[#171717] mb-2">AI FEEDBACK</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Gemini evaluates your speech across relevance, fluency, vocabulary, and delivery confidence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}