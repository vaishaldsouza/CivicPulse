import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 px-6 sticky top-0 z-[1000]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          CivicPulse<span className="text-gray-900">.</span>
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link 
                to={user.role === 'Admin' ? '/admin' : '/dashboard'} 
                className="text-sm font-bold text-gray-600 hover:text-blue-600 transition-colors"
              >
                {user.role === 'Admin' ? 'Admin Panel' : 'My Dashboard'}
              </Link>
              
              <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-gray-900 leading-none">{user.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{user.role}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600 transition-all active:scale-95"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}