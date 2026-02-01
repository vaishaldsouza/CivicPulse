import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        // Ideally this shouldn't happen if RoleSelectionModal works, but safeguard:
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // If role not allowed, unauthorized. Redirect to home or show error.
        return <Navigate to="/" replace />;
    }

    return children;
}
