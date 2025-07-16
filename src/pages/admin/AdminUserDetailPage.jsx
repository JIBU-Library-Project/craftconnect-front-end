import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { reviews, users, artisans } from "../../data/dummyData";

function AdminUserDetailPage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Find user in both users and artisans
  const user = [...users, ...artisans].find((u) => u.id === userId);
  const userReviews = reviews.filter((r) => r.userId === userId);

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

  const onSubmit = (data) => {
    console.log("User update:", data);
    // In real app: API call to update user
    navigate("/admin/users");
  };

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
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-20 h-20" />
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center mt-2">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full
                    ${
                      user.role === "artisan"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {user.role === "artisan" ? "Artisan" : "Homeowner"}
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

            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                Message
              </button>
              <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200">
                Edit Profile
              </button>
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
                {user.role === "artisan" && (
                  <>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Business</dt>
                      <dd className="text-sm text-gray-900">
                        {user.businessName}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Craft</dt>
                      <dd className="text-sm text-gray-900">{user.craft}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Rating</dt>
                      <dd className="text-sm text-gray-900">
                        <span className="text-yellow-500">★</span> {user.rating}
                        <span className="text-gray-400 ml-1">
                          ({user.completedJobs} jobs)
                        </span>
                      </dd>
                    </div>
                  </>
                )}
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
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.status ? "border-red-500" : ""
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending Verification</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 text-sm">
                    Admin Notes
                  </label>
                  <textarea
                    {...register("adminNotes")}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add notes about this account..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                  >
                    Update Account
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-800 mb-3">
              {user.role === "artisan" ? "Reviews Received" : "Reviews Posted"}
            </h3>

            {userReviews.length === 0 ? (
              <div className="bg-gray-50 p-8 text-center rounded-lg">
                <p className="text-gray-500">No reviews found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`${
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full
                          ${
                            review.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : ""
                          }
                          ${
                            review.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : ""
                          }`}
                        >
                          {review.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                    {user.role === "artisan" && (
                      <p className="text-sm text-gray-500 mt-2">
                        By {review.userName}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUserDetailPage;
