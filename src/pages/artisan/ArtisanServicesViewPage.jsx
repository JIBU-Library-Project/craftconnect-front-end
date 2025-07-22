import React from "react";
import { useNavigate } from "react-router";
import { useGetPersonalProfile } from "../../queries/artisanQueries";
import { Loader2, Edit3, Clock, Plus, Info } from "lucide-react";

const ArtisanServicesViewPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetPersonalProfile();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-center text-indigo-500">Error loading services.</p>
      </div>
    );
  }

  if (!data || !data.artisan) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-center text-gray-500">No services data found.</p>
      </div>
    );
  }

  const { services = [], pricingNotes } = data.artisan;

  const pricingNotesArray =
    typeof pricingNotes === "string"
      ? pricingNotes.split("\n").filter((line) => line.trim() !== "")
      : Array.isArray(pricingNotes)
      ? pricingNotes
      : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Your Service Portfolio
          </h1>
          <p className="text-gray-600 mt-2">
            Showcase your skills with beautiful service cards
          </p>
        </div>
        <button
          onClick={() => navigate("/artisan/services-edit")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-sm hover:shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        {services && services.length > 0 ? (
          services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {service.service || "New Service"}
                  </h2>
                  {service.category && (
                    <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                      {service.category}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => navigate("/artisan/services-edit")}
                  className="text-gray-400 hover:text-indigo-600 p-1.5 rounded-full hover:bg-indigo-50 transition-colors"
                  aria-label="Edit service"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
              
              {service.description && (
                <p className="text-gray-600 mb-5 whitespace-pre-line">
                  {service.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-3 mt-6">
                {service.price && (
                  <div className="flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50/80 text-indigo-700 rounded-lg text-sm font-medium transition-all hover:bg-indigo-100">
                    <span className="text-indigo-700">₵</span>
                    <span>{service.price}</span>
                  </div>
                )}
                {service.estimatedTime && (
                  <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-all hover:bg-gray-100">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{service.estimatedTime}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-2 bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <div className="mx-auto w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-indigo-600" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your service showcase is empty
            </h3>
            <p className="text-gray-600 mb-5 max-w-md mx-auto">
              Start by adding your first service to attract more clients
            </p>
            <button
              onClick={() => navigate("/artisan/services-edit")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-medium hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Create Your First Service
            </button>
          </div>
        )}
      </div>

      {/* Pricing Notes */}
      <div className="bg-indigo-50/30 border border-indigo-100 rounded-xl p-6 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-white rounded-lg shadow-xs border border-indigo-100">
            <Info className="w-5 h-5 text-indigo-600" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Pricing Information
          </h2>
        </div>
        
        {pricingNotesArray.length > 0 ? (
          <div className="space-y-3 text-gray-700">
            {pricingNotesArray.map((note, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="flex-shrink-0 mt-1.5">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                </div>
                <p className="whitespace-pre-line text-gray-700">{note}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white/70 rounded-lg p-4 border border-indigo-100">
            <p className="text-gray-500 text-center">
              Add pricing notes to help clients understand your rates
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanServicesViewPage;