import React, { useState, useEffect } from "react";
import { Search, Shield, Star, MapPin, Clock } from "lucide-react";
import SearchBar from "../SearchBar";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      title: "Electrical Work",
      image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg",
      description: "Licensed electricians you can trust",
    },
    {
      title: "Carpentry",
      image:
        "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      description: "Skilled carpenters for custom projects",
    },
    {
      title: "Cleaning Services",
      image:
        "https://i.pinimg.com/1200x/cb/0b/95/cb0b959b930eaae71faaf35eb09623d0.jpg",
      description: "Home and Office Cleaning Experts",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [services.length]);

  return (
    <section className="relative bg-gradient-to-br max-h-screen min-h-screen from-blue-50 via-white to-teal-50 overflow-hidden">
      <div className="container  mx-auto px-4  sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20">
        <div className="flex pt-16 flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center px-3 py-1 md:px-4 md:py-2 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium">
                <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Verified & Trusted Artisans
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Find Artisans
                <span className="block text-indigo-600">Near You</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                Find trusted artisans, request services, track your job, and pay
                on completion.
              </p>
            </div>
            
            <div className="w-full">
              <SearchBar />
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 text-center">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Verified Artisans</div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-xs sm:text-sm text-gray-600">Jobs Completed</div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">4.9</span>
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Service Slider */}
          <div className="w-full lg:w-1/2 relative order-1 lg:order-2">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] rounded-xl lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-2xl">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity transition-transform duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                >
                  <img
                    src={service.image}
                    alt={`${service.title} image for CraftConnect`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Floating Stats - Hidden on small screens */}
            <div className="hidden sm:block absolute -top-4 -left-4 bg-white p-3 sm:p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">
                    Fast Response
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">Within 30 minutes</div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-4 -right-4 bg-white p-3 sm:p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">
                    Verified Artisans
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-600">
                    Quality Work Guaranteed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;