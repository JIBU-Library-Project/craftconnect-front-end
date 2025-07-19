// src/components/HeroSection.jsx
import React, { useState } from 'react';

const accordionItems = [
  "Talent Assessments",
  "Talent Acquisition",
  "Talent Management",
  "Online Assessment Solutions",
  "Question Bank"
];

const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center lg:items-start">
        {/* Left: Arched images */}
        <div className="flex gap-4 mb-10 lg:mb-0">
          {[1, 2, 3].map((num) => (
            <img
              key={num}
              src={`/assets/image${num}.jpg`} // Place your 3 black-and-white images in public/assets
              alt={`Student ${num}`}
              className="h-80 w-48 object-cover rounded-[100px_100px_0_0] shadow-lg"
            />
          ))}
        </div>

        {/* Right: Accordion Text */}
        <div className="lg:ml-16 w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-6 leading-snug">
            Our Platform Empowers You to <br />
            Spot and Nurture the <br />
            <span className="text-green-500">Right Talent!</span>
          </h2>

          <div className="space-y-4">
            {accordionItems.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => handleClick(index)}
                  className="w-full text-left text-lg font-semibold py-3 px-4 bg-gray-900 hover:bg-gray-800 transition rounded shadow"
                >
                  {item}
                </button>
                {activeIndex === index && (
                  <div className="text-sm text-gray-400 mt-2 px-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae risus sed urna.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
