import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = "Umar"; // Replace with auth context when ready

  const handleLogout = () => {
    // Clear auth here if using auth context
    navigate("/");
  };

  return (
    <header className="bg-[#ffffff]/80 backdrop-blur-2xl sticky top-0 z-50 //shadow-sm border-b-2 shadow-2xl border-gray-600">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold flex items-center space-x-2 text-gray-900"
          >
            <span>CraftConnect</span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex space-x-1 bg-white rounded-full px-2 py-1 shadow-inner border border-gray-100">
            {[
              { to: "/", label: "Home" },
              { to: "/search", label: "Find Artisans" },
              
              { to: "/contact", label: "Contact" },
              { to: "/safety", label: "Safety Tips" },
              { to: "/artisan", label: "Artisan" },
              { to: "/admin", label: "Admin" },
           
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-5 py-2 text-sm font-medium rounded-full transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                  Logout
                </button>
                <Link
                  to="/homeowner"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition shadow-md"
                >
                  My Dashboard
                </Link>

                <div className="hidden pl-10 md:flex items-center space-x-1">
                  <span className="text-sm  text-gray-600">Hi,</span>
                  <span className="text-sm font-medium text-gray-800">
                    {currentUser}
                  </span>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-2">
          <div className="flex space-x-1 overflow-x-auto pb-2 no-scrollbar">
            {[
              { to: "/", label: "Home" },
              { to: "/search", label: "Artisans" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex-shrink-0 px-4 py-2 text-xs font-medium rounded-full ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
