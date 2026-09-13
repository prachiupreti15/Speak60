import React from 'react';

interface ScoreRingProps {
  score?: number;
  size?: number;
  strokeWidth?: number;
}

export default function ScoreRing({ score = 0, size = 180, strokeWidth = 14 }: ScoreRingProps) {
  const displayScore = score ?? 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center p-3 bg-white border-2 border-black">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F3F4F6"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#DC2626"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="font-mono text-6xl font-black text-black tracking-tighter">
          {displayScore}
        </span>
        <span className="text-[10px] font-mono text-red-600 font-extrabold uppercase tracking-widest mt-1">
          RATING // 100
        </span>
      </div>
    </div>
  );
}