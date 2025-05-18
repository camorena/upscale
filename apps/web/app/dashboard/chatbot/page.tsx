'use client'
import { useState, useRef, useEffect } from 'react'

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: 'Ask me anything!' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const newMessages = [...messages, { role: 'user', content: input }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok) throw new Error('Chat API failed')

      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: 'assistant', content: '⚠️ Something went wrong.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🤖 AI Chatbot</h2>

      <div
        ref={chatRef}
        role="log"
        aria-live="polite"
        className="flex-1 space-y-2 overflow-y-auto bg-gray-50 p-4 rounded border h-[60vh]">
        {messages.map((m, i) => (
          <div
            key={`${m.role}-${i}`}
            className={`p-2 rounded ${
              m.role === 'user'
                ? 'bg-blue-100 text-right'
                : 'bg-gray-200 text-left'
            }`}>
            <span className="block text-sm text-gray-600">{m.role}</span>
            <p>{m.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          className="flex-1 p-2 border rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a question..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  )
}
