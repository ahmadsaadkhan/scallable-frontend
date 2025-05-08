'use client';
import { useState } from 'react';

export default function CommentBox({ photoId, onCommentAdded }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('Comment is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos/${photoId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ photoId, comment }),
      });

      if (!response.ok) throw new Error('Failed to submit comment');

      setSuccess('Comment submitted!');
      setComment('');

      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setError('Error submitting comment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <textarea
        className="w-full p-3 border text-black border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows="3"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
        >
          {loading ? 'Submitting...' : 'Post'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
    </form>
  );
}
