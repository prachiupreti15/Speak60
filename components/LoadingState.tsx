import React from 'react';

export default function LoadingState({ message = 'PROCESSING YOUR AUDIO' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-12 h-12 border-2 border-cream-200 border-t-brand-red animate-spin mb-6" />
      <h3 className="font-mono text-sm tracking-widest uppercase font-bold text-cream-900 mb-2">{message}</h3>
    </div>
  );
}
