import { NextRequest, NextResponse } from 'next/server'
import { generateResume } from '@/lib/resume-ai'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await generateResume(body)
  return NextResponse.json({ result })
}