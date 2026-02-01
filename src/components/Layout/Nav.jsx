import React, { useState, useEffect } from 'react';
import { User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';

export default function CivicPulseNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const location = useLocation();
  const { user, logout } = useAuth();

  // Determine active link based on current path
  const getActiveLink = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/report-issue') return 'report';
    if (path === '/dashboard') return 'dashboard';
    return 'home';
  };

  const activeLink = getActiveLink();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[1500] bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'
          }`}
        style={{ height: '64px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
          {/* Left: Logo + Name */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
            <div className="">
              <div className="font-bold text-gray-900 text-lg">CivicPulse</div>
              <div className="text-xs text-gray-500 -mt-1">Citizen Issues. Public Action.</div>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${activeLink === 'home'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Home
            </Link>
            <Link
              to="/report-issue"
              className={`text-sm font-medium transition-colors ${activeLink === 'report'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Report Issue
            </Link>
            <Link
              to="/dashboard"
              className={`text-sm font-medium transition-colors ${activeLink === 'dashboard'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Community
            </Link>
            {user && user.role === 'admin' && (
              <Link
                to="/admin"
                className={`text-sm font-medium transition-colors ${activeLink === 'admin'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                Admin
              </Link>
            )}
          </div>

          {/* Right: User Action + Mobile Hamburger */}
          <div className="flex items-center gap-3 md:gap-6">
            {!user ? (
              <>
                <span className="hidden sm:inline-flex text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Guest Mode
                </span>
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full border border-gray-200 object-cover"
                  />
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900 leading-none">{user.name}</div>
                    <div className="text-xs text-gray-500 mt-1">Citizen</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 duration-100">
                    <div className="px-4 py-3 border-b border-gray-100 md:hidden">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      {user.role === 'guest' ? (
                        <>
                          <LogOut className="w-4 h-4 rotate-180" />
                          Exit Guest Mode
                        </>
                      ) : (
                        <>
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger button - visible only on mobile/tablet */}
            <button
              className="md:hidden text-gray-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay / Dropdown */}
      <div
        className={`md:hidden fixed inset-x-0 top-[64px] bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-[1400] ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-6 space-y-5">
          <Link
            to="/"
            className={`block w-full text-left text-base font-medium py-2 px-4 rounded-lg transition-colors ${activeLink === 'home'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            Home
          </Link>

          <Link
            to="/report-issue"
            className={`block w-full text-left text-base font-medium py-2 px-4 rounded-lg transition-colors ${activeLink === 'report'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            Report Issue
          </Link>

          <Link
            to="/dashboard"
            className={`block w-full text-left text-base font-medium py-2 px-4 rounded-lg transition-colors ${activeLink === 'dashboard'
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            Community
          </Link>

          {user && user.role === 'admin' && (
            <Link
              to="/admin"
              className={`block w-full text-left text-base font-medium py-2 px-4 rounded-lg transition-colors ${activeLink === 'admin'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              Admin
            </Link>
          )}

          {/* Guest mode notice in mobile menu */}
          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 text-red-600 px-2 py-2 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
                >
                  {user.role === 'guest' ? (
                    <>
                      <LogOut className="w-4 h-4 rotate-180" />
                      Exit Guest Mode
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Guest Mode
                </span>
                <button
                  onClick={() => {
                    setLoginModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToSignup={() => {
          setLoginModalOpen(false);
          setSignupModalOpen(true);
        }}
      />
      <SignupModal
        isOpen={signupModalOpen}
        onClose={() => setSignupModalOpen(false)}
        onSwitchToLogin={() => {
          setSignupModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </>
  );
}