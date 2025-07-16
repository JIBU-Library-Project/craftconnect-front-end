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
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-medium text-gray-700">
                  Service {index + 1}
                </h2>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Service Title
                  </label>
                  <input
                    {...register(`services.${index}.service`)}
                    placeholder="e.g. Furniture Assembly"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <textarea
                    {...register(`services.${index}.description`)}
                    placeholder="Brief description"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Price
                    </label>
                    <input
                      {...register(`services.${index}.price`)}
                      placeholder="e.g. GHS 250/hr"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Estimated Time
                    </label>
                    <input
                      {...register(`services.${index}.estimatedTime`)}
                      placeholder="e.g. 1-3 hours"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
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
            className="w-full flex justify-center items-center px-4 py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition text-sm"
          >
            + Add New Service
          </button>
        </div>

        {/* Pricing Notes */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pricing Notes
          </label>
          <textarea
            {...register("pricingNotes")}
            rows={5}
            placeholder={`• Prices are estimates and may vary\n• Materials not included\n• Minimum service fee applies`}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Each new line will be displayed as a separate note on your profile.
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisanAddEditServicesPage;
