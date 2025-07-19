import React from "react";
import { Search, UserCheck, Calendar, CreditCard } from "lucide-react";
import { useNavigate } from "react-router";

const HowItWorks = () => {
  const navigate = useNavigate();
  const steps = [
    {
      icon: Search,
      title: "Search & Browse",
      description: "Find verified artisans by category, rating, and location.",
      color: "blue",
    },
    {
      icon: UserCheck,
      title: "Compare & Choose",
      description: "Review profiles and past work to select your artisan.",
      color: "teal",
    },
    {
      icon: Calendar,
      title: "Book Service",
      description: "Schedule the service and get instant confirmation.",
      color: "orange",
    },
    {
      icon: CreditCard,
      title: "Pay Upon Completion",
      description: "Pay your artisan directly after they complete the job.",
      color: "green",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      teal: "bg-teal-100 text-teal-600",
      orange: "bg-orange-100 text-orange-600",
      green: "bg-green-100 text-green-600",
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-6">
            How CraftConnect Works
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting with trusted artisans for your home projects has never
            been easier.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gray-300 translate-x-8 z-0" />
                )}

                <div className="relative bg-white p-8 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 text-center">
                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${getColorClasses(
                        step.color
                      )}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-indigo-600 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-indigo-100 mb-6 text-lg max-w-xl mx-auto">
            Join thousands using CraftConnect to find, book, and manage home
            service projects seamlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition font-semibold text-lg"
              onClick={() => navigate("/search")}
            >
              Find Artisans
            </button>
            <button
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-600 transition font-semibold text-lg"
              onClick={() => navigate("/signup")}
            >
              Join as Artisan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
