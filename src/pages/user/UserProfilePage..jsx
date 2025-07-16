import React from "react";
import { Link } from "react-router";

const UserProfilePage = () => {
  const userProfile = {
    id: "user_123",
    name: "Kwame Asare",
    email: "kwame@example.com",
    profilePic: "/profiles/user1.jpg",
    role: "user",
    joinedDate: "2023-05-15T08:30:00Z",
    lastLogin: "2023-07-20T14:25:00Z",
    location: "Accra, Osu",
    phone: "0244123456",
    stats: {
      totalJobs: 5,
      completedJobs: 3,
      pendingJobs: 1,
      cancelledJobs: 1,
    },
  };

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
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Profile Summary */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={userProfile.profilePic}
            alt={userProfile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {userProfile.name}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {userProfile.email}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {userProfile.location}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              Member since {formatDate(userProfile.joinedDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">Total Jobs</p>
          <p className="text-xl sm:text-2xl font-bold">
            {userProfile.stats.totalJobs}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">Completed</p>
          <p className="text-xl sm:text-2xl font-bold">
            {userProfile.stats.completedJobs}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">Pending</p>
          <p className="text-xl sm:text-2xl font-bold">
            {userProfile.stats.pendingJobs}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">Cancelled</p>
          <p className="text-xl sm:text-2xl font-bold">
            {userProfile.stats.cancelledJobs}
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base">
          <p>
            <span className="font-medium">Phone:</span> {userProfile.phone}
          </p>
          <p>
            <span className="font-medium">Email:</span> {userProfile.email}
          </p>
          <p>
            <span className="font-medium">Location:</span>{" "}
            {userProfile.location}
          </p>
          <p>
            <span className="font-medium">Last Login:</span>{" "}
            {formatDate(userProfile.lastLogin)}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Recent Reviews</h2>
          <Link
            to="/user/reviews"
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            View All
          </Link>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {userReviews.length > 0 ? (
            userReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-3 sm:pb-4 last:border-0"
              >
                <div className="flex items-start gap-3 mb-1">
                  <img
                    src={review.artisan.profilePic}
                    alt={review.artisan.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm sm:text-base">
                        {review.artisan.name}
                      </h3>
                      <span className="flex items-center text-yellow-500 text-sm sm:text-base">
                        ⭐ {review.rating}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {review.comment}
                    </p>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">
              You haven't left any reviews yet
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/search"
            className="bg-green-50 text-green-700 px-4 py-3 rounded-lg hover:bg-green-100 transition-colors text-center font-medium"
          >
            Request A Service
          </Link>
          <Link
            to="/homeowner/my-jobs"
            className="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-100 transition-colors text-center font-medium"
          >
            View My Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
