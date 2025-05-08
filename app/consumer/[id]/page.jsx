'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import CommentBox from '../../components/CommentBox';
import Link from 'next/link';

export default function PhotoDetailPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const photoId = params?.id;

  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  const fetchPhotoAndComments = async () => {
    setLoading(true);
    try {
      const [photoRes, commentsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photoId}`),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photoId}/comments`)
      ]);

      const photoData = await photoRes.json();
      const commentsData = await commentsRes.json();

      setPhoto(photoData);
      setComments(commentsData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photoId}/comments`);
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  useEffect(() => {
    if (user && photoId) {
      fetchPhotoAndComments();
    }
  }, [photoId, user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-6">
        <Link href="/" className="text-3xl font-bold text-black hover:text-gray-700">
          PhotoShare
        </Link>
      </header>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden max-w-5xl mx-auto">
          {/* Left - Photo */}
          <div className="w-full md:w-1/2 bg-black flex justify-center items-center">
            <img
              src={photo?.url}
              alt={photo?.caption || 'Uploaded photo'}
              className="w-full h-full object-contain max-h-[80vh]"
            />
          </div>

          {/* Right - Comments */}
          <div className="w-full md:w-1/2 flex flex-col justify-between p-4 space-y-4">
            {/* Caption */}
            <div>
              <p className="text-gray-800 font-semibold mb-2">
                user_{photo?.id}
              </p>
              {photo?.caption && (
                <p className="text-sm text-gray-700 mb-4">{photo.caption}</p>
              )}
            </div>

            {/* Comment Box */}
            <div>
              <CommentBox photoId={photoId} onCommentAdded={fetchComments} />
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto border-t pt-4 space-y-3 max-h-[400px]">
              {comments.length === 0 ? (
                <p className="text-sm text-black">No comments yet. Be the first!</p>
              ) : (
                comments.map((comment, idx) => (
                  <div key={idx} className="border-b pb-2">
                    <p className="text-sm">
                      <span className="font-semibold text-black">{comment.comment}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
