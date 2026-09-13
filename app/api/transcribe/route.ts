import { NextRequest, NextResponse } from 'next/server';
import { getGroqClient } from '@/lib/groq';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;

    if (!file || file.size === 0) {
      return NextResponse.json({ transcript: '' });
    }

    const groq = getGroqClient();
    if (!groq) {
      console.error('GROQ_API_KEY is missing in process.env');
      return NextResponse.json({ 
        error: 'GROQ_API_KEY not configured in .env', 
        transcript: '' 
      }, { status: 400 });
    }

    const fileObject = new File([file], 'recording.webm', { type: file.type || 'audio/webm' });

    const transcription = await groq.audio.transcriptions.create({
      file: fileObject,
      model: 'whisper-large-v3-turbo',
      language: 'en',
    });

    return NextResponse.json({ transcript: transcription.text || '' });
  } catch (error) {
    console.error('Groq transcription error:', error);
    return NextResponse.json({ transcript: '' }, { status: 500 });
  }
}