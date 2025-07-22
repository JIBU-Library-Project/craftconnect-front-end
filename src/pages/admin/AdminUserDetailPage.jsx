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
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center flex flex-col items-center max-w-md p-6">
          <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load user
          </h3>
          <p className="text-gray-600 mb-4">
            {error.message || "An error occurred while fetching user data"}
          </p>
          <button
            onClick={() => navigate("/admin/users")}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          User Not Found
        </h2>
        <button
          onClick={() => navigate("/admin/users")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/admin/users")}
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
        Back to Users
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
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
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name || "No name provided"}
              </h2>
              <p className="text-gray-600">
                {user.email || "No email provided"}
              </p>
              <div className="flex items-center mt-2">
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
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">
                Account Information
              </h3>

              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Joined Date</dt>
                  <dd className="text-sm text-gray-900">
                    {user.joinedDate
                      ? new Date(user.joinedDate).toLocaleDateString()
                      : "N/A"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Last Active</dt>
                  <dd className="text-sm text-gray-900">
                    {user.lastLogin
                      ? new Date(user.lastLogin).toLocaleDateString()
                      : "N/A"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">{user.phone || "-"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900">
                    {user.location || "-"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Account Status</dt>
                  <dd className="text-sm text-gray-900">
                    {user.accountStatus || "-"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">
                Account Management
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 text-sm">
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
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
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

                <div className="flex pt-10 justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 text-white rounded-lg text-sm ${
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

          {/* Stats Section */}
          {user.stats && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-800 mb-4">
                Job Request Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Total Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.totalJobs || 0}
                  </p>
                </div>
                <div className="bg-green-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">
                    Completed Job Requests
                  </p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.completedJobs || 0}
                  </p>
                </div>
                <div className="bg-blue-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Active Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.acceptedJobs || 0}
                  </p>
                </div>
                <div className="bg-yellow-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Pending Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.pendingJobs || 0}
                  </p>
                </div>
                <div className="bg-red-800 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">
                    Cancelled Job Requests
                  </p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.cancelledJobs || 0}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetailPage;
