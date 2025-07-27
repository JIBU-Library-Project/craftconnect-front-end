import { useState } from "react";
import { useNavigate } from "react-router";
import { userJobs } from "../../data/dummyData";
import { Calendar, MapPin, Phone, User as UserIcon, Search, Filter, ArrowRight, Clock } from "lucide-react";

function AdminUserJobsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = userJobs.filter((job) => {
    const matchesStatus = statusFilter === "all" || job.jobStatus === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusBadge = (status) => {
    const statusMap = {
      pending: { 
        color: "bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-yellow-800", 
        text: "Pending",
        icon: <Clock size={12} className="mr-1" />
      },
      declined: { 
        color: "bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800", 
        text: "Declined",
        icon: null
      },
      completed: { 
        color: "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800", 
        text: "Completed",
        icon: null
      },
      cancelled: { 
        color: "bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 text-gray-800", 
        text: "Cancelled",
        icon: null
      },
      accepted: { 
        color: "bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800", 
        text: "Accepted",
        icon: null
      },
    };
    
    const statusInfo = statusMap[status] || { 
      color: "bg-gray-100 border border-gray-200 text-gray-600", 
      text: status,
      icon: null
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
        {statusInfo.icon}
        {statusInfo.text}
      </span>
    );
  };

  const getJobStats = () => {
    const stats = {
      all: userJobs.length,
      pending: userJobs.filter(job => job.jobStatus === 'pending').length,
      accepted: userJobs.filter(job => job.jobStatus === 'accepted').length,
      completed: userJobs.filter(job => job.jobStatus === 'completed').length,
      cancelled: userJobs.filter(job => job.jobStatus === 'cancelled').length,
      declined: userJobs.filter(job => job.jobStatus === 'declined').length,
    };
    return stats;
  };

  const stats = getJobStats();

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                User Job Requests
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage and monitor all user job requests
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="font-medium">{filteredJobs.length}</span>
              <span>of {userJobs.length} jobs</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
            {[
              { key: 'all', label: 'Total', color: 'bg-gradient-to-r from-slate-500 to-slate-600' },
              { key: 'pending', label: 'Pending', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
              { key: 'accepted', label: 'Accepted', color: 'bg-gradient-to-r from-blue-500 to-indigo-500' },
              { key: 'completed', label: 'Completed', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
              { key: 'cancelled', label: 'Cancelled', color: 'bg-gradient-to-r from-gray-500 to-gray-600' },
              { key: 'declined', label: 'Declined', color: 'bg-gradient-to-r from-red-500 to-pink-500' },
            ].map((stat) => (
              <div
                key={stat.key}
                className={`${stat.color} rounded-xl p-3 sm:p-4 text-white shadow-lg transform hover:scale-105 transition-all duration-200`}
              >
                <div className="text-lg sm:text-2xl font-bold">{stats[stat.key]}</div>
                <div className="text-xs sm:text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search jobs by title, location..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative lg:w-48">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <div className="p-4 sm:p-6">
                {/* Job Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {job.title}
                    </h2>
                    {job.userName && (
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-2">
                          <UserIcon size={16} className="text-white" />
                        </div>
                        <span className="font-medium">{job.userName}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{job.budget}</div>
                    {statusBadge(job.jobStatus)}
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    <Calendar size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{formatDate(job.scheduledAt)}</span>
                  </div>
                  {job.location && (
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      <MapPin size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                  )}
                  {job.userPhone && (
                    <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3 sm:col-span-1 lg:col-span-1">
                      <Phone size={16} className="mr-2 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{job.userPhone}</span>
                    </div>
                  )}
                </div>

                {/* Reason Messages */}
                {job.cancellationReason && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 p-3 rounded-r-lg mb-4">
                    <div className="flex items-start">
                      <div className="text-red-700">
                        <p className="text-xs sm:text-sm font-semibold mb-1">Cancellation Reason:</p>
                        <p className="text-xs sm:text-sm">{job.cancellationReason}</p>
                      </div>
                    </div>
                  </div>
                )}
                {job.declineReason && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mb-4">
                    <div className="flex items-start">
                      <div className="text-yellow-700">
                        <p className="text-xs sm:text-sm font-semibold mb-1">Decline Reason:</p>
                        <p className="text-xs sm:text-sm">{job.declineReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => navigate(`/admin/user/jobs/${job.id}`)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200 group-hover:bg-blue-100"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              No jobs match your current search criteria. Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUserJobsPage;