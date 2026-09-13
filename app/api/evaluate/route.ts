import { NextRequest, NextResponse } from 'next/server';
import { evaluateSpeech } from '@/lib/evaluation';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { topic, transcript, duration } = await req.json();
    const evaluation = await evaluateSpeech(topic, transcript, duration);

    try {
      await prisma.attempt.create({
        data: {
          topic,
          transcript,
          duration,
          wordCount: evaluation.wordCount,
          wordsPerMinute: evaluation.wordsPerMinute,
          fillerWords: evaluation.fillerWords,
          overallScore: evaluation.overall,
          contentScore: evaluation.content,
          fluencyScore: evaluation.fluency,
          vocabularyScore: evaluation.vocabulary,
          structureScore: evaluation.structure,
          deliveryConfidenceScore: evaluation.deliveryConfidence,
          strengths: evaluation.strengths,
          improvements: evaluation.improvements,
        },
      });
    } catch (dbErr) {
      console.warn('DB storage skipped:', dbErr);
    }

    return NextResponse.json(evaluation);
  } catch {
    return NextResponse.json({ error: 'Evaluation failed' }, { status: 500 });
  }
}
