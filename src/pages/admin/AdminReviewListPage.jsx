import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetReviews } from "../../queries/reviewsQueries";
import { AlertCircle, Loader2, ChevronRight } from "lucide-react";

function AdminReviewListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useGetReviews();

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
          <p className="text-indigo-500">Error loading reviews.</p>
        </div>
      </div>
    );
  }

  const AdminReview = data.reviews;

  if (!AdminReview) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="text-center flex flex-col items-center">
          <AlertCircle className="w-10 h-10 mb-2 text-gray-500" />
          <p className="text-gray-500">No Review data found.</p>
        </div>
      </div>
    );
  }

  const getStatus = (rating) => {
    if (rating === 1) return "Bad";
    if (rating >= 2 && rating <= 3) return "Fair";
    if (rating >= 4 && rating <= 5) return "Excellent";
    return "Unknown";
  };

  const filteredReviews = AdminReview.filter((review) => {
    const status = getStatus(review.rating);
    const matchesFilter = filter === "all" || status === filter;

    const matchesSearch =
      review?.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review?.businessName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">
          Review Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search reviews..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Reviews</option>
            <option value="Excellent">Excellent (4-5 stars)</option>
            <option value="Fair">Fair (2-3 stars)</option>
            <option value="Bad">Bad (1 star)</option>
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Homeowner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Artisan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => {
                const status = getStatus(review.rating);
                return (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={review?.userProfilePic}
                            alt={review?.userName}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/profiles/default-user.jpg";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {review?.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={review?.artisanProfilePic}
                            alt={review?.businessName}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/profiles/default-artisan.jpg";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {review?.businessName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {review.jobId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-lg ${
                              i < review.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          status === "Excellent"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }
                        ${
                          status === "Fair"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${status === "Bad" ? "bg-red-100 text-red-800" : ""}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/admin/reviews/${review._id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredReviews.map((review) => {
          const status = getStatus(review.rating);
          return (
            <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full object-cover mr-3"
                    src={review?.userProfilePic}
                    alt={review?.userName}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profiles/default-user.jpg";
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{review?.userName}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full
                  ${status === "Excellent" ? "bg-green-100 text-green-800" : ""}
                  ${status === "Fair" ? "bg-yellow-100 text-yellow-800" : ""}
                  ${status === "Bad" ? "bg-red-100 text-red-800" : ""}`}
                >
                  {status}
                </span>
              </div>

              <div className="flex items-center mb-2">
                <img
                  className="h-8 w-8 rounded-full object-cover mr-2"
                  src={review?.artisanProfilePic}
                  alt={review?.businessName}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/profiles/default-artisan.jpg";
                  }}
                />
                <span className="text-sm font-medium">{review?.businessName}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">Job ID: {review.jobId}</span>
              </div>

              <button
                onClick={() => navigate(`/admin/reviews/${review._id}`)}
                className="w-full flex items-center justify-between mt-2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
              >
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminReviewListPage;