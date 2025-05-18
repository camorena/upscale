import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          ScaleUp
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
        </div>
      </div>
    </nav>
  );
}
