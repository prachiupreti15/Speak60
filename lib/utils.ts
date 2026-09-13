export function calculateWpm(wordCount: number, durationSeconds: number): number {
  if (!durationSeconds || durationSeconds <= 0) return 0;
  return Math.round((wordCount / durationSeconds) * 60);
}

export function detectFillerWords(transcript: string): number {
  const fillers = [
    'um', 'uh', 'like', 'you know', 'so', 'actually', 'basically',
    'literally', 'i mean', 'kind of', 'sort of', 'ah', 'er'
  ];
  const normalized = transcript.toLowerCase();
  let count = 0;
  
  fillers.forEach((filler) => {
    const regex = new RegExp(`\\b${filler}\\b`, 'g');
    const matches = normalized.match(regex);
    if (matches) {
      count += matches.length;
    }
  });

  return count;
}
