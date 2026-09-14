import { ai } from './gemini';
import { Evaluation } from '../types/evaluation';
import { calculateWpm, detectFillerWords } from './utils';

type AIAnalysis = {
  relevance: number;
  content: number;
  fluency: number;
  vocabulary: number;
  structure: number;
  deliveryConfidence: number;
  strengths: string[];
  improvements: string[];
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(value)));
}

function safeScore(value: unknown): number {
  const n = Number(value);

  if (!Number.isFinite(n)) return 0;

  return clamp(n);
}

export async function evaluateSpeech(
  topic: string,
  transcript: string,
  duration: number
): Promise<Evaluation> {
  const cleanTranscript = transcript.trim();

  const words =
    cleanTranscript.length > 0
      ? cleanTranscript.split(/\s+/)
      : [];

  const wordCount = words.length;

  const safeDuration = Math.max(1, Number(duration) || 1);

  const wordsPerMinute = calculateWpm(
    wordCount,
    safeDuration
  );

  const detectedFillers = detectFillerWords(cleanTranscript);

  /*
   * ---------------------------------------------------------
   * 1. HANDLE SILENCE / EMPTY RECORDINGS
   * ---------------------------------------------------------
   */

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
      strengths: [
        'No speech was detected.'
      ],
      improvements: [
        'Make sure your microphone is active.',
        'Start speaking immediately after the timer begins.',
        'Try to answer the topic with at least one complete idea.'
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 2. VERY SHORT / NON-SPEECH RESPONSES
   * ---------------------------------------------------------
   *
   * These should never receive a high score simply because
   * the user spoke clearly.
   */

  const normalized = cleanTranscript
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();

  const uniqueWords = new Set(normalized.split(/\s+/));

  const obviousNonResponse =
    wordCount <= 3 &&
    (
      uniqueWords.size <= 2 ||
      /^(hello|hi|hey|test|testing|okay|ok|yes|no|yeah|yep|hmm|um|uh)+$/i.test(
        normalized.replace(/\s+/g, ' ')
      )
    );

  if (obviousNonResponse) {
    return {
      overall: 3,
      content: 0,
      fluency: 10,
      vocabulary: 2,
      structure: 0,
      deliveryConfidence: 10,
      fillerWords: detectedFillers,
      wordCount,
      wordsPerMinute,
      strengths: [
        'You produced audible speech.',
      ],
      improvements: [
        'Answer the topic directly instead of using greetings or repeated words.',
        'Develop at least one clear idea.',
        'Use your 60 seconds to explain your opinion or reasoning.',
      ],
    };
  }

  /*
   * ---------------------------------------------------------
   * 3. ASK GEMINI FOR COMPONENT SCORES
   * ---------------------------------------------------------
   *
   * Gemini evaluates the individual dimensions.
   * Our application calculates the final score.
   */

  const prompt = `
You are an extremely strict but fair evaluator for a 60-second spontaneous speaking exercise.

The user is being evaluated on whether they can think about a topic and communicate a meaningful answer clearly.

TOPIC:
"${topic}"

TRANSCRIPT:
"${cleanTranscript}"

DURATION:
${safeDuration} seconds

WORD COUNT:
${wordCount}

WORDS PER MINUTE:
${wordsPerMinute}

FILLER WORD COUNT:
${detectedFillers}

IMPORTANT RULES:

1. Evaluate ONLY the actual transcript.
2. Do NOT assume ideas that the speaker did not say.
3. Do NOT reward a response simply because it contains many words.
4. Relevance to the topic is extremely important.
5. A greeting, repeated word, or unrelated statement must receive a very low content score.
6. A response that does not meaningfully address the topic should have relevance below 15.
7. If the response is mostly irrelevant, content should be 0-15.
8. A short but relevant answer can receive partial credit.
9. Fluency means how naturally the written transcript appears to flow. Do not invent audio characteristics.
10. Delivery confidence must be conservative because you only have transcript text and timing.
11. Never give high scores merely because the response is long.
12. Do not give a score of 50 by default.
13. Scores must reflect the rubric below.

SCORING RUBRIC

RELEVANCE / CONTENT:

0-10:
No meaningful connection to the topic.

11-30:
Barely addresses the topic or gives an extremely undeveloped response.

31-50:
Addresses the topic but gives only a basic idea.

51-70:
Clearly answers the topic and gives at least one supporting reason or example.

71-85:
Strong answer with multiple developed ideas, reasoning, examples, or nuance.

86-100:
Exceptional depth, specificity, reasoning, examples, and direct engagement with the topic.

STRUCTURE:

0-10:
No discernible structure.

11-30:
Ideas are extremely fragmented or repetitive.

31-50:
Some organization but weak progression.

51-70:
Clear main idea with reasonably organized supporting points.

71-85:
Strong logical progression and clear organization.

86-100:
Exceptionally clear, concise, logical structure with effective transitions and conclusion.

FLUENCY:

0-20:
Extremely fragmented, repetitive, or difficult to follow.

21-40:
Frequent repetitions, fragments, or awkward flow.

41-60:
Generally understandable with noticeable problems.

61-75:
Mostly smooth and coherent.

76-90:
Very smooth and natural.

91-100:
Exceptional fluency with almost no unnecessary repetition or hesitation visible in the transcript.

VOCABULARY:

0-20:
Extremely limited or inappropriate vocabulary.

21-40:
Very basic vocabulary with substantial repetition.

41-60:
Adequate everyday vocabulary.

61-75:
Good variety and generally precise word choice.

76-90:
Strong variety and precise vocabulary.

91-100:
Exceptional range and precision.

DELIVERY CONFIDENCE:

Because you only have transcript text and timing, judge this conservatively.

0-20:
Very little evidence of confident communication.

21-40:
Weak or hesitant communication pattern.

41-60:
Adequate communication.

61-75:
Clear and reasonably assertive communication.

76-90:
Strong, direct communication.

91-100:
Only use this range when the transcript provides unusually strong evidence.

Return ONLY this JSON:

{
  "relevance": 0,
  "content": 0,
  "fluency": 0,
  "vocabulary": 0,
  "structure": 0,
  "deliveryConfidence": 0,
  "strengths": ["string", "string", "string"],
  "improvements": ["string", "string", "string"]
}

All scores must be integers from 0 to 100.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '';

    const cleanJson = text
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanJson) as AIAnalysis;
    console.log('GEMINI RAW RESPONSE:', parsed);

    /*
     * -------------------------------------------------------
     * 4. NORMALIZE GEMINI SCORES
     * -------------------------------------------------------
     */

    const relevance = safeScore(parsed.relevance);
    const content = safeScore(parsed.content);
    const fluency = safeScore(parsed.fluency);
    const vocabulary = safeScore(parsed.vocabulary);
    const structure = safeScore(parsed.structure);
    const deliveryConfidence = safeScore(
      parsed.deliveryConfidence
    );

    /*
     * -------------------------------------------------------
     * 5. CALCULATE OVERALL SCORE OURSELVES
     * -------------------------------------------------------
     *
     * Content/relevance gets the largest weight because
     * Speak60 is about answering the topic, not merely talking.
     */

    let overall =
      relevance * 0.35 +
      content * 0.20 +
      fluency * 0.20 +
      vocabulary * 0.10 +
      structure * 0.10 +
      deliveryConfidence * 0.05;

    /*
     * -------------------------------------------------------
     * 6. RELEVANCE SAFETY CAP
     * -------------------------------------------------------
     *
     * Prevents:
     *
     * Topic: "Should plastic be banned?"
     * Answer: "Hello hello hello"
     *
     * from receiving a high score.
     */

    if (relevance < 10) {
      overall = Math.min(overall, 10);
    } else if (relevance < 20) {
      overall = Math.min(overall, 20);
    } else if (relevance < 30) {
      overall = Math.min(overall, 30);
    }

    /*
     * -------------------------------------------------------
     * 7. VERY SHORT ANSWER PENALTY
     * -------------------------------------------------------
     */

    if (wordCount < 10) {
      overall = Math.min(overall, 25);
    } else if (wordCount < 20) {
      overall = Math.min(overall, 40);
    }

    /*
     * -------------------------------------------------------
     * 8. FILLER PENALTY
     * -------------------------------------------------------
     */

    if (detectedFillers > 5) {
      overall -= Math.min(
        10,
        (detectedFillers - 5) * 1.5
      );
    }

    overall = clamp(overall);

    /*
     * -------------------------------------------------------
     * 9. RETURN FINAL EVALUATION
     * -------------------------------------------------------
     */

    return {
      overall,
      content,
      fluency,
      vocabulary,
      structure,
      deliveryConfidence,
      fillerWords: detectedFillers,
      wordCount,
      wordsPerMinute,

      strengths:
        Array.isArray(parsed.strengths)
          ? parsed.strengths.slice(0, 3)
          : ['You completed the speaking attempt.'],

      improvements:
        Array.isArray(parsed.improvements)
          ? parsed.improvements.slice(0, 3)
          : [
              'Develop your main idea further.',
              'Give specific reasons or examples.',
              'Maintain a clear structure.',
            ],
    };

  } catch (error) {
    console.error('Gemini API Error:', error);

    /*
     * -------------------------------------------------------
     * 10. SAFE FALLBACK
     * -------------------------------------------------------
     *
     * Never invent a high score when Gemini fails.
     */

    const basicFluency = clamp(
      wordsPerMinute >= 90 && wordsPerMinute <= 170
        ? 60
        : wordsPerMinute > 0
          ? 40
          : 0
    );

    const fallbackOverall =
      wordCount < 10
        ? 10
        : Math.min(35, basicFluency);

    return {
      overall: fallbackOverall,
      content: 0,
      fluency: basicFluency,
      vocabulary: 0,
      structure: 0,
      deliveryConfidence: 0,
      fillerWords: detectedFillers,
      wordCount,
      wordsPerMinute,
      strengths: [
        'Your recording was successfully transcribed.',
      ],
      improvements: [
        'Give a clear answer to the topic.',
        'Support your opinion with reasons or examples.',
        'AI evaluation was temporarily unavailable.',
      ],
    };
  }
}