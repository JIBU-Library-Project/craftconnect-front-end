import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { 
  User, Briefcase, Star, ArrowLeft, LogOut, 
  Menu, X, ChevronDown, Search, Settings, 
  HelpCircle, Gauge 
} from "lucide-react";

function UserDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navItems = [
    { path: "/homeowner", icon: <Gauge className="w-5 h-5" />, label: "Dashboard" },
    { path: "/homeowner/user-profile", icon: <User className="w-5 h-5" />, label: "Profile/Stats" },
    { path: "/homeowner/my-jobs", icon: <Briefcase className="w-5 h-5" />, label: "My Jobs" },
    { path: "/homeowner/user-reviews", icon: <Star className="w-5 h-5" />, label: "My Reviews" },
    { path: "/homeowner/user-profile/edit", },
  ];

  const handleLogout = () => navigate("/login");

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-600"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar - #242424 (gray-900) with #f05335 accents */}
      <div className={`fixed md:relative z-40 w-64 bg-[#242424] text-gray-200 transition-all duration-300 ease-in-out 
        ${mobileMenuOpen ? 'left-0' : '-left-full'} md:left-0 h-full flex flex-col`}>
        <div className="p-6 flex items-center">
          <div className="w-10 h-10 rounded-md bg-[#f05335] flex items-center justify-center text-white font-bold text-lg">H</div>
          <span className="ml-3 text-xl font-semibold text-white">HomeownerHub</span>
        </div>
        
        {/* Search bar (mobile only) */}
        <div className="px-4 pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f05335]"
            />
          </div>
        </div>
        
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
                  ? "bg-[#f05335] text-white shadow-md" 
                  : "hover:bg-gray-800/80 text-gray-300 hover:text-white"
              }`}
            >
              <span className="text-[18px]">{item.icon}</span>
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
        
        {/* Bottom profile section */}
        <div className="p-4 border-t border-gray-800">
          <div 
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 cursor-pointer transition"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                H
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Homeowner</p>
                <p className="text-xs text-gray-400">User Account</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </div>
          
          {/* Profile dropdown with #f05335 accents */}
          {profileDropdownOpen && (
            <div className="mt-2 py-2 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
              
              <button className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#f05335]/20 hover:text-white group"
                 onClick={() => navigate("/contact")}
              >
                <HelpCircle className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#f05335]" />
                Help & Support
              </button>
              <button 
                onClick={() => navigate("/")}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#f05335]/20 hover:text-white group"
              >
                <ArrowLeft className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#f05335]" />
                Back to Main Site
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-[#f05335]/20 hover:text-[#f05335] group"
              >
                <LogOut className="w-4 h-4 mr-3 text-gray-400 group-hover:text-[#f05335]" />
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
              
              
              {/* User profile */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full cursor-pointer transition-colors hover:text-[#f05335]">
                <span className="text-sm font-medium">Homeowner Account</span>
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
}

export default UserDashboardLayout;