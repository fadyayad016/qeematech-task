import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get('/profile/me');
        setUser(res.data.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const updateUser = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const userData = res.data.data.user; 
      setUser(userData);
      toast.success('Welcome back!');
      return { success: true, user: userData }; 
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
      return { success: false, error: err };
    }
  };

  const register = async (userData) => {
    try {
      const res = await api.post('/auth/register', userData);
      setUser(res.data.data.user);
      toast.success('Registration successful!');
      return { success: true };
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
      return { success: false, error: err };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      updateUser, 
      loading, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);