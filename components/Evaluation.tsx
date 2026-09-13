import React from 'react';
import ScoreRing from './ScoreRing';
import ScoreBreakdown from './ScoreBreakdown';

interface EvaluationProps {
  topic: string;
  evaluation: any;
  transcript: string;
  onRetry: () => void;
}

export default function Evaluation({ topic, evaluation, transcript, onRetry }: EvaluationProps) {
  const safeEval = evaluation || {};
  const overallScore = safeEval.overall ?? 0;

  const strengthsList = safeEval.strengths && safeEval.strengths.length > 0 
    ? safeEval.strengths 
    : ['Clean voice output', 'Solid continuous flow', 'Maintained energy'];

  const improvementsList = safeEval.improvements && safeEval.improvements.length > 0 
    ? safeEval.improvements 
    : ['Expand vocabulary', 'Reduce filler pauses', 'Nail the closing statement'];

  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-4 font-sans">
      {/* EVALUATED TOPIC CARD */}
      <div className="bg-white border-2 border-black p-6 sm:p-8 mb-8 shadow-sharp">
        <span className="block text-[11px] font-mono font-bold uppercase tracking-widest text-red-600 mb-3">
          EVALUATED TOPIC
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif font-bold text-black tracking-tight leading-snug">
          "{topic}"
        </h2>
      </div>

      {/* OVERALL SCORE & BREAKDOWN CARD */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white border-2 border-black p-6 sm:p-8 mb-8 shadow-sharp">
        <div className="md:col-span-5 flex flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black pb-6 md:pb-0 md:pr-6">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-gray-400 mb-4">
            OVERALL SCORE
          </span>
          <ScoreRing score={overallScore} />
        </div>
        <div className="md:col-span-7 w-full">
          <ScoreBreakdown
            content={safeEval.content ?? 0}
            fluency={safeEval.fluency ?? 0}
            vocabulary={safeEval.vocabulary ?? 0}
            structure={safeEval.structure ?? 0}
            deliveryConfidence={safeEval.deliveryConfidence ?? 0}
          />
        </div>
      </div>

      {/* METRIC BOXES ROW */}
      <div className="grid grid-cols-3 gap-4 mb-8 text-center font-mono">
        <div className="bg-white border-2 border-black p-4 shadow-sharp">
          <div className="text-3xl sm:text-4xl font-black text-black">{safeEval.wordCount ?? 0}</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">TOTAL WORDS</div>
        </div>
        <div className="bg-white border-2 border-black p-4 shadow-sharp">
          <div className="text-3xl sm:text-4xl font-black text-black">{safeEval.wordsPerMinute ?? 0}</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">WORDS / MIN</div>
        </div>
        <div className="bg-white border-2 border-black p-4 shadow-sharp">
          <div className="text-3xl sm:text-4xl font-black text-red-600">{safeEval.fillerWords ?? 0}</div>
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mt-1">FILLER WORDS</div>
        </div>
      </div>

      {/* STRENGTHS & IMPROVEMENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 font-mono">
        <div className="border-2 border-black bg-white p-6 shadow-sharp">
          <h3 className="text-xs font-black uppercase text-black mb-4 tracking-widest border-b border-black pb-2 flex items-center gap-2">
            <span className="text-red-600 font-bold">✓</span> KEY STRENGTHS
          </h3>
          <ul className="space-y-3 text-xs text-gray-800 leading-relaxed">
            {strengthsList.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-600 font-bold">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-2 border-black bg-white p-6 shadow-sharp">
          <h3 className="text-xs font-black uppercase text-black mb-4 tracking-widest border-b border-black pb-2 flex items-center gap-2">
            <span className="text-red-600 font-bold">⚡</span> FOCUS FOR NEXT TIME
          </h3>
          <ul className="space-y-3 text-xs text-gray-800 leading-relaxed">
            {improvementsList.map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-600 font-bold">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SPEECH TRANSCRIPT */}
      <div className="border-2 border-black bg-white p-6 mb-8 shadow-sharp">
        <h3 className="text-xs font-mono font-black uppercase tracking-widest text-red-600 mb-3">
          // SPEECH TRANSCRIPT
        </h3>
        <p className="text-sm font-mono text-gray-900 leading-relaxed bg-gray-50 border border-black p-4 italic">
          "{transcript || 'No spoken audio recorded.'}"
        </p>
      </div>

      {/* RETRY BUTTON */}
      <div className="text-center pb-8">
        <button
          onClick={onRetry}
          className="px-8 py-4 bg-red-600 text-white font-mono font-black text-xs sm:text-sm uppercase tracking-widest border-2 border-black shadow-sharp hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
        >
          TRY ANOTHER TOPIC ➔
        </button>
      </div>
    </div>
  );
}