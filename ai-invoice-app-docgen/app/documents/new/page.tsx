'use client'
import DocumentForm from '@/components/DocumentForm'
import DocumentPreview from '@/components/DocumentPreview'
import { useState } from 'react'

export default function NewDocumentPage() {
  const [generated, setGenerated] = useState('')
  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Generate a Business Document</h1>
      <DocumentForm onGenerate={setGenerated} />
      {generated && <DocumentPreview content={generated} />}
    </main>
  )
}