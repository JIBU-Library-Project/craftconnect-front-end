import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { artisans } from "../../data/dummyData";

function AdminArtisansDetailPage() {
  const navigate = useNavigate();
  const { artisanId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Find artisan in artisans data
  const artisan = artisans.find((a) => a.id === artisanId);

  if (!artisan) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Artisan Not Found
        </h2>
        <button
          onClick={() => navigate("/admin/artisans")}
          className="px-4 py-2 bg-[#272822] text-white rounded hover:bg-[#3E3D32]"
        >
          Back to Artisans
        </button>
      </div>
    );
  }

  const onSubmit = (data) => {
    console.log("Artisan update:", data);
    navigate("/admin/artisans");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/admin/artisans")}
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
        Back to Artisans
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200">
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
                    className="h-10 w-10"
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
            <div className="ml-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {artisan.name}
              </h2>
              <p className="text-gray-600">{artisan.email}</p>
              <div className="flex items-center mt-2">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  Artisan
                </span>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-medium rounded-full
                  ${
                    artisan.accountStatus === "active"
                      ? "bg-green-100 text-green-800"
                      : artisan.accountStatus === "suspended"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {artisan.accountStatus}
                </span>
                <span className="ml-2 flex items-center text-sm text-gray-700">
                  <span className="text-yellow-500">★</span> {artisan.rating}
                  <span className="text-gray-400 ml-1">
                    ({artisan.completedJobs} jobs)
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">
                Business Information
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Account Status</dt>
                  <dd className="text-sm text-gray-900">
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                      ${
                        artisan.accountStatus === "Active"
                          ? "bg-green-100 text-green-800"
                          : artisan.accountStatus === "Suspended"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {artisan.accountStatus}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Verification Status</dt>
                  <dd className="text-sm text-gray-900">
                    <span
                      className={`px-2 py-1 rounded-full text-xs
                      ${
                        artisan.verificationStatus === "Verified"
                          ? "bg-green-100 text-green-800"
                          : artisan.verificationStatus === "Pending"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {artisan.verificationStatus}
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Business Name</dt>
                  <dd className="text-sm text-gray-900">
                    {artisan.businessName || "-"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Craft/Specialty</dt>
                  <dd className="text-sm text-gray-900">
                    {artisan.craft || "-"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Joined Date</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(artisan.joinedDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900">
                    {artisan.location || "-"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">
                    {artisan.phone || "-"}
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
                    defaultValue={artisan.accountStatus}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#272822] focus:border-transparent ${
                      errors.accountStatus ? "border-red-500" : ""
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
        </div>
      </div>
    </div>
  );
}

export default AdminArtisansDetailPage;
