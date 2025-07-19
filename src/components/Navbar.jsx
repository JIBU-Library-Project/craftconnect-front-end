import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  
  const currentUser = "Umar"; // Replace with auth context when ready

  const handleLogout = () => {
    // Clear auth here if using auth context
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white backdrop-blur-2xl sticky top-0 z-50 shadow-sm border-b border-gray-200">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold flex items-center text-gray-900"
          >
            <span>CraftConnect</span>
          </Link>

          {/* Desktop Nav Links */}
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
                  `px-4 py-1.5 text-sm font-medium rounded-full transition ${
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
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hi,</span>
                  <span className="text-sm font-medium text-gray-800">
                    {currentUser}
                  </span>
                </div>
                <Link
                  to="/homeowner"
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full hover:bg-indigo-700 transition shadow-md flex items-center gap-1"
                >
                  <FiUser size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition flex items-center gap-1"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 w-[60vw] h-fit //h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full overflow-y-auto p-4 space-y-3">
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
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-base font-medium rounded-md ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {currentUser ? (
            <div className="pt-3 border-t border-gray-200 mt-3 space-y-3">
              <div className="px-4 py-2 text-sm text-gray-500">
                Logged in as <span className="font-medium">{currentUser}</span>
              </div>
              <Link
                to="/homeowner"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                My Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md mt-3"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-whit bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Navbar;