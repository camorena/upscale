import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function generateDocumentText({
  type,
  business,
  client,
  purpose,
}: {
  type: string
  business: string
  client: string
  purpose: string
}) {
  const prompt = \`
Create a \${type} for a business named "\${business}" to offer services to "\${client}".
The purpose is: "\${purpose}".
Format it professionally with appropriate structure.
\`

  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-4o',
  })

  return completion.choices[0].message.content
}