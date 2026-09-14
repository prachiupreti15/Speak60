WORKING LINK - https://speak60.vercel.app/
# SPEAK60

> **Master unscripted speaking under pressure.**  
> A spontaneous 60-second speech challenge built with Next.js App Router, real-time transcription (Whisper), and AI coaching (Gemini).

---

## Design System

Speak60 follows a strict Brutalist Editorial Chic design system:
* **Canvas Background:** Rich Golden-Butter Yellow (`#F4E4BC` / `#FAF6EE`)
* **Borders & Shadows:** Crisp 2px solid black borders paired with 4px hard offset black shadows (`shadow-sharp`)
* **Accents:** Crimson Red (`#DC2626` / `#E53935`) for focal indicators and ratings
* **Typography:** A high-contrast mix of Serif (Playfair Display / Georgia), Sans-serif, and Monospace labels

---

## Key Features

* **Zero-Prep Random Prompts:** Instant topic generation spanning Technology, Business, Education, Society, and Hypothetical categories.
* **Live Audio Capture & Visualizer:** Browser-native MediaRecorder integration with dynamic animated waveform indicators and hardware constraint fallbacks.
* **Automated Speech Transcription:** High-speed audio-to-text conversion using Groq's Whisper Turbo model.
* **Granular AI Evaluation Engine:** Multi-dimensional scoring evaluating:
  * **Relevance & Depth** (Content score)
  * **Fluency & Pace** (Rhythm and continuity)
  * **Vocabulary Precision** (Sophistication & word variety)
  * **Structure & Logic** (Opening, supporting argument, resolution)
  * **Delivery Aura** (Confidence & stability)
* **Real-Time Metrics:** Automatic calculation of Words Per Minute (WPM), total word count, and detected filler words (*um, uh, like, actually, basically*).

---

## Tech Stack

* **Framework:** Next.js 15 App Router
* **Language:** TypeScript
* **Styling:** Tailwind CSS v3
* **Database & ORM:** PostgreSQL + Prisma
* **Speech-to-Text:** Groq SDK (Whisper Large V3 Turbo)
* **AI Evaluation Engine:** Google Gen AI SDK (Gemini 2.5 Flash)

---

## Project Structure

```text
speak60/
├── app/
│   ├── api/
│   │   ├── evaluate/     # AI Evaluation endpoint (Gemini + Prisma persistence)
│   │   ├── topic/        # Random prompt selector endpoint
│   │   └── transcribe/  # Speech-to-text endpoint (Groq Whisper)
│   ├── challenge/        # Multi-step stateful challenge flow
│   ├── globals.css       # Custom utility classes & color design tokens
│   ├── layout.tsx        # Centralized RootLayout (Navbar & Footer)
│   └── page.tsx          # Editorial Hero Landing Page
├── components/
│   ├── Button.tsx        # Brutalist primary/ghost button variants
│   ├── Evaluation.tsx    # Comprehensive scorecard and metric dashboard
│   ├── Header.tsx        # Global navigation bar
│   ├── Recorder.tsx      # Timer and live audio waveform visualizer
│   ├── ScoreBreakdown.tsx# Custom progress meters with score badges
│   ├── ScoreRing.tsx     # SVG radial overall score display
│   └── TopicCard.tsx     # High-contrast boxed prompt renderer
├── lib/
│   ├── evaluation.ts    # Gemini prompt engineering & score parsing
│   ├── gemini.ts        # Google GenAI client initialization
│   ├── groq.ts          # Groq SDK client initialization
│   ├── prisma.ts        # Global Prisma singleton instance
│   ├── topics.ts        # Prompt database & category router
│   └── utils.ts         # WPM calculations & filler word detection regex
├── prisma/
│   └── schema.prisma    # PostgreSQL Attempt model schema
└── types/
    └── evaluation.ts    # Strict TypeScript interfaces for evaluation outputs
