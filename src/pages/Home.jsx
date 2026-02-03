import React, { useState } from 'react';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    setShowSignup(true);
  };

  const closeModals = () => {
    setShowLogin(false);
    setShowSignup(false);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {!showLogin && !showSignup && (
        <div className="max-w-4xl w-full text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Welcome to CivicPulse</h1>
          <p className="text-xl text-gray-600 mb-12">Please select how you would like to access the platform.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <button 
              onClick={() => handleRoleSelection('community')}
              className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-blue-500"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                <span className="text-blue-600 group-hover:text-white text-2xl">👥</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Community Member</h2>
              <p className="text-gray-600">Report issues, track progress, and view community dashboards.</p>
            </button>

            <button 
              onClick={() => handleRoleSelection('admin')}
              className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-indigo-500"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                <span className="text-indigo-600 group-hover:text-white text-2xl">🛡️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Administrator</h2>
              <p className="text-gray-600">Manage issues, oversee official responses, and analyze data.</p>
            </button>
          </div>
        </div>
      )}

      {showSignup && (
        <SignupModal 
          role={selectedRole} 
          onClose={closeModals} 
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

      {showLogin && (
        <LoginModal 
          onClose={closeModals} 
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
    </div>
  );
}