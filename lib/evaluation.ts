import { ai } from './gemini';
import { Evaluation } from '../types/evaluation';
import { calculateWpm, detectFillerWords } from './utils';

export async function evaluateSpeech(
  topic: string,
  transcript: string,
  duration: number
): Promise<Evaluation> {
  const cleanTranscript = transcript.trim();
  const words = cleanTranscript.length > 0 ? cleanTranscript.split(/\s+/) : [];
  const wordCount = words.length;
  const wordsPerMinute = calculateWpm(wordCount, duration);
  const detectedFillers = detectFillerWords(cleanTranscript);

  // Strictly enforce 0-word handling for silent or failed recordings
  if (wordCount === 0) {
    return {
      overall: 0,
      content: 0,
      fluency: 0,
      vocabulary: 0,
      structure: 0,
      deliveryConfidence: 0,
      fillerWords: 0,
      wordCount: 0,
      wordsPerMinute: 0,
      strengths: ['No speech detected during the recording window.'],
      improvements: [
        'Ensure your microphone is unmuted and active.',
        'Speak clearly into the microphone immediately after clicking start.'
      ],
    };
  }

  const prompt = `
You are a strict, precise speech coach evaluating a spontaneous 60-second speech.

TOPIC: "${topic}"
TRANSCRIPT: "${cleanTranscript}"
DURATION: ${duration} seconds
WORD COUNT: ${wordCount} words
WORDS PER MINUTE: ${wordsPerMinute} WPM

Evaluate the response based strictly on the provided transcript text.
Generate numerical scores (0 to 100 integers) and feedback lists.

Return ONLY a raw JSON object with no markdown formatting:
{
  "overall": <number>,
  "content": <number>,
  "fluency": <number>,
  "vocabulary": <number>,
  "structure": <number>,
  "deliveryConfidence": <number>,
  "strengths": [<string>, <string>, <string>],
  "improvements": [<string>, <string>, <string>]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    });

    const text = response.text || '';
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      overall: Math.min(100, Math.max(0, Math.round(Number(parsed.overall) || 50))),
      content: Math.min(100, Math.max(0, Math.round(Number(parsed.content) || 50))),
      fluency: Math.min(100, Math.max(0, Math.round(Number(parsed.fluency) || 50))),
      vocabulary: Math.min(100, Math.max(0, Math.round(Number(parsed.vocabulary) || 50))),
      structure: Math.min(100, Math.max(0, Math.round(Number(parsed.structure) || 50))),
      deliveryConfidence: Math.min(100, Math.max(0, Math.round(Number(parsed.deliveryConfidence) || 50))),
      fillerWords: detectedFillers,
      wordCount,
      wordsPerMinute,
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.slice(0, 3) : ['Attempted response'],
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 3) : ['Elaborate with concrete details'],
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Exact deterministic calculation based on actual WPM and word count if API fails
    const scoreVal = Math.min(95, Math.max(20, Math.round((wordsPerMinute / 130) * 75)));
    return {
      overall: scoreVal,
      content: scoreVal,
      fluency: Math.max(10, scoreVal - detectedFillers * 3),
      vocabulary: scoreVal,
      structure: scoreVal,
      deliveryConfidence: scoreVal,
      fillerWords: detectedFillers,
      wordCount,
      wordsPerMinute,
      strengths: [`Captured ${wordCount} words at ${wordsPerMinute} WPM.`],
      improvements: ['Verify GEMINI_API_KEY environment variable for detailed AI qualitative feedback.'],
    };
  }
}