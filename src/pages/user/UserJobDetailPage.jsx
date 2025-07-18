import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { userJobs } from "../../data/dummyData";

const UserJobDetailPage = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const job = userJobs.find((job) => job.id === jobId);

  const [selectedImage, setSelectedImage] = useState(null);

  if (!job) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <div className="bg-white rounded-lg p-8 shadow border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-800 mb-3">
            Job Not Found
          </h2>
          <p className="text-neutral-600 mb-5">
            The job you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 transition"
          >
            Back to My Jobs
          </button>
        </div>
      </div>
    );
  }

  const statusColors = {
    pending: "bg-amber-100 text-amber-800",
    accepted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    declined: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow border border-neutral-200">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-neutral-700 hover:text-neutral-900 mb-5 transition"
      >
        <FaArrowLeft className="mr-2" />
        Back to My Jobs
      </button>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">
              {job.title}
            </h1>
            <div className="flex items-center mt-2 flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusColors[job.jobStatus]
                }`}
              >
                {job.jobStatus.charAt(0).toUpperCase() + job.jobStatus.slice(1)}
              </span>
              <span className="text-neutral-500 text-sm">
                Created: {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-neutral-900">
              {job.budget || "Negotiable"}
            </p>
            <p className="text-sm text-neutral-500">Budget</p>
          </div>
        </div>
        <p className="text-neutral-700 leading-relaxed">{job.description}</p>
      </div>

      {/* Image Gallery */}
      {job.images?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">
            Job Photos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {job.images.map((src, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden cursor-pointer group"
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
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            <img
              src={selectedImage}
              alt="Preview"
              className="max-h-[90vh] w-auto mx-auto rounded shadow-lg"
            />
            <button
              className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition"
              onClick={() => setSelectedImage(null)}
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Job Details & Artisan Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Job Details */}
        <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            Job Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                <FaCalendarAlt />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Created</p>
                <p className="font-medium text-neutral-800">
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {job.scheduledAt && (
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                  <FaClock />
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Scheduled</p>
                  <p className="font-medium text-neutral-800">
                    {new Date(job.scheduledAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-sm text-neutral-500">Location</p>
                <p className="font-medium text-neutral-800">{job.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Artisan Info */}
        {job.artisan && (
          <div className="bg-neutral-50 p-5 rounded-lg border border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              Assigned Artisan
            </h2>
            <div className="flex items-start gap-4">
              <div className="bg-neutral-200 w-14 h-14 flex items-center justify-center rounded-full font-bold text-lg text-neutral-700">
                {job.artisan.businessName.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-neutral-800 text-base">
                  {job.artisan.businessName}
                </h3>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center text-neutral-600">
                    <FaPhone className="mr-2 text-blue-600" />
                    <a
                      href={`tel:${job.artisan.phone}`}
                      className="hover:text-neutral-800"
                    >
                      {job.artisan.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <FaEnvelope className="mr-2 text-blue-600" />
                    <a
                      href={`mailto:${job.artisan.email}`}
                      className="hover:text-neutral-800"
                    >
                      {job.artisan.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
        {job.jobStatus === "accepted" && (
          <button
            onClick={() => (window.location.href = `tel:${job.artisan.phone}`)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <FaPhone />
            Call Artisan
          </button>
        )}
        {job.jobStatus === "completed" && !job.reviewId && (
          <button
            onClick={() => navigate(`/homeowner/my-jobs/${job.id}/review`)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm font-medium"
          >
            <FaCheckCircle />
            Leave Review
          </button>
        )}
      </div>
    </div>
  );
};

export default UserJobDetailPage;
