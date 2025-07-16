import React from "react";
import { Link } from "react-router";
import { artisanProfile } from "../../data/dummyData";

const ArtisanDashboardPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Profile Summary */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={artisanProfile.profilePic}
            alt={artisanProfile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {artisanProfile.name}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {artisanProfile.businessName}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">
              {artisanProfile.craft}
            </p>
            <p
              className={`text-xs sm:text-sm capitalize ${
                artisanProfile.verificationStatus === "verified"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {artisanProfile.verificationStatus}
            </p>
          </div>
        </div>
        <Link
          to="/artisan/profile"
          className="w-full sm:w-auto text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base transition-colors"
        >
          Edit Profile
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">Rating</p>
          <p className="text-xl sm:text-2xl font-bold">
            ⭐ {artisanProfile.rating}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 text-center">
          <p className="text-gray-500 text-xs sm:text-sm">Completed</p>
          <p className="text-xl sm:text-2xl font-bold">
            {artisanProfile.stats.completedJobs}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-100 p-3 sm:p-4 text-center col-span-2 sm:col-span-1">
          <p className="text-gray-500 text-xs sm:text-sm">Pending</p>
          <p className="text-xl sm:text-2xl font-bold">
            {artisanProfile.stats.pendingJobs}
          </p>
        </div>
      </div>

      {/* Contact & Location */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Contact Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base">
          <p>
            <span className="font-medium">Phone:</span> {artisanProfile.phone}
          </p>
          <p>
            <span className="font-medium">WhatsApp:</span>{" "}
            {artisanProfile.whatsapp}
          </p>
          <p>
            <span className="font-medium">Email:</span> {artisanProfile.email}
          </p>
          <p>
            <span className="font-medium">Location:</span>{" "}
            {artisanProfile.location}
          </p>
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Portfolio</h2>
          <Link
            to="/artisan/portfolio"
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {artisanProfile.portfolio.slice(0, 4).map((image, index) => (
            <div
              key={index}
              className="aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={image}
                alt={`portfolio-${index}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
          Specialties
        </h2>
        <div className="flex flex-wrap gap-2">
          {artisanProfile.specialties.map((specialty, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs sm:text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-lg border border-gray-100 p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Recent Reviews</h2>
          <Link
            to="/artisan/reviews"
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            See All
          </Link>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {artisanProfile.reviews && artisanProfile.reviews.length > 0 ? (
            artisanProfile.reviews.slice(0, 2).map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-3 sm:pb-4 last:border-0"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium text-sm sm:text-base">
                    {review.comment}
                  </p>
                  <span className="flex items-center text-yellow-500 text-sm sm:text-base">
                    ⭐ {review.rating}
                  </span>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm">
                  By {review.user.name} •{" "}
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base">No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboardPage;
