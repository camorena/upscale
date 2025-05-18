'use client'
import { useState } from 'react'

const types = ['Proposal', 'Service Agreement', 'Intro Letter', 'NDA', 'Custom']

export default function DocumentForm({ onGenerate }: { onGenerate: (data: string) => void }) {
  const [type, setType] = useState('Proposal')
  const [business, setBusiness] = useState('')
  const [client, setClient] = useState('')
  const [purpose, setPurpose] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch('/api/document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, business, client, purpose }),
    })
    const { result } = await res.json()
    onGenerate(result)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <select className="input input-bordered w-full" value={type} onChange={(e) => setType(e.target.value)}>
        {types.map(t => <option key={t}>{t}</option>)}
      </select>
      <input className="input input-bordered w-full" placeholder="Business Name" value={business} onChange={(e) => setBusiness(e.target.value)} />
      <input className="input input-bordered w-full" placeholder="Client Name" value={client} onChange={(e) => setClient(e.target.value)} />
      <textarea className="textarea textarea-bordered w-full" placeholder="Purpose or context" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
      <button onClick={handleSubmit} className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Document'}
      </button>
    </div>
  )
}