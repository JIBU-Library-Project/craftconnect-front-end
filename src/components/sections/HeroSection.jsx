import React from "react";
import { Link } from "react-router";
import SearchBar from "../SearchBar"

const HeroSection = () => {
  return (
    <section
      className="hero-bg text-white flex items-center h-[90vh] min-h-[600px]  bg-amber-600 "
     
    >
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Trusted Artisans in Ghana
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
          Connecting you with skilled professionals for all your home and
          business needs
        </p>

        <SearchBar />

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/search"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Find Artisans
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-medium"
          >
            Join as Artisan
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection
