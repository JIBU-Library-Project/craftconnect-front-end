import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaucet, faBolt, faPaintRoller, faRulerCombined,
  faTshirt, faTrowel, faFan, faHome,
  faCar, faBroom, faSeedling, faSpa
} from '@fortawesome/free-solid-svg-icons';

const CategoryCard = ({ category }) => {
  // Icon mapping
  const iconMap = {
    'fas fa-faucet': faFaucet,
    'fas fa-bolt': faBolt,
    'fas fa-paint-roller': faPaintRoller,
    'fas fa-ruler-combined': faRulerCombined,
    'fas fa-tshirt': faTshirt,
    'fas fa-trowel': faTrowel,
    'fas fa-fan': faFan,
    'fas fa-home': faHome,
    'fas fa-car': faCar,
    'fas fa-broom': faBroom,
    'fas fa-seedling': faSeedling,
    'fas fa-spa': faSpa
  };

  // Dark theme color variants
  const darkThemeColors = {
    bgColor: '#1e1f1c',
    cardBg: '#2a2b26',
    textColor: '#f5f5f5',
    hoverBg: '#353631'
  };

  return (
    <Link 
      to={`/search?category=${category.id}`}
      className="category-card group rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 border border-gray-800 hover:border-opacity-50"
      style={{
        backgroundColor: darkThemeColors.cardBg,
        borderColor: `${category.color}20`,
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)'
      }}
    >
      <div 
        className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
        style={{ 
          backgroundColor: `${category.color}15`,
          border: `1px solid ${category.color}30`
        }}
      >
        <FontAwesomeIcon 
          icon={iconMap[category.icon]} 
          className="text-2xl" 
          style={{ 
            color: category.color,
            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.2))'
          }}
        />
      </div>
      <h3 
        className="font-medium text-sm uppercase tracking-wider"
        style={{ color: darkThemeColors.textColor }}
      >
        {category.name}
      </h3>
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${category.color}15 0%, transparent 70%)`,
          zIndex: -1
        }}
      />
    </Link>
  );
};

export default CategoryCard;