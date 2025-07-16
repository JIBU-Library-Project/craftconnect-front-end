import React from "react";
import CategoryCard from "../CategoryCard";
import categories from "../../data/categories";

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Popular Service Categories
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
          Find skilled professionals across various trades and services
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium"
          >
            Browse All Categories
          </a>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
