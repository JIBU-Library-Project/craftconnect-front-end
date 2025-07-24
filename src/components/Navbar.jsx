import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../services/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  console.log(user);

  const dashboardLink =
    user?.role === "artisan"
      ? "/artisan"
      : user?.role === "admin"
      ? "/admin"
      : "/homeowner";

  const greetingName =
    user?.role === "artisan" ? user?.businessName : user?.name?.split(" ")[0];

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
            CraftConnect
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-1 bg-white rounded-full px-2 py-1 shadow-inner border border-gray-100">
            {[
              { to: "/", label: "Home" },
              { to: "/search", label: "Find Artisans" },
              { to: "/contact", label: "Contact" },
              // { to: "/safety", label: "Safety Tips" },
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
            {user ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hi,</span>
                  <span className="text-sm font-medium text-gray-800">
                    {greetingName}
                  </span>
                </div>
                <Link
                  to={dashboardLink}
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
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium rounded-xl bg-indigo-600 text-gray-100 hover:text-gray-200 transition"
                >
                  Signup
                </Link>
              </div>
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

      {/* Mobile Overlay with Logo and Close Icon */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-white bg-opacity-30 z-40 flex justify-between items-center px-4 h-16">
            <Link
              to="/"
              className="text-lg font-bold text-gray-900"
              onClick={toggleMobileMenu}
            >
              CraftConnect
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-900 hover:text-gray-400 focus:outline-none"
              aria-label="Close menu"
            >
              <FiX size={28} />
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="fixed top-16 right-0 w-[80vw] max-w-xs bg-white shadow-lg z-50 p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
            {[
              { to: "/", label: "Home" },
              { to: "/search", label: "Find Artisans" },
              { to: "/contact", label: "Contact" },
              // { to: "/safety", label: "Safety Tips" },
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

            {user ? (
              <div className="pt-3 border-t border-gray-200 mt-3 space-y-3">
                <div className="px-4 py-2 text-sm text-gray-500">
                  Logged in as{" "}
                  <span className="font-medium">{greetingName}</span>
                </div>
                <Link
                  to={dashboardLink}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
