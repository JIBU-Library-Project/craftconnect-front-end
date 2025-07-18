import { useState } from "react";
import { useNavigate } from "react-router";
import { artisanJobs } from "../../data/dummyData";
import { Calendar, MapPin, Phone, User as UserIcon, Building2 } from "lucide-react";

function AdminArtisanJobsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJobs = artisanJobs.filter((job) => {
    const matchesStatus = statusFilter === "all" || job.jobStatus === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.businessName.toLowerCase().includes(searchTerm.toLowerCase());
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
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Pending" },
      declined: { color: "bg-red-100 text-red-800", text: "Declined" },
      completed: { color: "bg-green-100 text-green-800", text: "Completed" },
      cancelled: { color: "bg-gray-100 text-gray-800", text: "Cancelled" },
      accepted: { color: "bg-indigo-100 text-indigo-800", text: "Accepted" },
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusMap[status]?.color || "bg-gray-100 text-gray-800"}`}
      >
        {statusMap[status]?.text || status}
      </span>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Artisan Job Management</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search jobs, user, or artisan..."
            className="px-4 py-2 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 w-full sm:w-auto focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition duration-200"
          >
            {/* Title & Budget */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                {statusBadge(job.jobStatus)}
              </div>
              <div className="text-base font-bold text-emerald-600">{job.budget}</div>
            </div>

            {/* Dates & Location */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-2">
              <div className="flex items-center">
                <Calendar size={16} className="mr-1 text-indigo-500" />
                {formatDate(job.scheduledAt)}
              </div>
              {job.location && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1 text-indigo-500" />
                  {job.location}
                </div>
              )}
            </div>

            {/* Artisan Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-1 text-gray-700">
                <Building2 size={16} className="text-indigo-500" />
                <span className="font-medium">Artisan:</span> {job.artisanName} ({job.businessName})
              </div>
              {job.artisanLocation && (
                <div className="flex items-center gap-1 text-gray-700">
                  <MapPin size={16} className="text-indigo-500" />
                  {job.artisanLocation}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2 bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-1 text-gray-700">
                <UserIcon size={16} className="text-indigo-500" />
                <span className="font-medium">User:</span> {job.user.name}
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <Phone size={16} className="text-indigo-500" />
                {job.user.phone}
              </div>
            </div>

            {/* Decline & Cancellation Reasons */}
            {job.cancellationReason && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-2 rounded text-xs mt-2">
                Cancellation Reason: {job.cancellationReason}
              </div>
            )}
            {job.declineReason && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-2 rounded text-xs mt-2">
                Decline Reason: {job.declineReason}
              </div>
            )}

            {/* View Details Button */}
            <div className="flex justify-end mt-3">
              <button
                onClick={() => navigate(`/admin/artisan/jobs/${job.id}`)}
                className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-sm font-medium text-white transition"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredJobs.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No artisan jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

export default AdminArtisanJobsPage;
