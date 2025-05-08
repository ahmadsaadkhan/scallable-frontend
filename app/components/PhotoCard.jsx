'use client';
import { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function PhotoCard({ photo }) {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes] = useState(Math.floor(Math.random() * 1000));

  // Fetch existing comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photo.id}/comments`);
        const data = await res.json();
        setComments(data || []);
      } catch (err) {
        console.error('Failed to fetch comments', err);
      }
    };
    fetchComments();
  }, [photo.id]);

  // Handle submitting a new comment
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photo.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`, // if your API requires a token
        },
        body: JSON.stringify({ text: comment }),
      });
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setComment('');
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 max-w-xl mx-auto">
      {/* Header with Avatar */}
        <div className="flex items-center p-4">
          <img
            src={`https://i.pravatar.cc/40?u=${photo.id}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-3 border border-gray-300"
          />
          <div>
            <p className="font-semibold text-sm text-gray-800">user_{photo.id}</p>
            <p className="text-xs text-gray-500">Just now</p>
          </div>
        </div>

      <Link href={`/consumer/${photo.id}`}>
        {/* Image */}
        <div className="border-y border-gray-300 bg-black">
          <img src={photo.url} alt={photo.title || 'Shared photo'} className="w-full object-cover" />
        </div>
      </Link>
      {/* Icons */}
      <div className="px-4 py-3">
        <div className="flex space-x-4 mb-2">
          <Heart className="text-gray-800 hover:text-red-500 cursor-pointer w-6 h-6" />
          <MessageCircle className="text-gray-800 hover:text-blue-500 cursor-pointer w-6 h-6" />
          <Share2 className="text-gray-800 hover:text-green-500 cursor-pointer w-6 h-6" />
        </div>

        <p className="text-sm font-semibold text-gray-800 mb-1">
          ❤️ {likes} likes
        </p>

        <p className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">user_{photo.id}</span> {photo.title || 'Amazing view!'}
        </p>

        {/* Latest Comment */}
        {comments.length > 0 && (
          <div className="border-t border-gray-200 pt-2">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">{comments[0].author || 'commenter_1'}</span>{' '}
              {comments[0].text}
            </p>
          </div>
        )}

        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="pt-2 flex space-x-2 items-center">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border text-black border-gray-300 rounded-full px-4 py-1 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
