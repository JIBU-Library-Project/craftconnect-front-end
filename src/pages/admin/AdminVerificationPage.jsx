// AdminVerificationPage.jsx
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { artisanVerificationRequest } from "../../data/dummyData";

function AdminVerificationPage() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests(artisanVerificationRequest);
      setLoading(false);
    }, 800);
  }, []);

  const filteredRequests = requests.filter((request) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && request.status === "pending") ||
      (filter === "approved" && request.status === "approved");

    const matchesSearch =
      request.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.idNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleReview = (request) => {
    navigate("/admin/verify-detail", { state: { request } });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Verification Requests
        </h1>
        <p className="text-gray-600 mt-2">
          {requests.filter((r) => r.status === "pending").length} pending
          requests
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search requests..."
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Artisan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Business
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
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
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
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
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {request.businessName}
                      <div className="text-xs text-gray-400">
                        {request.craft}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                      {request.idType.replace("_", " ")}
                      <div className="text-xs">{request.idNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(request.submittedAt).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {new Date(request.submittedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : ""
                        }
                        ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : ""
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleReview(request)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminVerificationPage;
