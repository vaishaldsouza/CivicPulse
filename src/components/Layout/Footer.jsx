import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Github, Linkedin } from 'lucide-react';

export default function CivicPulseFooter() {
  const { user } = useAuth();
  
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">CivicPulse</h3>
            </div>
            <p className="text-gray-600 text-sm max-w-xs text-center md:text-left">
              Empowering citizens through transparent governance and real-time community action.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">
              Quick Links
            </h4>
            <nav className="flex flex-col items-center md:items-start gap-3">
              <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
              <Link to={user ? "/dashboard" : "/signup"} className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Report Issue</Link>
              <Link to={user?.role === 'Admin' ? '/admin' : '/dashboard'} className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Community</Link>
              {!user && <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">Sign In</Link>}
            </nav>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="mb-6 text-center md:text-right">
              <p className="text-sm text-gray-500">Built for civic engagement</p>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-tight">Hackathon Project • 2026</p>
            </div>
            <div className="flex items-center gap-5 mb-6">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin className="w-6 h-6" /></a>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} CivicPulse.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}