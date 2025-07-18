import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTimes,
} from "react-icons/fa";

import { artisanJobs } from "../../data/dummyData"; // replace with your correct import

const ArtisanJobDetailPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = artisanJobs.find((job) => job.id === jobId);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!job) {
    return (
      <div className="max-w-screen-sm mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-xl p-8 shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            This job may not exist or has been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Back to My Jobs
          </button>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    declined: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="max-w-screen-md mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <FaArrowLeft className="mr-2" />
        Back to My Jobs
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {job.title}
            </h1>
            <div className="flex items-center mt-2 space-x-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[job.jobStatus]
                }`}
              >
                {job.jobStatus.charAt(0).toUpperCase() + job.jobStatus.slice(1)}
              </span>
              <span className="text-gray-500 text-xs">
                Posted: {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="text-gray-800 font-semibold text-lg">
            {job.budget || "Negotiable"}
            <div className="text-gray-500 text-sm">Budget</div>
          </div>
        </div>
        {job.description && (
          <p className="text-gray-700 mt-3 leading-relaxed">
            {job.description}
          </p>
        )}
      </div>

      {/* Image Gallery */}
      {job.images?.length > 0 && (
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Job Photos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {job.images.map((src, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden cursor-pointer group aspect-square"
                onClick={() => setSelectedImage(src)}
              >
                <img
                  src={src}
                  alt={`Job ${idx + 1}`}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[85vh] rounded-lg shadow-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-white bg-black/40 p-2 rounded-full hover:bg-black/60"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Job Details */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Job Details
          </h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                <FaCalendarAlt />
              </div>
              <div>
                <div className="text-xs text-gray-500">Posted</div>
                <div className="text-sm font-medium">
                  {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            {job.scheduledAt && (
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                  <FaClock />
                </div>
                <div>
                  <div className="text-xs text-gray-500">Scheduled</div>
                  <div className="text-sm font-medium">
                    {new Date(job.scheduledAt).toLocaleString()}
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="text-xs text-gray-500">Location</div>
                <div className="text-sm font-medium">{job.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        {job.user && (
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Customer Information
            </h2>
            <div className="flex space-x-4 items-start">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-700">
                {job.user.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-sm">{job.user.name}</div>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <FaPhone className="text-indigo-600" />
                    <a
                      href={`tel:${job.user.phone}`}
                      className="hover:text-indigo-700"
                    >
                      {job.user.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaEnvelope className="text-indigo-600" />
                    <a
                      href={`mailto:${job.user.email}`}
                      className="hover:text-indigo-700"
                    >
                      {job.user.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaMapMarkerAlt className="text-indigo-600" />
                    <span>{job.user.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {job.jobStatus === "accepted" && (
        <div className="bg-white rounded-xl shadow p-5 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => (window.location.href = `tel:${job.user.phone}`)}
            className="w-full sm:w-auto px-4 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <FaPhone />
            Call Customer
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtisanJobDetailPage;
