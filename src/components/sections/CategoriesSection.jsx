import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaucet,
  faBolt,
  faPaintRoller,
  faRulerCombined,
  faTshirt,
  faTrowel,
  faFan,
  faHome,
  faCar,
  faBroom,
  faSeedling,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";
import categories from "../../data/categories";

const iconMap = {
  "fas fa-faucet": faFaucet,
  "fas fa-bolt": faBolt,
  "fas fa-paint-roller": faPaintRoller,
  "fas fa-ruler-combined": faRulerCombined,
  "fas fa-tshirt": faTshirt,
  "fas fa-trowel": faTrowel,
  "fas fa-fan": faFan,
  "fas fa-home": faHome,
  "fas fa-car": faCar,
  "fas fa-broom": faBroom,
  "fas fa-seedling": faSeedling,
  "fas fa-spa": faSpa,
};

const CategorySection = () => {
  return (
    <section className="w-full py-16 bg-[#ffffff] px-4 my-10 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find skilled professionals for all your home service needs
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/search?category=${category.id}`}
                className=" flex flex-col items-center justify-center bg-[#f7f7f7] rounded-xl p-6 transition-all duration-300 border backdrop-blur-2xl shadow-md border-gray-200 hover:border-indigo-300 hover:shadow-xl"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${category.color}10`,
                    border: `1px solid ${category.color}20`
                  }}
                >
                  <FontAwesomeIcon
                    icon={iconMap[category.icon]}
                    className="text-2xl"
                    style={{ 
                      color: category.color,
                    }}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 text-center mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 text-center">
                  {category.count || '50+'} professionals
                </p>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-sm"
          >
            View All Categories
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;