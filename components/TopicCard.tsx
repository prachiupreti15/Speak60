import React from 'react';

interface TopicCardProps {
  category: string;
  topic: string;
}

export default function TopicCard({ category, topic }: TopicCardProps) {
  return (
    <div className="w-full text-center max-w-3xl mx-auto py-6">
      <div className="bg-white border-2 border-black p-8 sm:p-12 shadow-sharp">
        <div className="inline-block px-3 py-1 mb-6 text-xs font-mono font-bold tracking-widest uppercase bg-black text-white">
          // {category}
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-black tracking-tight leading-tight mb-6">
          "{topic}"
        </h1>
        <p className="text-xs sm:text-sm font-mono text-gray-500 uppercase tracking-wider font-semibold">
          60 SECONDS // ONE TAKE // ZERO PREPARATION
        </p>
      </div>
    </div>
  );
}