import React, { useState } from 'react';
import { Users, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function RoleSelectionModal() {
    const { user, guestLogin } = useAuth();
    const [showLoginFor, setShowLoginFor] = useState(null); // 'admin' or 'community'
    const [isSignup, setIsSignup] = useState(false);

    // If user is already logged in (including as guest), don't show this modal
    if (user) return null;

    if (showLoginFor) {
        if (isSignup) {
            return (
                <SignupModal
                    isOpen={true}
                    onClose={() => {
                        setShowLoginFor(null);
                        setIsSignup(false);
                    }}
                    targetRole={showLoginFor}
                    onSwitchToLogin={() => setIsSignup(false)}
                />
            );
        }
        return (
            <LoginModal
                isOpen={true}
                onClose={() => setShowLoginFor(null)}
                targetRole={showLoginFor}
                onSwitchToSignup={() => setIsSignup(true)}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="p-6 md:p-10 text-center">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">Welcome to CivicPulse</h1>
                    <p className="text-gray-500 mb-6 md:mb-10 max-w-md mx-auto text-sm md:text-base">
                        Please select how you would like to access the platform.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                        {/* Community Option */}
                        <button
                            onClick={() => setShowLoginFor('community')}
                            className="group relative p-5 md:p-6 border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 text-left"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Community Member</h3>
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                                Report issues, track progress, and view community dashboards.
                            </p>
                        </button>

                        {/* Admin Option */}
                        <button
                            onClick={() => setShowLoginFor('admin')}
                            className="group relative p-5 md:p-6 border-2 border-gray-100 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 text-left"
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                                <Shield className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">Administrator</h3>
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed">
                                Manage issues, oversee official responses, and analyze data.
                            </p>
                        </button>
                    </div>

                    {/* Guest Option */}
                    <div className="flex justify-center">
                        <button
                            onClick={guestLogin}
                            className="text-gray-500 hover:text-gray-900 font-medium text-sm flex items-center gap-2 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            Continue as Guest
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
