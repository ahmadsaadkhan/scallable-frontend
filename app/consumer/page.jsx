'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import PhotoCard from '../components/PhotoCard';
import Link from 'next/link';

export default function ConsumerPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos`)
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching photos:', err);
          setLoading(false);
        });
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          PhotoShare
        </Link>
        <div className="flex space-x-4">
          {user?.role === 'admin' && (
            <Link
              href="/creator"
              className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Creator View
            </Link>
          )}
          <Link
            href="/consumer"
            className="text-sm font-semibold px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Consumer View
          </Link>
        </div>
      </div>

      {/* Main Feed */}
      <div className="pt-24 flex justify-center">
        <div className="w-full max-w-xl px-4">
          <header className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Explore Stunning Photos</h2>
            <p className="text-sm text-gray-500">Browse beautiful images shared by our community</p>
          </header>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full border-t-4 border-blue-500 h-12 w-12"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
