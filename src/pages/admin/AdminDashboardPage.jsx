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
      title: "Total Pending Jobs",
      value: "1,224",
      change: "+15%",
      icon: "fas fa-home",
    },
    {
      title: "Total Active Jobs",
      value: "120",
      change: "+20%",
      icon: "fas fa-dollar-sign",
    },
    {
      title: "Total Decline Jobs",
      value: "1,224",
      change: "+15%",
      icon: "fas fa-home",
    },
    {
      title: "Total Cancelled Jobs",
      value: "120",
      change: "+20%",
      icon: "fas fa-dollar-sign",
    },
  ];

  

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-2xl text-indigo-600 font-bold mb-6">Admin Dashboard</h1>

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

     
    </div>
  );
};

export default AdminDashboardPage;
