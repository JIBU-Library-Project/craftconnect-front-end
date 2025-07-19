import React, { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Import your images (ensure all paths are correct)
import bg1 from "../../assets/img7.jpg";
import bg2 from "../../assets/img2.jpg";
import bg3 from "../../assets/img3.jpg.png"; 
import bg4 from "../../assets/img4.jpg";
import bg5 from "../../assets/img5.jpg";
import bg6 from "../../assets/img6.png";
import bg8 from "../../assets/img8.jpg";

const HeroSlider = () => {
  const navigate = useNavigate();
  
  const slides = [
    {
      bg: bg1,
      subtitle: "Find skilled professionals for all your home needs",
      bold: "QUALITY",
      highlight: "HOME",
      strong: "SERVICES",
    },
    {
      bg: bg2,
      subtitle: "Verified and background-checked artisans",
      bold: "TRUSTED",
      highlight: "LOCAL",
      strong: "PROFESSIONALS",
    },
    {
      bg: bg5,
      subtitle: "Book with confidence - satisfaction guaranteed",
      bold: "RELIABLE",
      highlight: "CRAFT",
      strong: "CONNECTIONS",
    },
    {
      bg: bg8,
      subtitle: "From plumbing to tailoring, we've got you covered",
      bold: "COMPLETE",
      highlight: "HOME",
      strong: "SOLUTIONS",
    },
    {
      bg: bg3,
      subtitle: "Discover talented designers ready to transform your style",
      bold: "ELEGANT",
      highlight: "FASHION",
      strong: "DESIGNS",
    },
    {
      bg: bg6,
      subtitle: "Expert carpenters for your bespoke furniture and fittings",
      bold: "SKILLED",
      highlight: "CARPENTRY",
      strong: "WORKS",
    },
    {
      bg: bg4,
      subtitle: "Book professional makeup artists for every occasion",
      bold: "GLAMOROUS",
      highlight: "MAKEUP",
      strong: "ARTISTS",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]); // Changed dependency to current for safer cleanup

  const slide = slides[current];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    }),
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${slide.bg})`,
            backgroundPosition: "center center"
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30"></div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-6">
            <div className="max-w-2xl">
              <motion.p
                className="mb-4 text-lg md:text-xl text-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {slide.subtitle}
              </motion.p>

              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <span className="text-white">{slide.bold} </span>
                <span className="text-indigo-400">{slide.highlight} </span>
                <span className="text-white">{slide.strong}</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <button
                  onClick={() => navigate("/search")}
                  className="px-6 py-3 md:px-8 md:py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full flex items-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Find Artisans <FaArrowRight />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-indigo-300 text-2xl md:text-3xl z-20 bg-gray-900/50 p-2 md:p-3 rounded-full transition-all duration-300 hover:bg-gray-900/80"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-indigo-300 text-2xl md:text-3xl z-20 bg-gray-900/50 p-2 md:p-3 rounded-full transition-all duration-300 hover:bg-gray-900/80"
      >
        <FaArrowRight />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-indigo-400 w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;