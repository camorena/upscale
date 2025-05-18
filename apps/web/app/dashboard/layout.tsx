import { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-6 border-r space-y-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">ScaleUp Tools</h2>
        <nav className="space-y-2">
          <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">Overview</Link>
          <Link href="/dashboard/chatbot" className="block text-gray-700 hover:text-blue-600">AI Chatbot</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}
