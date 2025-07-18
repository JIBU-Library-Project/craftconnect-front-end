import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { artisanJobs } from "../../data/dummyData";

function AdminArtisanJobsDetailPage() {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);

  const job = artisanJobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="max-w-xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Job Not Found</h2>
        <button
          onClick={() => navigate("/admin/artisans/jobs")}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Back to Artisan Jobs
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusBadge = (status) => {
    const statusMap = {
      pending: "bg-yellow-100 text-yellow-800",
      declined: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-gray-100 text-gray-800",
      accepted: "bg-blue-100 text-blue-800",
    };
    return (
      <span
        className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${statusMap[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/artisans/jobs")}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Artisan Jobs
      </button>

      {/* Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 space-y-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">{job.title}</h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {statusBadge(job.jobStatus)}
              {job.declineReason && <span className="text-xs text-red-600">Reason: {job.declineReason}</span>}
            </div>
          </div>
          <div className="text-right">
            <p className="text-base sm:text-lg font-bold text-gray-900">{job.budget}</p>
            <p className="text-xs text-gray-500">Budget</p>
          </div>
        </div>

        {/* Job & User Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Job Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Job Details</h2>
            <dl className="space-y-1 text-sm text-gray-800">
              <div className="flex justify-between">
                <dt>Location</dt>
                <dd>{job.location}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Scheduled</dt>
                <dd>{formatDate(job.scheduledAt)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Requested</dt>
                <dd>{formatDate(job.createdAt)}</dd>
              </div>
            </dl>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Client Information</h2>
            <dl className="space-y-1 text-sm text-gray-800">
              <div className="flex justify-between">
                <dt>Name</dt>
                <dd>{job.user.name}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Location</dt>
                <dd>{job.user.location}</dd>
              </div>
              <div className="flex flex-col">
                <dt>Contact</dt>
                <dd>{job.user.phone}</dd>
                <dd>{job.user.email}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Job Description */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Description</h2>
          <p className="text-sm text-gray-800 leading-relaxed">{job.description}</p>
        </div>

        {/* Job Images */}
        {job.images?.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-2">Job Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {job.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Job ${idx}`}
                  className="w-full h-32 object-cover rounded cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Admin Actions */}
        <div className="pt-2 border-t border-gray-200">
          <h2 className="text-sm font-medium text-gray-700 mb-2">Admin Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button
              className="px-3 py-1 bg-green-100 text-green-800 rounded text-xs hover:bg-green-200"
              onClick={() => { /* mark as resolved logic */ }}
            >
              Mark as Resolved
            </button>
            <button
              className="px-3 py-1 bg-red-100 text-red-800 rounded text-xs hover:bg-red-200"
              onClick={() => { /* flag job logic */ }}
            >
              Flag Job
            </button>
            <button
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs hover:bg-blue-200"
              onClick={() => { /* contact user logic */ }}
            >
              Contact User
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="View"
            className="max-h-full max-w-full rounded shadow-lg border border-white"
          />
        </div>
      )}
    </div>
  );
}

export default AdminArtisanJobsDetailPage;
