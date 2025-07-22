import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { 
  useGetPersonalProfile, 
  useUpdateArtisanProfile 
} from "../../queries/artisanQueries";
import { toast } from "react-toastify";

function ArtisanProfileEditPage() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);

  const { data: profileData, isLoading } = useGetPersonalProfile();
  const updateProfileMutation = useUpdateArtisanProfile();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specialties",
  });

  useEffect(() => {
    if (profileData?.artisan) {
      const formattedSpecialties = profileData.artisan.specialties?.map((specialty) => ({
        value: specialty,
      })) || [];

      reset({
        ...profileData.artisan,
        specialties: formattedSpecialties,
      });

      setPreviewImage(profileData.artisan.profilePic || "");
    }
  }, [profileData, reset]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    const payload = new FormData();

    if (profileImageFile) {
      payload.append("file", profileImageFile);
    }

    payload.append("name", data.name);
    payload.append("businessName", data.businessName || "");
    payload.append("craft", data.craft || "");
    payload.append("location", data.location || "");
    payload.append("experience", data.experience || "");
    payload.append("hourlyRate", data.hourlyRate || "");
    payload.append("phone", data.phone || "");
    payload.append("whatsapp", data.whatsapp || "");
    payload.append("description", data.description || "");

    const specialtiesArray = data.specialties?.map((item) => item.value) || [];
    specialtiesArray.forEach((specialty, index) => {
      payload.append(`specialties[${index}]`, specialty);
    });

    try {
      await updateProfileMutation.mutateAsync(payload);
      toast.success("Profile updated successfully!");
      navigate("/artisan/profile");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error(error.response?.data?.error || "Profile update failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/artisan/profile")}
            className="px-4 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="profile-form"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>

      <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Profile Picture</h2>
          <div className="flex items-center">
            <div className="relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <div className="ml-6">
              <p className="text-sm text-gray-500">
                Upload a clear photo of yourself. JPG, PNG or GIF (max. 5MB)
              </p>
            </div>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                {...register("businessName")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Craft/Skill
              </label>
              <input
                type="text"
                {...register("craft")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="text"
                {...register("experience")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hourly Rate (GHS) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("hourlyRate", { required: "Hourly rate is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.hourlyRate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.hourlyRate && <p className="mt-1 text-sm text-red-600">{errors.hourlyRate.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="tel"
                {...register("whatsapp")}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Specialties</h2>
          <div className="space-y-3">
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="text"
                  {...register(`specialties.${index}.value`, {
                    required: "Specialty cannot be empty",
                  })}
                  className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    errors.specialties?.[index]?.value ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="mt-2 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Specialty
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="pb-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">About You</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="5"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "At least 50 characters required",
                },
              })}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Tell clients about yourself and your skills (minimum 50 characters)
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ArtisanProfileEditPage;