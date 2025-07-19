import React from "react";
import HeroSection from "../../components/sections/HeroSection";
import CategoriesSection from "../../components/sections/CategoriesSection";
import Footer from "../../components/Footer";
import categories from "../../data/categories";
import AnimatedSection from "../../components/sections/AnimatedSection";
import HeroSlider from "./HeroSlider";

import {
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaWallet,
  FaHeadset,
  FaTools,
} from "react-icons/fa";
import HowItWorks from "../../components/sections/HowItWorks";
import Hero from "../../components/sections/Hero";

const HomePage = () => {
  return (
    <div>
      <AnimatedSection direction="up">
        <Hero />

        <AnimatedSection direction="up">
          <HeroSlider />
        </AnimatedSection>

        <CategoriesSection categories={categories} />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2}>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2}>
        {/* Benefits Section */}
        <section className="py-20 bg-[#090d16]  ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose CraftConnect
              </h2>
              <p className="text-xl text-white max-w-3xl mx-auto">
                We're revolutionizing home services in Africa
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaCheckCircle className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Verified Professionals
                </h3>
                <p className="text-gray-600">
                  Every artisan is background-checked and skill-verified before
                  joining our platform
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaClock className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Quick Response</h3>
                <p className="text-gray-600">
                  Get connected with available artisans in your area within
                  minutes
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaShieldAlt className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Quality Guarantee</h3>
                <p className="text-gray-600">
                  We stand behind every job with our satisfaction guarantee
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaWallet className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
                <p className="text-gray-600">
                  No hidden costs - see all fees upfront before booking
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaHeadset className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer service team is always available to help
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <FaTools className="text-4xl text-indigo-500 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Wide Range of Services
                </h3>
                <p className="text-gray-600">
                  From plumbing to tailoring, we've got all your home needs
                  covered
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default HomePage;
