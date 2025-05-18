'use client';
import { useState, useRef } from 'react';
import html2pdf from 'html2pdf.js';

export default function ContentGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('blog');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const resultRef = useRef(null);

  const generateContent = async () => {
    setLoading(true);
    setOutput('');

    const prompt = \`Write a \${type} about: "\${topic}"\`;

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] }),
    });

    const data = await res.json();
    setOutput(data.reply || 'No response.');
    setLoading(false);
  };

  const downloadPDF = () => {
    if (!resultRef.current) return;

    html2pdf()
      .set({ filename: 'content.pdf' })
      .from(resultRef.current)
      .save();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">📝 AI Content Generator</h2>

      <div className="space-y-4">
        <select
          className="w-full border p-2 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="blog post">Blog Post</option>
          <option value="product description">Product Description</option>
          <option value="ad copy">Ad Copy</option>
        </select>

        <input
          className="w-full border p-2 rounded"
          placeholder="Enter topic or product name..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button
          onClick={generateContent}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {output && (
          <>
            <div ref={resultRef} className="mt-6 p-4 border rounded bg-gray-50 whitespace-pre-wrap">
              <h3 className="font-semibold mb-2">Result:</h3>
              {output}
            </div>
            <button
              onClick={downloadPDF}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Download as PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
}
