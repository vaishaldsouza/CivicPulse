import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (email, password, role = 'community') => {
        // Enforce Admin Credentials
        if (role === 'admin') {
            if (email !== 'admin@civicpulse.com' || password !== 'admin123') {
                throw new Error('Invalid admin credentials');
            }
        }

        // Mock login logic
        setUser({
            name: role === 'admin' ? 'Administrator' : 'Minora Dias',
            email: email,
            role: role,
            // Using a nice avatar generator
            avatar: `https://ui-avatars.com/api/?name=${role === 'admin' ? 'Admin' : 'Minora+Dias'}&background=${role === 'admin' ? '4f46e5' : '2563eb'}&color=fff`
        });
    };

    const signup = (name, email, password, role = 'community') => {
        // Mock signup logic
        setUser({
            name: name,
            email: email,
            role: role,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`
        });
    };

    const guestLogin = () => {
        setUser({
            name: 'Guest User',
            role: 'guest',
            avatar: `https://ui-avatars.com/api/?name=Guest+User&background=64748b&color=fff`
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, guestLogin, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
