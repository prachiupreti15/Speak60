'use client';
import { useState } from 'react';

export default function Transcript({ transcript }: { transcript: string }) {
  const [expanded, setExpanded] = useState(false);
  if (!transcript) return null;

  return (
    <div className="border border-cream-200 bg-white p-6 my-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-brand-muted">Speech Transcript</h3>
        <button onClick={() => setExpanded(!expanded)} className="text-xs font-medium text-brand-red hover:underline">
          {expanded ? 'Collapse' : 'Expand full text'}
        </button>
      </div>
      <p className={`text-sm sm:text-base text-cream-900 leading-relaxed font-serif ${!expanded ? 'line-clamp-3' : ''}`}>
        "{transcript}"
      </p>
    </div>
  );
}
