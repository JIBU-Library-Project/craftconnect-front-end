import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useGetPersonalProfile } from "../../queries/artisanQueries";
import { 
  Loader2,
  Edit,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  User,
  AlertCircle,
  Briefcase,
  Calendar,
  Info
} from "lucide-react";

function ArtisanProfilePage() {
  const navigate = useNavigate();
  const [artisanProfile, setArtisanProfile] = useState(null);
  const { data, isLoading, error } = useGetPersonalProfile();

  useEffect(() => {
    if (data && data.artisan) {
      setArtisanProfile(data.artisan);
    }
  }, [data]);

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
          <p className="text-indigo-500">Error loading profile.</p>
        </div>
      </div>
    );
  }

  if (!artisanProfile) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2 text-gray-500" />
          <p className="text-gray-500">No profile data found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Artisan Profile
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1">
            Your professional profile as shown to clients
          </p>
        </div>
        <button
          onClick={() => navigate("/artisan/profile/edit")}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column - Profile Image & Basic Info */}
            <div className="md:w-1/3 flex flex-col gap-6">
              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {artisanProfile.profilePic ? (
                    <img
                      src={artisanProfile.profilePic}
                      alt={artisanProfile.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-profile.png';
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-indigo-600">
                        {artisanProfile.name ? artisanProfile.name.charAt(0) : 'A'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Specialization */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  Specialization
                </h3>
                <p className="text-base text-gray-800 font-medium">
                  {artisanProfile.craft || 'Not specified'}
                </p>
              </div>

              {/* Account Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Account Status
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      artisanProfile.accountStatus === 'Active'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  />
                  <p className="text-base text-gray-800 font-medium capitalize">
                    {artisanProfile.accountStatus.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verification
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      artisanProfile.verificationStatus === 'Verified'
                        ? 'bg-green-500'
                        : artisanProfile.verificationStatus === 'Pending'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  />
                  <p className="text-base text-gray-800 font-medium capitalize">
                    {artisanProfile.verificationStatus?.toLowerCase() || 'Not verified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Profile Details */}
            <div className="md:w-2/3 flex flex-col gap-6">
              {/* Name and Business */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {artisanProfile.name || 'Anonymous Artisan'}
                </h2>
                <p className="text-lg text-indigo-600 font-medium">
                  {artisanProfile.businessName || 'Independent Professional'}
                </p>
              </div>

              {/* About Section */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  About
                </h3>
                <p className="text-gray-700">
                  {artisanProfile.description || 'No description provided.'}
                </p>
              </div>

              {/* Member Since */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member Since
                </h3>
                <p className="text-gray-700">
                  {new Date(artisanProfile.joinedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </h3>
                <p className="text-gray-700">
                  {artisanProfile.location || 'Location not specified'}
                </p>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-gray-800 font-medium">
                      {artisanProfile.email || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-gray-800 font-medium">
                      {artisanProfile.phone || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtisanProfilePage;