'use client'
import { useState } from 'react'

export default function ResumeForm({ onGenerate }: { onGenerate: (data: string) => void }) {
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [skills, setSkills] = useState('')
  const [experience, setExperience] = useState('')
  const [education, setEducation] = useState('')
  const [includeCover, setIncludeCover] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    const res = await fetch('/api/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, title, summary, skills, experience, education, includeCover }),
    })
    const { result } = await res.json()
    onGenerate(result)
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      <input className="input input-bordered w-full" placeholder="Your Full Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="input input-bordered w-full" placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="textarea textarea-bordered w-full" placeholder="Summary or Career Objective" value={summary} onChange={(e) => setSummary(e.target.value)} />
      <input className="input input-bordered w-full" placeholder="Skills (comma separated)" value={skills} onChange={(e) => setSkills(e.target.value)} />
      <textarea className="textarea textarea-bordered w-full" placeholder="Work Experience (roles, companies, years)" value={experience} onChange={(e) => setExperience(e.target.value)} />
      <textarea className="textarea textarea-bordered w-full" placeholder="Education background" value={education} onChange={(e) => setEducation(e.target.value)} />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={includeCover} onChange={(e) => setIncludeCover(e.target.checked)} />
        Include Cover Letter
      </label>
      <button onClick={handleSubmit} className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>
    </div>
  )
}