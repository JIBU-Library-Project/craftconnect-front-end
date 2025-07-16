import React from "react";
import HeroSection from "../../components/sections/HeroSection";
import BenefitsSection from "../../components/sections/BenefitsSection";
import CategoriesSection from "../../components/sections/CategoriesSection";
import TestimonialSlider from "../../components/TestimonialSlider";
import testimonials from "../../data/testimonials";
import Footer from "../../components/Footer";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <BenefitsSection />
      <CategoriesSection />
      <TestimonialSlider testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of homeowners and artisans using CraftConnect to find
            and offer services
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium"
            >
              Find an Artisan
            </a>
            <a
              href="/signup"
              className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 font-medium"
            >
              Join as Artisan
            </a>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default HomePage;
