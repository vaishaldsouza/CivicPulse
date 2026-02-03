import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('civicUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
        localStorage.removeItem('civicUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const role = userData.role === 'Admin' ? 'Admin' : 'Community';
    const userToSave = {
      _id: userData._id || userData.id, // Ensure _id is preserved
      id: userData._id || userData.id,
      name: userData.name,
      email: userData.email,
      role
    };
    setUser(userToSave);
    localStorage.setItem('civicUser', JSON.stringify(userToSave));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civicUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);