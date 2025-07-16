import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const benefitsHomeowners = [
  "Access to verified, skilled artisans in your area",
  "View portfolios and customer reviews before hiring",
  "Direct communication with artisans via WhatsApp",
  "Report and review system for quality assurance",
];

const benefitsArtisans = [
  "Showcase your skills with a professional portfolio",
  "Get verified to build trust with potential clients",
  "Receive direct job requests from clients in your area",
  "Grow your business with positive reviews",
];

const BenefitsSection = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const renderBenefitList = (benefits) =>
    benefits.map((benefit, index) => (
      <li key={index} className="flex items-start">
        <FaCheckCircle className="text-green-500 mt-1 mr-3 shrink-0" />
        <span className="text-gray-700">{benefit}</span>
      </li>
    ));

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Homeowners */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits for Homeowners
            </h2>
            <ul className="space-y-4">
              {renderBenefitList(benefitsHomeowners)}
            </ul>
          </div>

          {/* Artisans */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Benefits for Artisans
            </h2>
            <ul className="space-y-4">
              {renderBenefitList(benefitsArtisans)}
            </ul>

            <div className="mt-8">
              <button
                onClick={handleSignUp}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium shadow-md"
              >
                Create Artisan Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
