import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  ShieldAlert,
  Phone,
  MessageCircle,
  MapPin,
  Hammer,
} from "lucide-react";
import RatingStars from "./RatingStars";
import { useAuth } from "../services/hooks";
import { toast } from "react-toastify";

const ArtisanCard = ({ artisan }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null); // State for lightbox

  if (!artisan || typeof artisan !== "object") {
    console.error("Invalid artisan data:", artisan);
    return null;
  }

  const artisanId = artisan.id || artisan._id;
  const isLoggedIn = Boolean(user);

  const requireLogin = () => {
    if (!isLoggedIn) {
      toast.info("Please sign in to view artisan profile.");
      navigate("/login", { state: { from: window.location.pathname } });
      return false;
    }
    return true;
  };

  const handleWhatsApp = () => {
    if (!requireLogin()) return;
    if (artisan.phone) {
      window.open(`https://wa.me/${artisan.phone}`, "_blank");
    }
  };

  const handlePhoneCall = () => {
    if (!requireLogin()) return;
    if (artisan.phone) {
      window.location.href = `tel:${artisan.phone}`;
    }
  };

  const handleViewProfile = () => {
    if (!requireLogin()) return;
    if (artisanId) {
      navigate(`/artisan/${artisanId}`);
    }
  };

  // Handle image click to open lightbox
  const openLightbox = () => {
    setSelectedImage(profilePic);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const renderVerificationBadge = () => {
    if (!artisan.verificationStatus) return null;

    return (
      <div
        className={`absolute top-2 right-2 text-white px-2 py-1 rounded-full flex items-center text-xs font-medium shadow-sm ${
          artisan.verificationStatus === "Pending"
            ? "bg-[#432dd7]"
            : "bg-[#e1a816]"
        }`}
      >
        {artisan.verificationStatus === "Pending" ? (
          <BadgeCheck size={14} className="mr-1" />
        ) : (
          <ShieldAlert size={14} className="mr-1" />
        )}
        {artisan.verificationStatus === "Pending" ? "Verified" : "Unverified"}
      </div>
    );
  };

  // Safely get values with fallbacks
  const profilePic = artisan.profilePic || "/profiles/default-artisan.jpg";
  const name = artisan.name || artisan.businessName || "Artisan";
  const businessName = artisan.businessName || "Artisan";
  const location = artisan.location || "Location not specified";
  const craft = artisan.craft || "Craft not specified";
  const rating = typeof artisan.rating === "number" ? artisan.rating : 0;
  const reviewCount = artisan.reviewCount || 0;
  const hourlyRate = artisan.hourlyRate || "N/A";
  const description = artisan.description || "No description available";
  const specialties = Array.isArray(artisan.specialties)
    ? artisan.specialties
    : [];
  const phone = artisan.phone || "";
  const whatsapp = artisan.whatsapp || phone;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 mb-4">
      <div className="md:flex">
        {/* Profile Picture Section */}
        <div className="md:w-1/4 relative">
          <div className="h-48 md:h-full bg-gray-100 relative">
            <img
              src={profilePic}
              alt={name}
              className="w-full h-full object-cover cursor-pointer"
              onClick={openLightbox}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/profiles/default-artisan.jpg";
              }}
            />
            {renderVerificationBadge()}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 md:w-3/4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {businessName}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin size={14} className="mr-1 text-blue-500" />
                  {location}
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <Hammer size={14} className="mr-1 text-emerald-500" />
                  {craft}
                </div>
                <div className="flex items-center mt-1">
                  <RatingStars rating={rating} />
                  <span className="text-gray-600 text-sm ml-2">
                    {rating.toFixed(1)} ({reviewCount} reviews)
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">From</p>
                <p className="text-base font-medium text-gray-800">
                  GHS {hourlyRate}/hr
                </p>
              </div>
            </div>
            <p className="mt-3 text-gray-600 text-sm sm:text-base line-clamp-3">
              {description}
            </p>
            {specialties.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {specialties.slice(0, 3).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Action Buttons */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded flex items-center text-sm transition-colors"
              disabled={!whatsapp}
            >
              <MessageCircle size={16} className="mr-1" /> WhatsApp
            </button>
            <button
              onClick={handlePhoneCall}
              className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded flex items-center text-sm transition-colors"
              disabled={!phone}
            >
              <Phone size={16} className="mr-1" /> Call Now
            </button>
            <button
              onClick={handleViewProfile}
              className="border border-neutral-300 hover:bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded text-sm transition-colors"
            >
              View Profile
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full view profile picture"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/profiles/default-artisan.jpg";
              }}
            />
            <button
              onClick={closeLightbox}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtisanCard;