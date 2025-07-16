import React from "react";
import { Link } from "react-router";

const UserReviewsPage = () => {
  const userReviews = [
    {
      id: "rev_006",
      jobId: "job-4",
      rating: 4,
      comment: "Very good, minor finishing issues but overall nice.",
      date: "2024-07-02T08:20:00Z",
      artisan: {
        id: "art_789",
        name: "Yaw Boateng",
        profilePic: "/profiles/artisan1.jpg",
      },
    },
    {
      id: "rev_007",
      jobId: "job-5",
      rating: 1,
      comment: "Terrible service, would not recommend.",
      date: "2024-08-15T12:40:00Z",
      artisan: {
        id: "art_987",
        name: "Abena Darko",
        profilePic: "/profiles/artisan2.jpg",
      },
    },
    {
      id: "rev_010",
      jobId: "job-8",
      rating: 5,
      comment: "Outstanding work! The piece exceeded my expectations.",
      date: "2024-09-10T14:55:00Z",
      artisan: {
        id: "art_123",
        name: "Kofi Mensah",
        profilePic: "/profiles/artisan4.jpg",
      },
    },
    {
      id: "rev_011",
      jobId: "job-9",
      rating: 2,
      comment: "Delivery was late, and the finishing was below standard.",
      date: "2024-10-01T11:30:00Z",
      artisan: {
        id: "art_234",
        name: "Adwoa Nyarko",
        profilePic: "/profiles/artisan5.jpg",
      },
    },
    {
      id: "rev_012",
      jobId: "job-10",
      rating: 3,
      comment: "Average service, communication could be better.",
      date: "2024-11-20T17:45:00Z",
      artisan: {
        id: "art_345",
        name: "Kojo Asante",
        profilePic: "/profiles/artisan6.jpg",
      },
    },
    {
      id: "rev_013",
      jobId: "job-11",
      rating: 5,
      comment: "Fantastic experience, will definitely order again!",
      date: "2024-12-05T09:10:00Z",
      artisan: {
        id: "art_456",
        name: "Akosua Agyemang",
        profilePic: "/profiles/artisan3.jpg",
      },
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return "bg-green-100 text-green-800";
    if (rating >= 3) return "bg-blue-100 text-blue-800";
    if (rating >= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Reviews</h1>
        <Link
          to="/homeowner/my-jobs"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          View My Jobs
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-lg font-bold">{userReviews.length}</p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
          <p className="text-xs text-gray-500">5 Stars</p>
          <p className="text-lg font-bold">
            {userReviews.filter((r) => r.rating === 5).length}
          </p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
          <p className="text-xs text-gray-500">3-4 Stars</p>
          <p className="text-lg font-bold">
            {userReviews.filter((r) => r.rating >= 3 && r.rating < 5).length}
          </p>
        </div>
        <div className="bg-white p-3 rounded-lg border border-gray-100 text-center">
          <p className="text-xs text-gray-500">1-2 Stars</p>
          <p className="text-lg font-bold">
            {userReviews.filter((r) => r.rating <= 2).length}
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {userReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start gap-3 mb-2">
              <img
                src={review.artisan.profilePic}
                alt={review.artisan.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-800 truncate">
                    {review.artisan.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(
                      review.rating
                    )}`}
                  >
                    {review.rating} ⭐
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {formatDate(review.date)}
                </p>
              </div>
            </div>

            <p className="text-gray-700 text-sm mt-2 mb-3">{review.comment}</p>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Job ID: {review.jobId || ""}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (hidden when reviews exist) */}
      {userReviews.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-100 p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-500 mb-4">
            Your reviews will appear here after you complete jobs with artisans.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserReviewsPage;
