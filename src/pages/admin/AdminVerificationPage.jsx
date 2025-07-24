import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  User,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useGetVerificationRequests } from "../../queries/adminQueries";

function AdminVerificationPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRequest, setExpandedRequest] = useState(null);

  const { data, isLoading, error } = useGetVerificationRequests();

  const requests = data?.verificationRequests || [];

  const filteredRequests = requests.filter((request) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && request.verificationStatus === "Pending") ||
      (filter === "verified" && request.verificationStatus === "Verified") ||
      (filter === "rejected" && request.verificationStatus === "Rejected");

    const lowerSearch = searchTerm.toLowerCase();

    const matchesSearch =
      (request.artisanName?.toLowerCase().includes(lowerSearch) ?? false) ||
      (request.businessName?.toLowerCase().includes(lowerSearch) ?? false) ||
      (request.idNumber?.toLowerCase().includes(lowerSearch) ?? false);

    return matchesFilter && matchesSearch;
  });

  const handleReview = (request) => {
    navigate(`/admin/verify-detail/${request._id}`, { state: { request } });
  };

  const toggleExpand = (requestId) => {
    setExpandedRequest(expandedRequest === requestId ? null : requestId);
  };

  const statusBadge = (status) => {
    const statusConfig = {
      Pending: {
        bg: "bg-amber-50",
        text: "text-amber-800",
        icon: <Clock className="h-4 w-4 text-amber-500" />,
      },
      Verified: {
        bg: "bg-emerald-50",
        text: "text-emerald-800",
        icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
      },
      Rejected: {
        bg: "bg-red-50",
        text: "text-red-800",
        icon: <XCircle className="h-4 w-4 text-red-500" />,
      },
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusConfig[status]?.bg} ${statusConfig[status]?.text}`}
      >
        {statusConfig[status]?.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
          Verification Requests
        </h1>
        <div className="flex items-center mt-2 text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {requests.filter((r) => r.verificationStatus === "Pending").length}{" "}
            pending requests
          </span>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, business or ID..."
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            className="pl-10 w-full rounded-lg border border-gray-300 py-2 px-4 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          No Verifcation Request Found
        </div>
      ) : (
        <>
          {/* Desktop Table View (lg screens and up) */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artisan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Identification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <tr key={request._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                              {request.profilePic ? (
                                <img
                                  src={request.profilePic}
                                  alt={request.artisanName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                  <User className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {request.artisanName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {request.artisanEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {request.businessName}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {request.craft}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 capitalize">
                            {request.idType.replace("_", " ")}
                          </div>
                          <div className="text-xs text-gray-500">
                            {request.idNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(request.submittedAt)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(request.submittedAt).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {statusBadge(request.verificationStatus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleReview(request)}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition duration-200"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No verification requests found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tablet Card View (md screens) */}
          <div className="hidden md:block lg:hidden space-y-4">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-3">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                          {request.profilePic ? (
                            <img
                              src={request.profilePic}
                              alt={request.artisanName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <User className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {request.artisanName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {request.artisanEmail}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Business:</span>{" "}
                        {request.businessName}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Craft:</span>{" "}
                        <span className="capitalize">{request.craft}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm mb-2">
                        <span className="font-medium">ID Type:</span>{" "}
                        <span className="capitalize">
                          {request.idType.replace("_", " ")}
                        </span>
                      </div>
                      <div className="text-sm mb-2">
                        <span className="font-medium">ID Number:</span>{" "}
                        {request.idNumber}
                      </div>
                      <div className="text-sm mb-2">
                        <span className="font-medium">Submitted:</span>{" "}
                        {formatDate(request.submittedAt)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>{statusBadge(request.verificationStatus)}</div>
                        <button
                          onClick={() => handleReview(request)}
                          className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-200"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                No verification requests found matching your criteria
              </div>
            )}
          </div>

          {/* Mobile Card View (sm screens and down) */}
          <div className="md:hidden space-y-3">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request) => (
                <div
                  key={request._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
                >
                  <div
                    className="flex justify-between items-start cursor-pointer"
                    onClick={() => toggleExpand(request._id)}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        {request.profilePic ? (
                          <img
                            src={request.profilePic}
                            alt={request.artisanName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-400">
                            <User className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3 flex justify-end-safe space-x-6 items-center  ">
                                               <div className="text-xs text-gray-500">
                          {request.businessName}
                        </div>
                        <div className="mt-1">
                          {statusBadge(request.verificationStatus)}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {expandedRequest === request._id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {expandedRequest === request._id && (
                    <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                      
                      <div className="text-sm">
                        <span className="font-medium">Craft:</span>{" "}
                        <span className="capitalize">{request.craft}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">ID Type:</span>{" "}
                        <span className="capitalize">
                          {request.idType.replace("_", " ")}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">ID Number:</span>{" "}
                        {request.idNumber}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Submitted:</span>{" "}
                        {formatDate(request.submittedAt)}
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => handleReview(request)}
                          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition duration-200"
                        >
                          Review Request
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center text-gray-500">
                No verification requests found matching your criteria
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AdminVerificationPage;