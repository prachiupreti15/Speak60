'use client';

import { useState, useEffect, useRef } from 'react';
import TopicCard from '@/components/TopicCard';
import Recorder from '@/components/Recorder';
import Evaluation from '@/components/Evaluation';
import LoadingState from '@/components/LoadingState';
import ErrorState from '@/components/ErrorState';
import Button from '@/components/Button';

export default function ChallengePage() {
  const [step, setStep] = useState<'TOPIC' | 'RECORDING' | 'TRANSCRIBING' | 'EVALUATING' | 'RESULTS'>('TOPIC');
  const [topic, setTopic] = useState<any>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [transcript, setTranscript] = useState<string>('');
  const [evaluation, setEvaluation] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  const fetchTopic = async () => {
    try {
      setErrorMessage(null);
      const res = await fetch('/api/topic');
      if (!res.ok) throw new Error('Failed to load topic');
      const data = await res.json();
      setTopic(data);
      setStep('TOPIC');
    } catch {
      setErrorMessage('Could not load topic. Please check your connection.');
    }
  };

  useEffect(() => { 
    fetchTopic(); 
  }, []);

  useEffect(() => {
    if (step === 'RECORDING') {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { 
      if (timerRef.current) clearInterval(timerRef.current); 
    };
  }, [step]);

  const startRecording = async () => {
    try {
      setErrorMessage(null);
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      let options = {};
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          options = { mimeType: 'audio/webm;codecs=opus' };
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          options = { mimeType: 'audio/webm' };
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          options = { mimeType: 'audio/mp4' };
        }
      }

      const mediaRecorder = new MediaRecorder(stream, options);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const mimeType = mediaRecorder.mimeType || 'audio/webm';
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        stream.getTracks().forEach((track) => track.stop());
        
        const elapsedSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
        await processAudio(audioBlob, elapsedSeconds);
      };

      startTimeRef.current = Date.now();
      mediaRecorder.start(250);
      setSecondsLeft(60);
      setStep('RECORDING');
    } catch (err: any) {
      console.error('Microphone error:', err);
      setErrorMessage('Microphone access is required to record your response. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try {
        mediaRecorderRef.current.requestData();
      } catch (e) {
        console.warn('requestData warning:', e);
      }
      mediaRecorderRef.current.stop();
    }
  };

  const processAudio = async (blob: Blob, actualDuration: number) => {
    setStep('TRANSCRIBING');
    try {
      const formData = new FormData();
      formData.append('file', blob, 'speech.webm');

      const transcribeRes = await fetch('/api/transcribe', { method: 'POST', body: formData });
      const { transcript: text } = await transcribeRes.json();
      
      const textToUse = text || '';
      setTranscript(textToUse);

      setStep('EVALUATING');
      const evaluateRes = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic: topic?.text, 
          transcript: textToUse, 
          duration: actualDuration 
        }),
      });

      const evalData = await evaluateRes.json();
      setEvaluation(evalData);
      setStep('RESULTS');
    } catch {
      setErrorMessage('Could not process speech response. Please try again.');
      setStep('TOPIC');
    }
  };

  if (errorMessage) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full px-6 py-12 bg-[#FAF6EE]">
        <ErrorState 
          message={errorMessage} 
          onRetry={() => {
            setErrorMessage(null);
            fetchTopic();
          }} 
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full px-6 py-12 bg-[#FAF6EE]">
      {step === 'TOPIC' && topic && (
        <div className="w-full flex flex-col items-center">
          <TopicCard category={topic.category} topic={topic.text} />
          <div className="flex items-center gap-4 mt-6">
            <Button variant="primary" size="lg" onClick={startRecording}>
              Start speaking
            </Button>
            <Button variant="ghost" size="md" onClick={fetchTopic}>
              Another topic
            </Button>
          </div>
        </div>
      )}

      {step === 'RECORDING' && topic && (
        <div className="w-full text-center">
          <div className="bg-white border-2 border-black p-6 mb-6 max-w-2xl mx-auto shadow-sharp">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-black">
              "{topic.text}"
            </h2>
          </div>
          <Recorder 
            isRecording={true} 
            secondsLeft={secondsLeft} 
            onFinish={stopRecording} 
          />
        </div>
      )}

      {step === 'TRANSCRIBING' && (
        <LoadingState message="TRANSCRIBING YOUR RESPONSE" />
      )}

      {step === 'EVALUATING' && (
        <LoadingState message="BUILDING YOUR FEEDBACK" />
      )}

      {step === 'RESULTS' && evaluation && topic && (
        <Evaluation 
          topic={topic.text} 
          evaluation={evaluation} 
          transcript={transcript} 
          onRetry={fetchTopic} 
        />
      )}
    </div>
  );
}