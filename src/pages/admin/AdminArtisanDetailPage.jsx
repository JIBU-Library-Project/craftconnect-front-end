import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useGetSingleArtisan } from "../../queries/artisanQueries";
import { Loader2, AlertCircle } from "lucide-react";

function AdminArtisansDetailPage() {
  const navigate = useNavigate();
  const { artisanId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isLoading, error } = useGetSingleArtisan(artisanId);
  const artisan = data?.artisan;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <div className="text-center flex flex-col items-center max-w-sm">
          <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 mb-2 text-indigo-500" />
          <p className="text-indigo-500 text-sm sm:text-base mb-4">Artisan not found or failed to load.</p>
          <button
            onClick={() => navigate("/admin/artisans")}
            className="px-4 py-2 bg-[#272822] text-white rounded hover:bg-[#3E3D32] text-sm sm:text-base w-full sm:w-auto"
          >
            Back to Artisans
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = (data) => {
    console.log("Artisan update:", data);
    navigate("/admin/artisans");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/artisans")}
          className="flex items-center text-[#272822] hover:text-[#3E3D32] mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Artisans
        </button>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header Section with Profile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                {artisan.profilePic ? (
                  <img
                    src={artisan.profilePic}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 sm:h-10 sm:w-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{artisan.name}</h2>
                <p className="text-gray-600 text-sm sm:text-base truncate">{artisan.email}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    Artisan
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      (artisan.accountStatus || '').toLowerCase() === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {artisan.accountStatus || 'Unknown'}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      (artisan.verificationStatus || '').toLowerCase() === "verified"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {artisan.verificationStatus || 'Unverified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Business Info and Account Management Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Business Information */}
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <h3 className="font-medium text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Business Information</h3>
                <dl className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Business Name</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 break-words sm:text-right sm:max-w-[60%]">
                      {artisan.businessName || "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Craft/Specialty</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 break-words sm:text-right sm:max-w-[60%]">
                      {artisan.craft || "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Joined Date</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 sm:text-right">
                      {new Date(artisan.joinedDate).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Last Login</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 sm:text-right">
                      {new Date(artisan.lastLogin).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Location</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 break-words sm:text-right sm:max-w-[60%]">
                      {artisan.location || "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Phone</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 break-words sm:text-right sm:max-w-[60%]">
                      {artisan.phone || "-"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Account Management */}
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <h3 className="font-medium text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Account Management</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                  <div className="mb-4 flex-1">
                    <label className="block text-gray-700 mb-2 text-xs sm:text-sm font-medium">Account Status</label>
                    <select
                      {...register("accountStatus", { required: "Status is required" })}
                      defaultValue={artisan.accountStatus}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#272822] focus:border-transparent text-sm ${
                        errors.accountStatus ? "border-red-500" : ""
                      }`}
                    >
                      <option value="Active">Activate</option>
                      <option value="Suspended">Suspend</option>
                    </select>
                    {errors.accountStatus && (
                      <p className="text-red-500 text-xs mt-1">{errors.accountStatus.message}</p>
                    )}
                  </div>
                  <div className="flex justify-end pt-4 sm:pt-6">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 py-2 bg-[#272822] text-white rounded-lg hover:bg-[#3E3D32] text-sm transition-colors"
                    >
                      Update Account
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Job Statistics */}
            {artisan.stats && (
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <h3 className="font-medium text-gray-800 mb-4 sm:mb-6 text-sm sm:text-base">Job Statistics</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  <div className="bg-[#141114e1] p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Total Jobs</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {artisan.stats.totalJobs}
                    </p>
                  </div>
                  <div className="bg-green-900 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Completed</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {artisan.stats.completedJobs}
                    </p>
                  </div>
                  <div className="bg-blue-900 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Accepted</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {artisan.stats.acceptedJobs}
                    </p>
                  </div>
                  <div className="bg-yellow-900 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Pending</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {artisan.stats.pendingJobs}
                    </p>
                  </div>
                  <div className="bg-red-900 p-3 sm:p-4 rounded-lg col-span-2 sm:col-span-1">
                    <p className="text-xs sm:text-sm text-gray-100">Cancelled</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {artisan.stats.cancelledJobs}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminArtisansDetailPage;