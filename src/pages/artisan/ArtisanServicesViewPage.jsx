import React from "react";
import { useNavigate } from "react-router";
import { useGetPersonalProfile } from "../../queries/artisanQueries";
import { Loader2 } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800">
            Services & Pricing
          </h1>
          <p className="text-neutral-600 mt-1">
            View your current service offerings and pricing information.
          </p>
        </div>
        <button
          onClick={() => navigate("/artisan/services-edit")}
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-blue-700 transition w-full sm:w-auto"
        >
          Add / Edit Services
        </button>
      </div>

      {/* Services */}
      {services && services.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-neutral-200 rounded-lg p-4 shadow-xl hover:shadow transition"
            >
              <h2 className="text-lg font-semibold text-neutral-800 mb-1">
                {service.service || "Unnamed Service"}
              </h2>
              <p className="text-sm text-neutral-600 mb-2">
                {service.description || "No description available"}
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                {service.price && (
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
                    {service.price}
                  </span>
                )}
                {service.estimatedTime && (
                  <span className="px-2 py-1 bg-green-50 text-green-700 rounded">
                    {service.estimatedTime}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center text-neutral-600 mb-6">
          No services available.
        </div>
      )}

      {/* Pricing Notes */}
      <div className="bg-blue-50 border shadow-2xl border-blue-100 rounded-lg p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          Pricing Notes
        </h2>
        {pricingNotesArray.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-neutral-700 text-sm">
            {pricingNotesArray.map((note, idx) => (
              <li key={idx}>{note}</li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-600 text-sm">No pricing notes provided.</p>
        )}
      </div>
    </div>
  );
};

export default ArtisanServicesViewPage;