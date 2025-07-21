
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { 
  useGetPersonalProfile, 
  useUpdateArtisanProfile 
} from "../../queries/artisanQueries";

function ArtisanProfileEditPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // current profile data
  const { data: profileData, isLoading } = useGetPersonalProfile();
  
  // Mutation for updating profile
  const { mutate: updateProfile } = useUpdateArtisanProfile();

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

  // Reset form with fetched data when profileData is available
  useEffect(() => {
    if (profileData?.artisan) {
      const formattedSpecialties = profileData.artisan.specialties?.map((specialty, index) => ({
        id: index.toString(),
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
      setProfileImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    // Convert specialties back to simple array format
    const specialtiesArray = data.specialties?.map((item) => item.value) || [];

    // payload
    const payload = {
      ...data,
      specialties: specialtiesArray,
      profilePic: profileImage ? previewImage : profileData?.artisan?.profilePic,
    };

    // Call the mutation
    updateProfile(payload, {
      onSuccess: () => {
        navigate("/artisan/profile");
      },
      onError: (error) => {
        console.error("Update failed:", error);
      },
      onSettled: () => {
        setIsSubmitting(false);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
          <p className="text-gray-600 mt-2">
            Update your profile information to attract more clients
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/artisan/profile")}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-2.827 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column - Profile Photo */}
              <div className="md:w-1/3">
                <div className="mb-6">
                  <label className="block text-gray-700 mb-3 font-medium">
                    Profile Photo
                  </label>
                  <div className="relative group w-48 h-48 mx-auto">
                    <div className="rounded-full overflow-hidden border-4 border-white shadow-lg w-full h-full">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <label className="absolute bottom-4 right-2 bg-white text-indigo-600 p-2 rounded-full shadow cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="md:w-2/3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "Full name is required",
                      })}
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Business Name
                    </label>
                    <input
                      type="text"
                      {...register("businessName")}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Craft/Skill
                    </label>
                    <input
                      type="text"
                      {...register("craft")}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Location
                    </label>
                    <input
                      type="text"
                      {...register("location", {
                        required: "Location is required",
                      })}
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.location ? "border-red-500" : ""
                      }`}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      {...register("experience")}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Hourly Rate (GHS)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">GHS</span>
                      </div>
                      <input
                        type="number"
                        {...register("hourlyRate", {
                          required: "Hourly rate is required",
                          min: {
                            value: 1,
                            message: "Rate must be at least GHS 1",
                          },
                        })}
                        className={`pl-12 w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                          errors.hourlyRate ? "border-red-500" : ""
                        }`}
                      />
                      {errors.hourlyRate && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.hourlyRate.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        required: "Phone number is required",
                      })}
                      className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      {...register("whatsapp")}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-gray-700 font-medium">
                      Specialties
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        append({ id: Date.now().toString(), value: "" })
                      }
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Specialty
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {fields.map((item, index) => (
                      <div
                        key={item.id}
                        className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <input
                          type="text"
                          {...register(`specialties.${index}.value`, {
                            required: "Specialty cannot be empty",
                          })}
                          className="bg-transparent outline-none flex-grow"
                        />
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 50,
                        message: "Description should be at least 50 characters",
                      },
                    })}
                    rows="5"
                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.description ? "border-red-500" : ""
                    }`}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ArtisanProfileEditPage;