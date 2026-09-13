'use client';

import React from 'react';
import Timer from './Timer';

interface RecorderProps {
  isRecording: boolean;
  secondsLeft: number;
  onFinish: () => void;
}

export default function Recorder({ isRecording, secondsLeft, onFinish }: RecorderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 my-6 w-full max-w-2xl mx-auto">
      {/* Live Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 border-2 border-black text-red-600 font-mono text-xs font-bold uppercase tracking-widest shadow-sharp">
        <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping" />
        LIVE RECORDING
      </div>

      {/* Timer Container */}
      <div className="bg-white border-2 border-black p-8 w-full shadow-sharp text-center">
        <Timer secondsLeft={secondsLeft} />
      </div>

      {/* Audio Waveform Bar */}
      <div className="flex items-center justify-center gap-1.5 h-14 w-full max-w-sm bg-white border-2 border-black p-4 shadow-sharp">
        {[40, 70, 30, 85, 60, 95, 45, 75, 55, 90, 35, 80, 50, 65, 30].map((height, idx) => (
          <div
            key={idx}
            className={`w-1.5 bg-red-600 transition-all duration-300 ${
              isRecording ? 'animate-pulse' : 'opacity-20'
            }`}
            style={{
              height: isRecording ? `${Math.max(20, (height * (1 + (idx % 3) * 0.2)) % 100)}%` : '20%',
              animationDelay: `${idx * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* Stop Button */}
      <button
        onClick={onFinish}
        type="button"
        className="px-6 py-3 bg-black text-white font-mono font-bold text-xs uppercase tracking-widest border-2 border-black shadow-sharp hover:bg-red-600 hover:border-red-600 transition-all cursor-pointer"
      >
        FINISH EARLY ➔
      </button>
    </div>
  );
}