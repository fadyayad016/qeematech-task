import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../common/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600">
          QeemaTech
        </Link>

        <div className="flex items-center gap-6">
          {user?.role === "STUDENT" && (
            <>
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Lessons
              </Link>
              <Link
                to="/favorites"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                My Profile
              </Link>
            </>
          )}
          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/admin/settings"
                cclassName="text-gray-600 hover:text-blue-600 font-medium"
              >
                School Profile
              </Link>
            </>
          )}

          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-gray-200">
            <span className="text-sm font-semibold text-gray-700">
              {user?.fullName}
            </span>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="py-1 px-4 text-sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
