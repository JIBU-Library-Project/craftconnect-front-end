import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  User,
  Briefcase,
  Star,
  ArrowLeft,
  LogOut,
  Menu,
} from "lucide-react";

function UserDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      name: "Profile/Stats",
      path: "/homeowner/user-profile",
      icon: <User size={20} />,
    },
    {
      name: "My Jobs",
      path: "/homeowner/my-jobs",
      icon: <Briefcase size={20} />,
    },
    { name: "My Reviews", path: "/homeowner/user-reviews", icon: <Star size={20} /> },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen || !isMobile ? "w-48" : "w-16"
        } bg-white border-r border-gray-200 shadow-sm flex flex-col transition-all duration-300 fixed md:static z-40 h-full`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {(sidebarOpen || !isMobile) && (
            <span className="text-base font-semibold text-gray-800">
              Homeowner
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-gray-100 text-gray-600 md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-1 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-center md:justify-start p-3 rounded-lg transition-all ${
                location.pathname === item.path
                  ? "bg-green-50 text-green-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {(sidebarOpen || !isMobile) && (
                <span className="ml-2 text-sm">{item.name}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-gray-200 flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center md:justify-start w-full p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-all"
          >
            <LogOut size={20} />
            {(sidebarOpen || !isMobile) && (
              <span className="ml-2 text-sm">Logout</span>
            )}
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center md:justify-start w-full p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded transition-all"
          >
            <ArrowLeft size={20} />
            {(sidebarOpen || !isMobile) && (
              <span className="ml-2 text-sm">Back</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-100 text-gray-600"
            >
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 capitalize">
              {location.pathname.split("/").pop() || "Dashboard"}
            </h2>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pr-2">
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              H
            </div>
            <span className="text-gray-700 hidden md:inline">Homeowner</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 ml-10 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserDashboardLayout
