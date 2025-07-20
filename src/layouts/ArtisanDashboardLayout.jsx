import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Gauge,
  User,
  Briefcase,
  Wrench,
  ShieldCheck,
  ArrowLeft,
  Shield,
  Edit,
  Star,
  Menu,
  X,
  LogOut,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../services/hooks";

const ArtisanDashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);
  const logout = () => navigate("/login");

  const navItems = [
    {
      path: "/artisan",
      icon: <Gauge className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "/artisan/profile",
      icon: <User className="w-5 h-5" />,
      label: "Profile",
    },
    {
      path: "/artisan/jobs",
      icon: <Briefcase className="w-5 h-5" />,
      label: "Jobs",
    },
    {
      path: "/artisan/services",
      icon: <Wrench className="w-5 h-5" />,
      label: "Services",
    },
    {
      path: "/artisan/services-edit",
      icon: <Edit className="w-5 h-5" />,
      label: "Manage Services",
    },
    {
      path: "/artisan/verification",
      icon: <ShieldCheck className="w-5 h-5" />,
      label: "Verification",
    },
    {
      path: "/artisan/verify/status",
      icon: <Shield className="w-5 h-5" />,
      label: "Status",
    },
    {
      path: "/artisan/artisan-reviews",
      icon: <Star className="w-5 h-5" />,
      label: "Reviews",
    },
    { path: "/artisan/contact" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar - Deep Indigo */}
      <div
        className={`fixed md:relative z-40 w-64 bg-indigo-900 text-white transition-all duration-300 ease-in-out 
        ${
          mobileMenuOpen ? "left-0" : "-left-full"
        } md:left-0 h-full flex flex-col`}
      >
        <div className="p-6 flex items-center">
          <div className="w-10 h-10 rounded-md bg-indigo-700 flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <span className="ml-3 text-xl font-semibold text-white">
            ArtisanHub
          </span>
        </div>

        {/* Search bar (mobile only) */}

        <nav className="flex-1 mt-2 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-indigo-700 text-white shadow-md"
                  : "hover:bg-indigo-800/80 text-indigo-100"
              }`}
            >
              <span className="text-[18px]">{item.icon}</span>
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom profile section */}
        <div className="p-4 border-t border-indigo-800/50">
          <div
            className="flex items-center justify-between p-2 rounded-lg hover:bg-indigo-800/50 cursor-pointer transition"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-400">Artisan Account</p>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-indigo-300 transition-transform ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Profile dropdown */}
          {profileDropdownOpen && (
            <div className="mt-2 py-2 bg-indigo-800 rounded-lg shadow-lg">
              <button
                className="w-full flex items-center px-4 py-2 text-sm text-indigo-100 hover:bg-indigo-700/50 "
                onClick={() => navigate("/artisan/contact")}
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Help & Support
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-indigo-700/50 hover:text-white group"
              >
                <ArrowLeft className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#8635f0]" />
                Back to Main Site
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-200 hover:bg-indigo-700/50"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-30">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Breadcrumbs */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold capitalize text-gray-800">
                {location.pathname.split("/").pop() || "Dashboard"}
              </h1>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Search bar (desktop only) */}

              {/* Business profile (desktop only) */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full cursor-pointer">
                <span className="text-sm font-medium text-gray-700">
                  {user?.businessName || "Artisan"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto pt-6 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArtisanDashboardLayout;
