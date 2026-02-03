import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Community'
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("JSON Parse Error:", err);
        setError('Invalid response from server');
        return;
      }
      if (res.ok) {
        const role = data.role === 'Admin' ? 'Admin' : 'Community';
        const target = role === 'Admin' ? '/admin' : '/dashboard';
        console.log("Signup success:", data, "Redirecting to:", target);
        flushSync(() => login({ ...data, role }));
        navigate(target, { replace: true });
      } else {
        setError(data.msg || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Connection to server failed. Is the backend running on port 5000?');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-blue-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join the CivicPulse community</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name" type="text" placeholder="Full Name" required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.name} onChange={handleChange}
          />
          <input
            name="email" type="email" placeholder="Email Address" required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.email} onChange={handleChange}
          />
          <input
            name="password" type="password" placeholder="Password" required
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={formData.password} onChange={handleChange}
          />

          <div className="bg-gray-50 p-1 rounded-2xl border border-gray-200 flex">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${formData.role === 'Community' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
              onClick={() => setFormData({ ...formData, role: 'Community' })}
            >
              Citizen
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-bold transition-all ${formData.role === 'Admin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
              onClick={() => setFormData({ ...formData, role: 'Admin' })}
            >
              Admin
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}