import { useNavigate, useParams } from "react-router";
import { useState } from "react";
import { artisanJobs } from "../../data/dummyData";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  FileText,
  Camera,
} from "lucide-react";

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
          onClick={() => navigate("/admin/artisan/jobs")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
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
        className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
          statusMap[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/artisan/jobs")}
        className="flex items-center text-sm text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Artisan Jobs
      </button>

      <div className="bg-white rounded-xl shadow border border-gray-200 p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText size={18} className="text-indigo-600" /> {job.title}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {statusBadge(job.jobStatus)}
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-600">{job.budget}</p>
            <p className="text-xs text-gray-500">Budget</p>
          </div>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Job Details */}
          <div className="bg-indigo-50 rounded-lg p-4">
            <h2 className="flex items-center gap-1 text-sm font-semibold text-indigo-800 mb-2">
              <Calendar size={16} /> Job Details
            </h2>
            <dl className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-gray-500" />
                <span className="font-semibold">Location:</span> {job.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-gray-500" />
                <span className="font-semibold">Scheduled:</span>{" "}
                {formatDate(job.scheduledAt)}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} className="text-gray-500" />
                <span className="font-semibold">Requested:</span>{" "}
                {formatDate(job.createdAt)}
              </div>
            </dl>
          </div>

          {/* Artisan Info */}
          <div className="bg-green-50 rounded-lg p-4">
            <h2 className="flex items-center gap-1 text-sm font-semibold text-green-800 mb-2">
              <Building2 size={16} /> Artisan Info
            </h2>
            <dl className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <User size={14} className="text-gray-500" />
                <span className="font-semibold">Name:</span> {job.artisanName}
              </div>
              <div className="flex items-center gap-1">
                <Building2 size={14} className="text-gray-500" />
                <span className="font-semibold">Business:</span>{" "}
                {job.businessName}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-gray-500" />
                <span className="font-semibold">Location:</span>{" "}
                {job.artisanLocation}
              </div>
              {job.artisanPhone && (
                <div className="flex items-center gap-1">
                  <Phone size={14} className="text-gray-500" />
                  <span className="font-semibold">Phone:</span>{" "}
                  {job.artisanPhone}
                </div>
              )}
              {job.artisanEmail && (
                <div className="flex items-center gap-1">
                  <Mail size={14} className="text-gray-500" />
                  <span className="font-semibold">Email:</span>{" "}
                  {job.artisanEmail}
                </div>
              )}
            </dl>
          </div>

          {/* Client Info */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <h2 className="flex items-center gap-1 text-sm font-semibold text-yellow-800 mb-2">
              <User size={16} /> Client Info
            </h2>
            <dl className="space-y-1 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <User size={14} className="text-gray-500" />
                <span className="font-semibold">Name:</span> {job.user.name}
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-gray-500" />
                <span className="font-semibold">Location:</span>{" "}
                {job.user.location}
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} className="text-gray-500" />
                <span className="font-semibold">Phone:</span> {job.user.phone}
              </div>
              <div className="flex items-center gap-1">
                <Mail size={14} className="text-gray-500" />
                <span className="font-semibold">Email:</span> {job.user.email}
              </div>
            </dl>
          </div>
        </div>

        {/* Decline & Cancellation */}
        {job.cancellationReason && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-800 p-3 rounded">
            <strong>Cancellation Reason:</strong> {job.cancellationReason}
          </div>
        )}
        {job.declineReason && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-3 rounded">
            <strong>Decline Reason:</strong> {job.declineReason}
          </div>
        )}

        {/* Description */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
            <FileText size={16} /> Job Description
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Images */}
        {job.images?.length > 0 && (
          <div>
            <h2 className="flex items-center gap-1 text-sm font-semibold text-gray-700 mb-2">
              <Camera size={16} /> Job Images
            </h2>
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
      </div>

      {/* Modal Viewer */}
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
