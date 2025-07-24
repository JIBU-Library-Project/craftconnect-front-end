// AdminDashboardLayout.jsx

import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Star,
  Users,
  CheckCircle,
  BarChart2,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../services/hooks";

function AdminDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Correct active link highlighting
  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    {
      path: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      path: "/admin/reviews",
      icon: <Star className="w-5 h-5" />,
      label: "Reviews",
    },
    {
      path: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      label: "Users",
    },
    {
      path: "/admin/artisans",
      icon: <Users className="w-5 h-5" />,
      label: "Artisans",
    },
    {
      path: "/admin/artisan/jobs",
      icon: <Briefcase className="w-5 h-5" />,
      label: "Job Requests",
    },
    {
      path: "/admin/verification",
      icon: <CheckCircle className="w-5 h-5" />,
      label: "Verification",
    },
    // {
    //   path: "/admin/reports",
    //   icon: <BarChart2 className="w-5 h-5" />,
    //   label: "Reports",
    // },
    // {
    //   path: "/admin/settings",
    //   icon: <Settings className="w-5 h-5" />,
    //   label: "Settings",
    // },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
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

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 w-64 bg-white text-gray-800 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "left-0" : "-left-full"
        } md:left-0 h-full flex flex-col border-r border-gray-200`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center">
          <div className="w-10 h-10 rounded-md bg-[#4e12bd] flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <span className="ml-3 text-xl font-semibold text-gray-800">
            AdminHub
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-2 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center p-3 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-indigo-600 text-white shadow-sm border-l-4 border-indigo-600"
                  : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
              }`}
            >
              <span
                className={`text-[18px] ${
                  isActive(item.path) ? "text-white" : "text-gray-600"
                }`}
              >
                {item.icon}
              </span>
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <div
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                A
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Admin</p>
                <p className="text-xs text-gray-500">Super User</p>
              </div>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform ${
                profileDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {profileDropdownOpen && (
            <div className="mt-2 py-2 bg-white rounded-lg shadow-lg border border-gray-200">
              <button
                onClick={() => navigate("/")}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white group"
              >
                <ArrowLeft className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white" />
                Back to Main Site
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white group"
              >
                <LogOut className="w-4 h-4 mr-3 text-gray-500 group-hover:text-white" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div />
            <div className="flex items-center space-x-2 bg-gray-50 hover:bg-indigo-600 hover:text-white px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-gray-200">
              <span className="text-sm font-medium">Admin Panel</span>
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto pt-6 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
