const AdminDashboardPage = () => {
  // Sample data
  const stats = [
    {
      title: "Total Users",
      value: "2,458",
      change: "+12%",
      icon: "fas fa-users",
    },
    { title: "Artisans", value: "1,234", change: "+8%", icon: "fas fa-tools" },
    {
      title: "Homeowners",
      value: "1,224",
      change: "+15%",
      icon: "fas fa-home",
    },
    {
      title: "Revenue",
      value: "$24,580",
      change: "+20%",
      icon: "fas fa-dollar-sign",
    },
  ];

  const recentActivities = [
    {
      user: "Kwame Mensah",
      action: "Registered as Artisan",
      time: "10 min ago",
    },
    { user: "Ama Johnson", action: "Posted a review", time: "25 min ago" },
    { user: "Adwoa Asante", action: "Updated profile", time: "1 hour ago" },
    { user: "Kofi Boateng", action: "Booked a service", time: "2 hours ago" },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-600">{stat.title}</p>
                <h2 className="text-2xl font-bold mt-2">{stat.value}</h2>
                <p className="text-green-500 mt-1">{stat.change}</p>
              </div>
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                <i className={`${stat.icon} text-xl`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start border-b border-gray-200 pb-4"
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-4">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-gray-600">{activity.action}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-blue-700 text-left pl-4">
                <i className="fas fa-user-plus mr-2"></i> Add New User
              </button>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-left pl-4">
                <i className="fas fa-file-alt mr-2"></i> Generate Report
              </button>
              <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 text-left pl-4">
                <i className="fas fa-cog mr-2"></i> System Settings
              </button>
              <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 text-left pl-4">
                <i className="fas fa-bell mr-2"></i> Send Notification
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">User Verification Queue</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <div>
                    <p className="font-medium">Kwame Mensah</p>
                    <p className="text-gray-600 text-sm">Plumber</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Reject
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <div>
                    <p className="font-medium">Adwoa Asante</p>
                    <p className="text-gray-600 text-sm">Electrician</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                    Approve
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Reject
                  </button>
                </div>
              </div>
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-blue-700">
              View All Pending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
