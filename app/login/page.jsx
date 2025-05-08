'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../lib/auth';
import { FaFacebookSquare } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      login(data.user, data.token);
      router.push('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-300 rounded-md px-8 py-10 text-center shadow-sm">
          <h1 className="text-4xl font-bold mb-8 font-sans text-gray-800 tracking-wide">PhotoShare</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Phone number, username, or email"
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
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold text-sm transition duration-200"
            >
              Log In
            </button>
          </form>

          <div className="my-4 flex items-center justify-center text-gray-400 text-xs">
            <div className="border-t border-gray-300 w-1/4"></div>
            <span className="px-2">OR</span>
            <div className="border-t border-gray-300 w-1/4"></div>
          </div>

          <button className="flex items-center justify-center space-x-2 text-blue-900 font-medium text-sm mb-3">
            <FaFacebookSquare size={18} />
            <span>Log in with Facebook</span>
          </button>

          <a href="#" className="text-xs text-blue-900 hover:underline">
            Forgotten your password?
          </a>
        </div>

        <div className="bg-white text-black border border-gray-300 rounded-md px-6 py-4 mt-4 text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 font-semibold hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
