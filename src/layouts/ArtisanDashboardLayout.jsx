import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  Gauge,
  User,
  Briefcase,
  Wrench,
  ShieldCheck,
  Bell,
  Shield,
  Edit,
  Star,
} from "lucide-react";
import { artisanProfile } from "../data/dummyData";

const ArtisanDashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
      label: "Add/Edit Serivices",
    },
    {
      path: "/artisan/verification",
      icon: <ShieldCheck className="w-5 h-5" />,
      label: "Verification",
    },
    {
      path: "/artisan/verify/status",
      icon: <Shield className="w-5 h-5" />,
      label: "Verification Status",
    },
    {
      path: "/artisan/artisan-reviews",
      icon: <Star className="w-5 h-5" />,
      label: "Reviews",
    },
  ];

  return (
    <div className=" //outlet flex h-screen bg-[#f9f9f8]  font-sans">
      {/* Sidebar - Clean Modern */}
      <div className="w-20 md:w-64 bg-white shadow-sm //border-r-4 //border-indigo-600 flex flex-col">
        {/* Logo */}
        <div className="p-4 flex items-center justify-center md:justify-start">
          <div className="w-10 h-10 rounded-md bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
            A
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-800 hidden md:block">
            ArtisanHub
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center p-3 rounded-md transition ${
                isActive(item.path)
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-[18px]">{item.icon}</span>
              <span className="ml-3 hidden md:block">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full object-cover border border-gray-300"
              src={artisanProfile.profilePic}
              alt={artisanProfile.name}
            />
            <div className="ml-3 hidden md:block">
              <p className="text-sm font-medium text-gray-800">
                {artisanProfile.name}
              </p>
              <button
                onClick={logout}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Sign out →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-[#ffffff] /10   border-b-4 shadow-xl border-indigo-800">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800 capitalize">
              {location.pathname.split("/").pop() || "Dashboard"}
            </h1>
            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <span className="text-gray-600">
                  <Bell className="w-5 h-5" />
                </span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="hidden md:flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full">
                <span className="text-sm font-medium text-gray-700">
                  {artisanProfile.businessName}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className=" flex-1 overflow-y-auto pt-7 ">
          <div className=" max-w-5xl mx-auto ">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArtisanDashboardLayout;
