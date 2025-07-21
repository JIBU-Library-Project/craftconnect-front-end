import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUserProfile } from "../../queries/userQueries";
import { Loader2 } from "lucide-react";

const UserProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);

  const { data, isLoading, error } = useGetUserProfile();

  useEffect(() => {
    if (data) {
      console.log("Fetched user profile:", data);
      setUserProfile(data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="w-12 h-12 text--600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-center text-red-500">Error loading profile.</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-center text-gray-500">No profile data found.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src={userProfile.profilePic || "/default-profile.jpg"}
            alt={userProfile.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {userProfile.name}
          </h1>
          <p className="text-gray-600">{userProfile.email}</p>
          <p className="text-gray-500 text-sm mt-1">
            Member since {formatDate(userProfile.joinedDate)}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Total Jobs</p>
          <p className="text-2xl font-bold text-indigo-600">
            {userProfile.stats.totalJobs}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Completed</p>
          <p className="text-2xl font-bold text-green-600">
            {userProfile.stats.completedJobs}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {userProfile.stats.pendingJobs}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100 text-center">
          <p className="text-gray-500 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">
            {userProfile.stats.cancelledJobs}
          </p>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg shadow border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
            <p className="text-gray-800">{userProfile.phone}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            <p className="text-gray-800">{userProfile.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
            <p className="text-gray-800 capitalize">{userProfile.role}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Last Login</h3>
            <p className="text-gray-800">{formatDate(userProfile.lastLogin)}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/homeowner/user-profile/edit"
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-center font-medium transition-colors"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
