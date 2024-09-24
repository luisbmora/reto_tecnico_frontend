import React, { createContext, useState, useContext, useEffect } from 'react';
import { login, logout, getCurrentUser, isAuthenticated as checkAuth } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    initAuth();
  }, []);

  const loginUser = async (email, password) => {
    const result = await login(email, password);
    setUser(result.user);
    return result;
  };

  const logoutUser = () => {
    logout();
    setUser(null);
  };

  const isAuthenticated = () => {
    return checkAuth();
  };

  const value = {
    user,
    login: loginUser,
    logout: logoutUser,
    isAuthenticated,
  };

  if (loading) {
    return <div>Loading...</div>; // O un componente de carga más elaborado
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};