import React from "react";
import { Link } from "react-router-dom";
import { useGetPersonalProfile } from "../../queries/artisanQueries";
import { 
  Loader2, 
  Star, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  MapPin, 
  Image as ImageIcon,
  Award,
  AlertCircle,
  User,
  Briefcase,
  Check,
  X,
  CircleSlash
} from "lucide-react";

const ArtisanDashboardPage = () => {
  const { data, isLoading, error } = useGetPersonalProfile();

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
        <div className="text-center text-indigo-500 flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2" />
          <p>Error loading profile.</p>
        </div>
      </div>
    );
  }

  if (!data || !data.artisan) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center text-gray-500 flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2" />
          <p>No profile data found.</p>
        </div>
      </div>
    );
  }

  const artisanProfile = data.artisan;
  const stats = artisanProfile.stats || {};
  const totalJobs = (stats.completedJobs || 0) + 
                   (stats.pendingJobs || 0) + 
                   (stats.cancelledJobs || 0) + 
                   (stats.declinedJobs || 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Profile Summary */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          {artisanProfile.profilePic ? (
            <img
              src={artisanProfile.profilePic}
              alt={artisanProfile.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow"
              onError={(e) => {
                e.target.src = '/default-profile.png';
                e.target.onerror = null;
              }}
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-white shadow">
              <span className="text-2xl font-bold text-indigo-600">
                {artisanProfile.name ? artisanProfile.name.charAt(0) : 'A'}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold">
              {artisanProfile.name || 'Anonymous Artisan'}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {artisanProfile.businessName || 'Independent Professional'}
            </p>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <p className="text-xs sm:text-sm text-gray-500">
                {artisanProfile.craft || 'Craft not specified'}
              </p>
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                  artisanProfile.accountStatus === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                <User className="w-3 h-3" />
                {artisanProfile.accountStatus || 'Inactive'}
              </span>
              {artisanProfile.verificationStatus && (
                <span
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                    artisanProfile.verificationStatus === "Verified"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {artisanProfile.verificationStatus === "Verified" ? (
                    <CheckCircle className="w-3 h-3" />
                  ) : null}
                  {artisanProfile.verificationStatus}
                </span>
              )}
            </div>
          </div>
        </div>
        <Link
          to="/artisan/profile"
          className="w-full sm:w-auto text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm sm:text-base transition-colors flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Profile
        </Link>
      </div>

      {/* Job Statistics Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600" />
          Job Statistics
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {/* Total Jobs */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-gray-600 text-xs sm:text-sm mb-1">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Total Jobs</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">
              {totalJobs}
            </p>
          </div>
          
          {/* Completed Jobs */}
          <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 text-xs sm:text-sm mb-1">
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Completed</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-800">
              {stats.completedJobs || 0}
            </p>
          </div>
          
          {/* Pending Jobs */}
          <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-600 text-xs sm:text-sm mb-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Pending</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-yellow-800">
              {stats.pendingJobs || 0}
            </p>
          </div>
          
          {/* Cancelled Jobs */}
          <div className="bg-red-50 rounded-lg p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-red-600 text-xs sm:text-sm mb-1">
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Cancelled</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-red-800">
              {stats.cancelledJobs || 0}
            </p>
          </div>
          
          {/* Declined Jobs */}
          <div className="bg-purple-50 rounded-lg p-3 sm:p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-purple-600 text-xs sm:text-sm mb-1">
              <CircleSlash className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Declined</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-purple-800">
              {stats.declinedJobs || 0}
            </p>
          </div>
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <Star className="w-5 h-5 text-indigo-600" />
            Rating & Reviews
          </h2>
          <Link
            to="/artisan/reviews"
            className="text-indigo-600 text-sm hover:text-indigo-800 flex items-center gap-1"
          >
            View All
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold ml-1">
              {artisanProfile.rating || '0.0'}
            </span>
          </div>
          <div className="text-gray-600 text-sm">
            {artisanProfile.reviewCount || 0} reviews
          </div>
        </div>
      </div>

      {/* Contact & Location */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-indigo-600" />
          Contact Information
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-500">Phone</p>
              <p className="text-gray-800">
                {artisanProfile.phone || 'Not provided'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-500">Email</p>
              <p className="text-gray-800">
                {artisanProfile.email || 'Not provided'}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2 sm:col-span-2">
            <MapPin className="w-4 h-4 mt-0.5 text-gray-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-500">Location</p>
              <p className="text-gray-800">
                {artisanProfile.location || 'Location not specified'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            Portfolio
          </h2>
          <Link
            to="/artisan/portfolio"
            className="text-indigo-600 text-sm hover:text-indigo-800 flex items-center gap-1"
          >
            View All
          </Link>
        </div>
        
        {artisanProfile.portfolio && artisanProfile.portfolio.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {artisanProfile.portfolio.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg border border-gray-200"
              >
                <img
                  src={image}
                  alt={`portfolio-${index}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.target.src = '/default-portfolio.png';
                    e.target.onerror = null;
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500 flex flex-col items-center">
            <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
            <p>No portfolio items available</p>
          </div>
        )}
      </div>

      {/* Specialties */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          Specialties
        </h2>
        
        {artisanProfile.specialties && artisanProfile.specialties.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {artisanProfile.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center gap-1"
              >
                <Award className="w-3 h-3" />
                {specialty}
              </span>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500 flex flex-col items-center">
            <Award className="w-8 h-8 mb-2 text-gray-400" />
            <p>No specialties listed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanDashboardPage;