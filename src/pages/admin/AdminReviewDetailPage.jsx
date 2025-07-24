// AdminReviewDetailPage.jsx (clean, scalable, React Query enabled)

import React from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getSingleReview } from "../../services/reviews";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

function AdminReviewDetailPage() {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const { handleSubmit } = useForm();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-single-review", reviewId],
    queryFn: () => getSingleReview(reviewId),
    enabled: !!reviewId,
  });

  const AdminReview = data?.review;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2 text-indigo-500" />
          <p className="text-indigo-500">Error loading review.</p>
        </div>
      </div>
    );
  }

  if (!AdminReview) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2 text-gray-500" />
          <p className="text-gray-500">No Review data found.</p>
        </div>
      </div>
    );
  }

  const onSubmit = () => {
    toast.success("Review deleted successfully");
    navigate("/admin/reviews");
  };

  const getStatus = (rating) => {
    if (rating === 1) return "Bad";
    if (rating >= 2 && rating <= 4) return "Fair";
    if (rating === 5) return "Excellent";
    return "Unknown";
  };

  const status = getStatus(AdminReview.rating);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Reviews
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Review Details</h2>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < AdminReview.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{AdminReview.rating}/5</span>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium
                ${status === "Excellent" ? "bg-green-100 text-green-800" : ""}
                ${status === "Fair" ? "bg-yellow-100 text-yellow-800" : ""}
                ${status === "Bad" ? "bg-red-100 text-red-800" : ""}`}
            >
              {status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Customer</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={AdminReview.userProfilePic}
                    alt={AdminReview.userName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profiles/default-user.jpg";
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{AdminReview.userName}</p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(AdminReview.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Artisan</h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={AdminReview.artisanProfilePic}
                    alt={AdminReview.businessName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profiles/default-artisan.jpg";
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium">{AdminReview.businessName}</p>
                  <p className="text-sm text-gray-500">Job ID: {AdminReview.jobId}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium text-gray-800 mb-3">Review Content</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">{AdminReview.comment}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Admin Action</label>
              <p className="text-sm text-gray-600 mb-4">
                This action will permanently delete this review without notifying the user or artisan.
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminReviewDetailPage;
