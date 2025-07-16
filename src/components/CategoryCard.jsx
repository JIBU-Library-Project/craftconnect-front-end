import React from 'react';
import { Link } from 'react-router';

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/search?category=${category.id}`}
      className="category-card bg-white rounded-lg shadow p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
        style={{ backgroundColor: category.bgColor }}
      >
        <i className={`${category.icon} text-xl`} style={{ color: category.color }}></i>
      </div>
      <h3 className="font-semibold">{category.name}</h3>
    </Link>
  );
};

export default CategoryCard;