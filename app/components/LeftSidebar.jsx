'use client';
import Link from 'next/link';

export default function LeftSidebar() {
  return (
    <div className="hidden md:flex flex-col space-y-4 px-4 py-6 w-64">
      <h2 className="text-xl font-bold text-gray-800">Menu</h2>
      <Link href="#" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link href="#" className="text-gray-700 hover:text-blue-600">Explore</Link>
      <Link href="#" className="text-gray-700 hover:text-blue-600">Notifications</Link>
      <Link href="#" className="text-gray-700 hover:text-blue-600">Messages</Link>
    </div>
  );
}
