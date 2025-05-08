'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import PhotoCard from './components/PhotoCard';
import UploadForm from './components/UploadForm';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Link from 'next/link';

export default function ConsumerPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

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
    <div className="min-h-screen bg-gray-100 pt-20">
      {/* Top Nav */}
      <div className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600">
          PhotoShare
        </Link>
        <div className="flex space-x-4">
          {user?.role === 'admin' && (
            <button
              onClick={() => setShowUploadForm((prev) => !prev)}
              className="text-sm font-semibold px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Post
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Left Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <LeftSidebar />
        </div>

        {/* Main Feed */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 px-4">
          <header className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Explore Stunning Photos</h2>
            <p className="text-sm text-gray-500">Browse beautiful images shared by our community</p>
          </header>
          <div className="flex justify-center">
            <div className="w-full max-w-xl px-4">
              {/* UploadForm renders here */}
              {user?.role === 'admin' && showUploadForm && <UploadForm />}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full border-t-4 border-blue-500 h-12 w-12"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {photos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-1">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
