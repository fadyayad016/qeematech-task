import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; 
import ProtectedRoute from './components/protected/ProtectedRoute';

import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import StudentLessons from './pages/student/StudentLessons';
import FavoritesPage from './pages/student/FavoritesPage'; 
import ProfilePage from './pages/student/ProfilePage';     
import AdminDashboard from './pages/admin/AdminDashboard';
import SchoolSettings from './pages/admin/SchoolSettings';
import Unauthorized from './pages/Unauthorized';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <StudentLessons />
          </ProtectedRoute>
        } />

        <Route path="/favorites" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <FavoritesPage />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute allowedRoles={['STUDENT']}>
            <ProfilePage />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />


        <Route path="/admin/settings" element={
  <ProtectedRoute allowedRoles={['ADMIN']}>
    <SchoolSettings />
  </ProtectedRoute>
} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;