'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function UploadForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    location: '',
    people: ''
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please choose an image.');

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/photos`, {
        method: 'POST',
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        router.push('/consumer');
      } else {
        alert('Failed to upload image.');
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-8 border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Create New Post</h3>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Choose an image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['title', 'caption', 'location', 'people'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-xs text-gray-500 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 text-sm border text-black border-gray-300 rounded focus:ring-1 focus:ring-indigo-400"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white text-sm font-semibold rounded hover:bg-indigo-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}
