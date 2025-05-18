import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function generateResume({
  name,
  title,
  summary,
  skills,
  experience,
  education,
  includeCover
}: {
  name: string
  title: string
  summary: string
  skills: string
  experience: string
  education: string
  includeCover: boolean
}) {
  const prompt = \`
Create a professional resume for:
Name: \${name}
Title: \${title}
Summary: \${summary}
Skills: \${skills}
Experience: \${experience}
Education: \${education}

\${includeCover ? 'Also generate a 1-paragraph cover letter tailored to this resume.' : ''}
\`

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o',
  })

  return completion.choices[0].message.content
}