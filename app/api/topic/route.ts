import { NextResponse } from 'next/server';
import { getRandomTopic } from '@/lib/topics';
export async function GET() { return NextResponse.json(getRandomTopic()); }
