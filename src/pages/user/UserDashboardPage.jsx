import { useNavigate } from "react-router";

const UserDashboardPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Jobs",
      description:
        "View and manage your pending, active, completed, and cancelled job requests in one place.",
      buttonText: "Go to My Jobs",
      onClick: () => navigate("/homeowner/my-jobs"),
    },
    {
      title: "Find Artisans & Request Service",
      description:
        "Browse skilled artisans and Request Service them directly for your projects easily.",
      buttonText: "Find Artisans",
      onClick: () => navigate("/search"),
    },
    {
      title: "Profile & Job Status",
      description:
        "View and update your profile, and track the status and statistics of your jobs.",
      buttonText: "View Profile",
      onClick: () => navigate("/homeowner/user-profile"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
        Welcome to your Homeowner Dashboard
      </h1>
      <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
        Manage your jobs, find artisans, and track your project statuses
        seamlessly.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:border-indigo-300 transition">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                {card.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {card.description}
              </p>
            </div>
            <button
              onClick={card.onClick}
              className="mt-4 bg-[#f05335] text-white text-sm sm:text-base px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors w-full text-center">
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboardPage;
