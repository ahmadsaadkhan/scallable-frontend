'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/lib/auth';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, role });
      router.push('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-300 rounded-md px-8 py-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold mb-8 font-sans text-gray-800">Create an Account</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold text-sm transition duration-200"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="bg-white text-black border border-gray-300 rounded-md px-6 py-4 mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-semibold hover:underline">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
