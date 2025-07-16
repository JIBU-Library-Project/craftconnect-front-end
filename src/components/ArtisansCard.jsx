import React from "react";
import { Link } from "react-router";
import {
  BadgeCheck,
  ShieldOff,
  Phone,
  MessageCircle,
  MapPin,
  Hammer,
} from "lucide-react";
import RatingStars from "./RatingStars";

const ArtisanCard = ({ artisan }) => {
  if (!artisan) return null;

  const renderVerificationBadge = () => {
    if (artisan.verificationStatus === "verified") {
      return (
        <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-0.5 rounded flex items-center text-xs font-medium">
          <BadgeCheck size={14} className="mr-1" /> Verified
        </div>
      );
    } else {
      return (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-0.5 rounded flex items-center text-xs font-medium">
          <ShieldOff size={14} className="mr-1" /> Not Verified
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="md:flex">
        {/* Profile Picture */}
        <div className="md:w-1/4">
          <div className="h-48 md:h-full bg-gray-100 relative">
            <img
              src={artisan.profilePic || "/profiles/default-artisan.jpg"}
              alt={artisan.name || artisan.businessName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/profiles/default-artisan.jpg";
              }}
            />
            {renderVerificationBadge()}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:w-3/4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {artisan.businessName}
                </h3>

                {/* Location */}
                {artisan.location && (
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <MapPin size={14} className="mr-1 text-blue-500" />
                    {artisan.location}
                  </div>
                )}

                {/* Craft */}
                {artisan.craft && (
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <Hammer size={14} className="mr-1 text-emerald-500" />
                    {artisan.craft}
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center mt-1">
                  <RatingStars rating={artisan.rating} />
                  <span className="text-gray-600 text-sm ml-2">
                    {artisan.rating} ({artisan.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Hourly Rate */}
              {artisan.hourlyRate && (
                <div className="text-right">
                  <p className="text-sm text-gray-500">From</p>
                  <p className="text-base font-medium text-gray-800">
                    GHS {artisan.hourlyRate}/hr
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="mt-3 text-gray-600 text-sm sm:text-base line-clamp-3">
              {artisan.description}
            </p>

            {/* Specialties */}
            <div className="mt-3 flex flex-wrap gap-2">
              {artisan.specialties?.map((specialty, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            {artisan.whatsapp && (
              <a
                href={`https://wa.me/${artisan.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded flex items-center text-sm transition-colors"
              >
                <MessageCircle size={16} className="mr-1" /> WhatsApp
              </a>
            )}
            {artisan.phone && (
              <a
                href={`tel:${artisan.phone}`}
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded flex items-center text-sm transition-colors"
              >
                <Phone size={16} className="mr-1" /> Call Now
              </a>
            )}
            <Link
              to={`/artisan/${artisan.id}`}
              className="border border-neutral-300 text-neutral-700 hover:bg-neutral-100 px-3 py-1.5 rounded text-sm transition-colors"
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanCard
