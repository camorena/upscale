import { NextRequest, NextResponse } from 'next/server'
import { generateDocumentText } from '@/lib/document-ai'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await generateDocumentText(body)
  return NextResponse.json({ result })
}