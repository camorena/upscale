'use client';
import { useState } from 'react';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([{ role: 'system', content: 'Ask me anything!' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🤖 AI Chatbot</h2>
      <div className="flex-1 space-y-2 overflow-y-auto bg-gray-50 p-4 rounded border">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded ${m.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}>
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
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
}
