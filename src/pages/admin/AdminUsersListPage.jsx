import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetAllUsers } from "../../queries/adminQueries";
import { 
  Loader2,
  AlertCircle,
  RefreshCw
} from "lucide-react";

function AdminUsersListPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users data using the query with refetch capability
  const { 
    data: usersData, 
    isLoading, 
    error, 
    refetch 
  } = useGetAllUsers();

  // Safely handle the users data
  const users = Array.isArray(usersData?.users) ? usersData.users : 
               Array.isArray(usersData) ? usersData : [];

  const filteredUsers = users.filter((user) => {
    if (!user) return false;
    
    const userName = user.name?.toString() || '';
    const userEmail = user.email?.toString() || '';
    const userStatus = user.accountStatus?.toString() || '';
    
    const matchesStatus =
      statusFilter === "all" || userStatus === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userEmail.toLowerCase().includes(searchTerm.toLowerCase());
      
    return matchesStatus && matchesSearch;
  });

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
        <div className="text-center flex flex-col items-center max-w-md p-6">
          <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load users
          </h3>
          <p className="text-gray-600 mb-4">
            {error.message || "An error occurred while fetching user data"}
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-600">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                        {user.profilePic ? (
                          <img
                            src={user.profilePic}
                            alt={user.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              e.target.src = '/default-profile.png';
                              e.target.onerror = null;
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
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
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name || 'No name provided'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email || 'No email provided'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        user.accountStatus === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.accountStatus === "Suspended"
                          ? "bg-red-100 text-red-800"
                          : user.accountStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.accountStatus || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/users/${user._id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      View
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden border border-gray-200">
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt={user.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = '/default-profile.png';
                        e.target.onerror = null;
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {user.name || 'No name provided'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {user.email || 'No email provided'}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        user.accountStatus === "Active"
                          ? "bg-green-100 text-green-800"
                          : user.accountStatus === "Suspended"
                          ? "bg-red-100 text-red-800"
                          : user.accountStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.accountStatus || 'Unknown'}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <div>
                      <p>
                        Joined: {user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}
                      </p>
                      <p>
                        Last active: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto max-w-md">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "There are currently no users in the system"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsersListPage; 