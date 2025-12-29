import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
console.log("Debug Auth:", { userRole: user?.role, allowed: allowedRoles, match: allowedRoles.includes(user?.role) });
 if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
}

  return children;
};

export default ProtectedRoute;