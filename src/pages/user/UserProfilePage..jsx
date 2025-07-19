import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiCamera, FiTrash2, FiX } from "react-icons/fi";

const UserProfileEditPage = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  // Sample user data
  const userData = {
    name: "Kwame Asare",
    profilePic: "/profiles/user1.jpg",
    phone: "0244123456",
    location: "Accra, Osu"
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: userData.name,
      phone: userData.phone,
      location: userData.location
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setShowRemoveConfirm(false);
  };

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Profile</h1>
        <Link
          to="/user/profile"
          className="flex items-center gap-1 text-gray-600 hover:text-gray-900 text-sm font-medium"
        >
          <FiX size={18} /> Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Picture */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                <img
                  src={previewImage || userData.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FiCamera className="text-white text-2xl" />
                </div>
              </div>
              
              {previewImage && (
                <button
                  type="button"
                  onClick={() => setShowRemoveConfirm(true)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>

            <div className="flex-1 w-full">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-upload"
              />
              <label
                htmlFor="profile-upload"
                className="block w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors text-center"
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <FiCamera className="text-gray-400 text-xl" />
                  <span className="text-sm font-medium text-gray-700">
                    {previewImage ? "Change photo" : "Upload new photo"}
                  </span>
                  <span className="text-xs text-gray-500">
                    JPG, PNG up to 2MB
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              className={`block w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              {...register("name", { required: "Name is required" })}
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative">
            <input
              id="phone"
              type="tel"
              className={`block w-full px-4 py-3 rounded-lg border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number"
                }
              })}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <div className="relative">
            <input
              id="location"
              type="text"
              className={`block w-full px-4 py-3 rounded-lg border ${
                errors.location ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
              {...register("location", { required: "Location is required" })}
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6">
          <Link
            to="/user/profile"
            className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>

      {/* Remove Image Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Remove Profile Picture?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove your profile picture?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRemoveConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileEditPage;