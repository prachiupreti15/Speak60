import { NextRequest, NextResponse } from 'next/server';
import { getGroqClient } from '@/lib/groq';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob | null;

    console.log('Transcription request:', {
      exists: !!file,
      size: file?.size,
      type: file?.type,
    });

    if (!file || file.size === 0) {
      return NextResponse.json(
        { error: 'Audio file is empty', transcript: '' },
        { status: 400 }
      );
    }

    const groq = getGroqClient();

    if (!groq) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is missing', transcript: '' },
        { status: 500 }
      );
    }

    const fileObject = new File(
      [file],
      'recording.webm',
      { type: file.type || 'audio/webm' }
    );

    console.log('Sending audio to Groq:', {
      name: fileObject.name,
      size: fileObject.size,
      type: fileObject.type,
    });

    const transcription = await groq.audio.transcriptions.create({
      file: fileObject,
      model: 'whisper-large-v3-turbo',
      language: 'en',
    });

    console.log('Groq transcription:', transcription.text);

    return NextResponse.json({
      transcript: transcription.text || '',
    });

  } catch (error: unknown) {
    console.error('========== GROQ ERROR ==========');
    console.error(error);
    console.error('=================================');

    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        error: message,
        transcript: '',
      },
      { status: 500 }
    );
  }
}