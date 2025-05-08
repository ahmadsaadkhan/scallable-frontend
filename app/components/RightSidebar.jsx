'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RightSidebar() {
  const router = useRouter();

  const initialSuggestedPages = [
    'NatureLovers',
    'UrbanShots',
    'Wanderlust',
    'FoodieClicks',
    'PetParadise',
  ];

  const [followedPages, setFollowedPages] = useState([]);

  const handleFollow = (page) => {
    setFollowedPages((prev) =>
      prev.includes(page)
        ? prev.filter((p) => p !== page)
        : [...prev, page]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Or your preferred auth token key
    router.push('/login');
  };

  return (
    <div className="hidden lg:flex flex-col justify-between px-4 py-6 w-64">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Suggested for You</h2>
        <ul className="space-y-4">
          {initialSuggestedPages.map((page) => (
            <li key={page} className="flex justify-between items-center">
              <span className="text-gray-700">{page}</span>
              <button
                onClick={() => handleFollow(page)}
                className={`text-xs font-medium px-3 py-1 rounded ${
                  followedPages.includes(page)
                    ? 'bg-gray-300 text-gray-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {followedPages.includes(page) ? 'Following' : 'Follow'}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="text-sm font-semibold px-4 py-2 mt-6 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
