import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Github, Linkedin } from 'lucide-react';

export default function CivicPulseFooter() {
  const { user } = useAuth();
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 md:py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">
          {/* Brand & Tagline */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">CivicPulse</h3>
            </div>
            <p className="text-gray-600 text-sm md:text-base max-w-xs">
              Empowering citizens through transparent governance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-800 mb-4 md:mb-5 uppercase tracking-wide">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/report-issue" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Report Issue
              </Link>
              <Link to="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                Community
              </Link>
              {user && user.role === 'admin' && (
                <Link to="/admin" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                  Admin Panel
                </Link>
              )}
            </nav>
          </div>

          {/* Contact / Social / Credibility */}
          <div className="md:col-span-1 flex flex-col items-center md:items-end">
            <div className="mb-6 md:mb-8">
              <p className="text-sm text-gray-500 mb-2">
                Built for civic engagement
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Hackathon Project • 2026
              </p>
            </div>

            <div className="flex items-center gap-5 mb-6">
              <a
                href="#"
                className="text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="GitHub repository"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="LinkedIn profile or page"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>

            <p className="text-xs md:text-sm text-gray-500">
              © {new Date().getFullYear()} CivicPulse. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}