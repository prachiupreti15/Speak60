import React from 'react';

interface ScoreItemProps {
  label: string;
  score: number;
}

function ScoreItem({ label, score }: ScoreItemProps) {
  const safeScore = score ?? 0;
  return (
    <div className="space-y-1 py-1">
      <div className="flex justify-between items-center text-[11px] font-mono font-bold tracking-wider uppercase">
        <span className="text-black">{label}</span>
        <span className="px-2 py-0.5 bg-black text-white font-mono font-black text-[11px]">
          {safeScore} / 100
        </span>
      </div>
      <div className="w-full h-3.5 bg-gray-100 border border-black p-0.5 overflow-hidden">
        <div 
          className="h-full bg-red-600 transition-all duration-700 ease-out"
          style={{ width: `${safeScore}%` }}
        />
      </div>
    </div>
  );
}

interface ScoreBreakdownProps {
  content?: number;
  fluency?: number;
  vocabulary?: number;
  structure?: number;
  deliveryConfidence?: number;
}

export default function ScoreBreakdown({
  content = 0,
  fluency = 0,
  vocabulary = 0,
  structure = 0,
  deliveryConfidence = 0,
}: ScoreBreakdownProps) {
  return (
    <div className="space-y-3 font-mono">
      <ScoreItem label="RELEVANCE & DEPTH" score={content} />
      <ScoreItem label="FLUENCY & PACE" score={fluency} />
      <ScoreItem label="VOCAB PRECISION" score={vocabulary} />
      <ScoreItem label="STRUCTURE & LOGIC" score={structure} />
      <ScoreItem label="DELIVERY AURA" score={deliveryConfidence} />
    </div>
  );
}