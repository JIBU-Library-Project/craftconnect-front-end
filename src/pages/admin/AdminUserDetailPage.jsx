import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { adminUserProfiles as users } from "../../data/dummyData";

function AdminUserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Find user in users data
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          User Not Found
        </h2>
        <button
          onClick={() => navigate("/admin/users")}
          className="px-4 py-2 bg-[#272822] text-white rounded hover:bg-[#3E3D32]"
        >
          Back to Users
        </button>
      </div>
    );
  }

  const onSubmit = (data) => {
    console.log("User update:", data);
    navigate("/admin/users");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/admin/users")}
        className="flex items-center text-[#272822] hover:text-[#3E3D32] mb-6"
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
            <div className="w-20 h-20 rounded-xl overflow-hidden">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center mt-2">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full
                  ${
                    user.role === "admin"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {user.role}
                </span>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full
                  ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.status}
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
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Last Active</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(user.lastLogin).toLocaleDateString()}
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
                    {...register("status", { required: "Status is required" })}
                    defaultValue={user.status}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#272822] focus:border-transparent ${
                      errors.status ? "border-red-500" : ""
                    }`}
                  >
                    <option value="Active">Activate</option>
                    <option value="Suspended">Suspend</option>
                  </select>
                </div>

                <div className="flex pt-10 justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#272822] text-white rounded-lg hover:bg-[#3E3D32] text-sm"
                  >
                    Update Account
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Stats Section */}
          {user.stats && (
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-800 mb-4">Job Request Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-[#141114e1] p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Total Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.totalJobs}
                  </p>
                </div>
                <div className="bg-green-900 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Completed Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.completedJobs}
                  </p>
                </div>
                <div className="bg-blue-900 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Active Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.acceptedJobs}
                  </p>
                </div>
                <div className="bg-yellow-900 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Pending Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.pendingJobs}
                  </p>
                </div>
                <div className="bg-red-900 p-3 rounded-lg">
                  <p className="text-sm text-gray-100">Cancelled Job Requests</p>
                  <p className="text-xl font-semibold text-yellow-300">
                    {user.stats.cancelledJobs}
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
