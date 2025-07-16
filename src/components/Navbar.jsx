import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const currentUser = "Umar";

  const handleLogout = () => navigate("/");

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      {/* Mobile Navigation */}
      <div className="md:hidden fixed w-full z-50 bg-white border-b border-neutral-200">
        <div className="p-4 flex justify-between items-center">
          <Link
            to="/"
            className="text-lg font-semibold text-neutral-800 flex items-center"
          >
            <i className="fas fa-hammer mr-2 text-blue-500"></i>CraftConnect
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-neutral-600 focus:outline-none"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="bg-white border-t border-neutral-200 shadow-sm">
            {[
              { to: "/", label: "Home", icon: "fa-home" },
              { to: "/search", label: "Find Artisans", icon: "fa-search" },
              {
                to: "/artisan",
                label: "Artisan Dashboard",
                icon: "fa-toolbox",
              },
              { to: "/contact", label: "Contact", icon: "fa-envelope" },
            ].map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `block py-3 px-6 ${
                    isActive
                      ? "bg-neutral-100 text-neutral-900 font-medium"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                <i className={`fas ${icon} mr-3`}></i>
                {label}
              </NavLink>
            ))}
            <div className="border-t py-3 px-6">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-neutral-800 text-white py-2 rounded hover:bg-neutral-700 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center bg-neutral-800 text-white py-2 rounded hover:bg-neutral-700 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
              <p className="text-center mt-2 text-sm text-neutral-600">
                Don't have an account?
                <Link
                  to="/signup"
                  className="text-blue-600 hover:underline ml-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-semibold text-neutral-800 flex items-center"
            >
              <i className="fas fa-hammer mr-2 text-blue-500"></i>CraftConnect
            </Link>

            {/* Nav Links */}
            <nav className="hidden lg:flex space-x-6">
              {[
                { to: "/", label: "Home" },
                { to: "/search", label: "Find Artisans" },
                { to: "/artisan", label: "Temporal For An Artisan" },
                { to: "/contact", label: "Contact" },
                { to: "/admin", label: "Temporal For Admin" },
                { to: "/signup", label: "SignUp" },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium ${
                      isActive
                        ? "text-neutral-900 border-b-2 border-blue-500 pb-1"
                        : "text-neutral-700 hover:text-neutral-900 hover:border-b-2 hover:border-blue-300 pb-1"
                    } transition`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <>
                  <Link
                    to="/homeowner"
                    className="bg-neutral-800 text-white text-sm font-medium px-4 py-2 rounded hover:bg-neutral-700 transition"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-neutral-700 hover:text-neutral-900 text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-neutral-700 hover:text-neutral-900 text-sm font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-neutral-800 text-white text-sm font-medium px-4 py-2 rounded hover:bg-neutral-700 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
