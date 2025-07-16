import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import artisanServices from "../../data/dummyData";

const ArtisanAddEditServicesPage = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      services: artisanServices.services,
      pricingNotes: Array.isArray(artisanServices.pricingNotes)
        ? artisanServices.pricingNotes.join("\n")
        : artisanServices.pricingNotes || "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const onSubmit = async (data) => {
    const processedData = {
      ...data,
      pricingNotes: data.pricingNotes
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== ""),
    };

    console.log("✅ Updated Artisan Services Data:", processedData);

    // 🚀 FUTURE API CALL PLACEHOLDER:
    // await axios.post("/api/artisan/services", processedData);
    // or
    // await updateArtisanServices(processedData);

    alert("Services and pricing notes updated successfully!");
    navigate("/artisan/services");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Add / Edit Services
        </h1>
        <button
          onClick={() => navigate("/artisan/services")}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to Services
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Services List */}
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 space-y-5 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-medium text-gray-800 text-lg">
                  Service {index + 1}
                </h2>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-rose-400 hover:text-rose-500 text-sm flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Service Title
                  </label>
                  <input
                    {...register(`services.${index}.service`)}
                    placeholder="e.g. Furniture Assembly"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Description
                  </label>
                  <textarea
                    {...register(`services.${index}.description`)}
                    placeholder="Describe the service in detail"
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      Price/hr (GHS)
                    </label>
                    <div className="relative">
                      <input
                        {...register(`services.${index}.price`)}
                        placeholder="250"
                        className="w-full pl-3 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">
                      Estimated Time
                    </label>
                    <select
                      {...register(`services.${index}.estimatedTime`)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjJjM2Q0IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]"
                    >
                      <option value="">Select duration</option>
                      <option value="1-2 hours">1-2 hours</option>
                      <option value="2-4 hours">2-4 hours</option>
                      <option value="Half day">Half day</option>
                      <option value="Full day">Full day</option>
                      <option value="Multiple days">Multiple days</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                id: uuidv4(),
                service: "",
                description: "",
                price: "",
                estimatedTime: "",
              })
            }
            className="w-full flex justify-center items-center gap-2 px-6 py-3 border-2 border-dashed border-teal-100 text-teal-600 rounded-xl hover:bg-teal-50 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Service
          </button>
        </div>

        {/* Pricing Notes */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pricing Notes
          </label>
          <textarea
            {...register("pricingNotes")}
            rows={4}
            placeholder={`• Prices are estimates and may vary\n• Materials not included\n• Minimum service fee applies`}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-300 focus:border-gray-400 transition-all text-sm"
          />
          <p className="text-xs text-gray-400 mt-2">
            Each new line will be displayed as a bullet point on your profile.
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 rounded-lg transition-all text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-700 text-white rounded-lg hover:bg-teal-600 transition-all text-sm flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Save Services
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisanAddEditServicesPage;
