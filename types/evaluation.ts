export interface Evaluation {
  overall: number;
  content: number;
  fluency: number;
  vocabulary: number;
  structure: number;
  deliveryConfidence: number;
  fillerWords: number;
  wordCount: number;
  wordsPerMinute: number;
  strengths: string[];
  improvements: string[];
}

export interface AttemptResult extends Evaluation {
  id?: string;
  topic: string;
  transcript: string;
  duration: number;
  createdAt?: string;
}
