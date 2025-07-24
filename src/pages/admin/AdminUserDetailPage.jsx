import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useGetSingleUser } from "../../queries/adminQueries";
import { Loader2, AlertCircle } from "lucide-react";

function AdminUserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch user data using the query
  const { data, isLoading, error } = useGetSingleUser(userId);

  const onSubmit = async (data) => {
    try {
      console.log("User update:", data);
      // Here you would typically call an API to update the user
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      navigate("/admin/users");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  const user = data?.user;

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full px-4">
        <div className="text-center flex flex-col items-center max-w-sm sm:max-w-md p-4 sm:p-6">
          <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 mb-3 sm:mb-4 text-red-500" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
            Failed to load user
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 text-center">
            {error.message || "An error occurred while fetching user data"}
          </p>
          <button
            onClick={() => navigate("/admin/users")}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
          >
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  // User not found state
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              User Not Found
            </h2>
            <button
              onClick={() => navigate("/admin/users")}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm sm:text-base"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 sm:mb-6 text-sm sm:text-base"
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
          Back to Users
        </button>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header Section with Profile */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border border-gray-200 flex-shrink-0">
                <img
                  src={user.profilePic || "/default-profile.png"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-profile.png";
                  }}
                />
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
                  {user.name || "No name provided"}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base truncate">
                  {user.email || "No email provided"}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.accountStatus === "Active"
                        ? "bg-green-100 text-green-800"
                        : user.accountStatus === "Suspended"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.accountStatus || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Info and Management Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Account Information */}
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <h3 className="font-medium text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
                  Account Information
                </h3>
                <dl className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Joined Date</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 sm:text-right">
                      {user.joinedDate
                        ? new Date(user.joinedDate).toLocaleDateString()
                        : "N/A"}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Last Active</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 sm:text-right">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "N/A"}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Phone</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 break-words sm:text-right sm:max-w-[60%]">
                      {user.phone || "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Location</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 break-words sm:text-right sm:max-w-[60%]">
                      {user.location || "-"}
                    </dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                    <dt className="text-xs sm:text-sm text-gray-500 font-medium sm:font-normal">Account Status</dt>
                    <dd className="text-xs sm:text-sm text-gray-900 sm:text-right">
                      {user.accountStatus || "-"}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Account Management */}
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <h3 className="font-medium text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
                  Account Management
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
                  <div className="mb-4 flex-1">
                    <label className="block text-gray-700 mb-2 text-xs sm:text-sm font-medium">
                      Account Status
                    </label>
                    <select
                      {...register("accountStatus", {
                        required: "Status is required",
                      })}
                      defaultValue={user.accountStatus}
                      className={`w-full px-3 py-2 border ${
                        errors.accountStatus
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm`}
                    >
                      <option value="Active">Activate User</option>
                      <option value="Suspended">Suspend User</option>
                    </select>
                    {errors.accountStatus && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.accountStatus.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end pt-4 sm:pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto px-4 py-2 text-white rounded-lg text-sm transition-colors ${
                        isSubmitting
                          ? "bg-indigo-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {isSubmitting ? "Updating..." : "Update Account"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Job Request Statistics */}
            {user.stats && (
              <div className="border border-gray-200 rounded-lg p-4 sm:p-5">
                <h3 className="font-medium text-gray-800 mb-4 sm:mb-6 text-sm sm:text-base">
                  Job Request Statistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
                  <div className="bg-gray-800 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Total Requests</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {user.stats.totalJobs || 0}
                    </p>
                  </div>
                  <div className="bg-green-800 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Completed</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {user.stats.completedJobs || 0}
                    </p>
                  </div>
                  <div className="bg-blue-800 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Active</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {user.stats.acceptedJobs || 0}
                    </p>
                  </div>
                  <div className="bg-yellow-800 p-3 sm:p-4 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-100">Pending</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {user.stats.pendingJobs || 0}
                    </p>
                  </div>
                  <div className="bg-red-800 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                    <p className="text-xs sm:text-sm text-gray-100">Cancelled</p>
                    <p className="text-lg sm:text-xl font-semibold text-yellow-300 mt-1">
                      {user.stats.cancelledJobs || 0}
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

export default AdminUserDetailPage;