'use client'
import ResumeForm from '@/components/ResumeForm'
import ResumePreview from '@/components/ResumePreview'
import { useState } from 'react'

export default function ResumeBuilderPage() {
  const [generated, setGenerated] = useState('')
  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Resume & Cover Letter Builder</h1>
      <ResumeForm onGenerate={setGenerated} />
      {generated && <ResumePreview content={generated} />}
    </main>
  )
}