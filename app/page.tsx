'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col justify-between max-w-5xl mx-auto w-full px-6 py-12 md:py-20 bg-[#F4E4BC] text-[#111111] font-sans selection:bg-red-600 selection:text-white">
      {/* Hero Section */}
      <div className="max-w-4xl space-y-8 my-auto">
        {/* Red Accent Editorial Sub-Badge */}
        <div className="inline-block px-4 py-1.5 bg-white border-2 border-black font-mono text-xs font-black uppercase tracking-widest shadow-sharp-red">
          <span className="text-red-600 font-bold">// 60 SECOND</span> SPEAKING PRACTICE
        </div>

        {/* Headline with Lowercase Cursive Accent */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-black">
          SPEAK FOR A MINUTE. <br />
          <span className="font-editorial-script font-medium text-3xl sm:text-5xl md:text-6xl text-red-600 normal-case block mt-2">
            think on your feet.
          </span>
        </h1>

        {/* Editorial Subtitle */}
        <p className="font-mono text-sm sm:text-base text-gray-700 max-w-xl leading-relaxed bg-white border-2 border-black p-5 shadow-sharp">
          Get a random topic, speak without preparation, and discover how clearly you communicate under real time pressure with actionable AI feedback.
        </p>

        {/* Main CTA */}
        <div className="pt-2 flex items-center gap-4">
          <Link
            href="/challenge"
            className="px-10 py-5 bg-red-600 text-white font-mono font-black text-base uppercase tracking-widest border-2 border-black shadow-sharp hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all inline-block text-center"
          >
            GET A TOPIC 🚀
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div id="how-it-works" className="mt-24 pt-12 border-t-2 border-black font-mono">
        <div className="inline-block text-xs font-black uppercase tracking-widest text-red-600 mb-8 bg-black text-white px-3 py-1">
          // HOW SPEAK60 WORKS
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full">
          <div className="bg-white border-2 border-black p-6 shadow-sharp">
            <span className="text-red-600 font-bold text-sm mb-2 block">01 // PROMPT</span>
            <h3 className="font-black text-base uppercase mb-2">ZERO PREPARATION</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              Curated prompts across tech, business, and philosophy designed to push your spontaneous articulation.
            </p>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-sharp">
            <span className="text-red-600 font-bold text-sm mb-2 block">02 // ENGINE</span>
            <h3 className="font-black text-base uppercase mb-2">SPEECH ANALYTICS</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              High-accuracy speech processing measures your exact WPM, hesitation pauses, and filler words.
            </p>
          </div>

          <div className="bg-white border-2 border-black p-6 shadow-sharp">
            <span className="text-red-600 font-bold text-sm mb-2 block">03 // COACH</span>
            <h3 className="font-black text-base uppercase mb-2">AI EVALUATION</h3>
            <p className="text-xs text-gray-600 leading-relaxed font-sans">
              Gemini evaluates your speech structure, vocabulary precision, and delivery confidence in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}