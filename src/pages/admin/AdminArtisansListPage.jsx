import { useState } from "react";
import { useNavigate } from "react-router";
import { artisans } from "../../data/dummyData";

function AdminArtisansListPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArtisans = artisans.filter((artisan) => {
    const matchesStatus =
      statusFilter === "all" || artisan.accountStatus === statusFilter;
    const matchesSearch =
      searchTerm === "" ||
      artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artisan.craft.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Artisan Management
        </h1>
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search artisans..."
            className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
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
                  Artisan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Craft
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
              {filteredArtisans.map((artisan) => (
                <tr key={artisan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                        {artisan.profilePic ? (
                          <img
                            src={artisan.profilePic}
                            alt={artisan.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
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
                          {artisan.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {artisan.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {artisan.craft}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        artisan.accountStatus === "Active"
                          ? "bg-green-600 text-white"
                          : artisan.accountStatus === "Suspended"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {artisan.accountStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(artisan.joinedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(artisan.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => navigate(`/admin/artisans/${artisan.id}`)}
                      className="text-[#272822] hover:text-[#3E3D32]"
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
          {filteredArtisans.map((artisan) => (
            <div key={artisan.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                  {artisan.profilePic ? (
                    <img
                      src={artisan.profilePic}
                      alt={artisan.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
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
                        {artisan.name}
                      </h3>
                      <p className="text-sm text-gray-500">{artisan.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Craft: {artisan.craft}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        artisan.accountStatus === "Active"
                          ? "bg-green-600 text-white"
                          : artisan.accountStatus === "Suspended"
                          ? "bg-red-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {artisan.accountStatus}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <div>
                      <p>
                        Joined: {new Date(artisan.joinedDate).toLocaleDateString()}
                      </p>
                      <p>
                        Last active:{" "}
                        {new Date(artisan.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/admin/artisans/${artisan.id}`)}
                      className="text-[#272822] hover:text-[#3E3D32] self-end"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredArtisans.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">No artisans found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

export default AdminArtisansListPage;