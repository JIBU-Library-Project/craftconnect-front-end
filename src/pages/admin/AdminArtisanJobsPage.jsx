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
      accepted: { color: "bg-blue-100 text-blue-800", text: "Accepted" },
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[status]?.color || "bg-gray-100"}`}
      >
        {statusMap[status]?.text || status}
      </span>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Artisan Job Management</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search jobs, user, or artisan..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
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
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3"
          >
            {/* Title & Budget */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-semibold text-gray-800">{job.title}</h2>
                {statusBadge(job.jobStatus)}
              </div>
              <div className="text-sm font-semibold text-gray-700">{job.budget}</div>
            </div>

            {/* Dates & Location */}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1 text-gray-400" />
                {formatDate(job.scheduledAt)}
              </div>
              {job.location && (
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1 text-gray-400" />
                  {job.location}
                </div>
              )}
            </div>

            {/* Artisan Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm text-gray-700 bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-1">
                <Building2 size={14} className="text-gray-400" />
                <span className="font-medium">Artisan:</span> {job.artisanName} ({job.businessName})
              </div>
              {job.artisanLocation && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-gray-400" />
                  {job.artisanLocation}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm text-gray-700 bg-gray-50 p-2 rounded">
              <div className="flex items-center gap-1">
                <UserIcon size={14} className="text-gray-400" />
                <span className="font-medium">User:</span> {job.user.name}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-gray-400" />
                {job.user.phone}
              </div>
            </div>

            {/* Decline & Cancellation Reasons */}
            {job.cancellationReason && (
              <div className="bg-red-50 border-l-4 border-red-400 text-red-700 p-2 rounded text-xs">
                Cancellation Reason: {job.cancellationReason}
              </div>
            )}
            {job.declineReason && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-2 rounded text-xs">
                Decline Reason: {job.declineReason}
              </div>
            )}

            {/* View Details Button */}
            <div className="flex justify-end">
              <button
                onClick={() => navigate(`/admin/artisans/jobs/${job.id}`)}
                className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
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
          <p className="text-gray-500">No artisan jobs found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default AdminArtisanJobsPage;
