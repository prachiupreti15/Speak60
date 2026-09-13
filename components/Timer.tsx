import React from 'react';

interface TimerProps {
  secondsLeft: number;
  totalSeconds?: number;
}

export default function Timer({ secondsLeft, totalSeconds = 60 }: TimerProps) {
  const formattedTime = `00:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`;
  const progressPercentage = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="font-mono text-6xl sm:text-7xl font-bold tracking-tight text-cream-900 tabular-nums">
        {formattedTime}
      </div>
      <div className="w-48 h-1 bg-cream-200 overflow-hidden">
        <div className="h-full bg-brand-red transition-all duration-1000 ease-linear" style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>
  );
}
