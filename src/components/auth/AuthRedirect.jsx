import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Redirects to dashboard/admin when user logs in while on /login or /signup.
 * Runs after AuthContext updates, so ProtectedRoute always sees the user.
 */
export default function AuthRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) return;
    const path = location.pathname;
    if (path === '/login' || path === '/signup') {
      const target = user.role === 'Admin' ? '/admin' : '/dashboard';
      navigate(target, { replace: true });
    }
  }, [user, location.pathname, navigate]);

  return null;
}
