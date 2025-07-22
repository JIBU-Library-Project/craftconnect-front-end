import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FiCamera, FiTrash2 } from "react-icons/fi";
import { useGetUserProfile, useEditUserProfile } from "../../queries/userQueries";
import { toast } from "react-toastify";

const UserProfileEditPage = () => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const navigate = useNavigate();
  const { data: profileData, isLoading, isError } = useGetUserProfile();
  const editProfileMutation = useEditUserProfile();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (profileData?.user) {
      reset({
        name: profileData.user.name || "",
        location: profileData.user.location || "",
        phone: profileData.user.phone || "",
      });
      setPreviewImage(profileData.user.profilePic || "");
    }
  }, [profileData, reset]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => setPreviewImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setProfileImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setShowRemoveConfirm(false);
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("location", formData.location);
    payload.append("phone", formData.phone);

    if (profileImageFile) {
      payload.append("file", profileImageFile); // Change to "profilePic" if your backend expects it
    }

    try {
      await editProfileMutation.mutateAsync(payload);
      toast.success("Profile updated successfully!");
      navigate("/homeowner/user-profile");
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

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error loading profile data</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Profile</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/user-profile")}
            className="px-4 py-2 text-sm rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="profile-form"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 mb-4">Profile Picture</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border">
                  <FiCamera className="w-8 h-8 text-gray-400" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700">
                <FiCamera className="text-white" />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {previewImage && (
                <button
                  type="button"
                  onClick={() => setShowRemoveConfirm(true)}
                  className="absolute -top-2 -right-2 bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Upload a clear photo (JPG, PNG, GIF, max 5MB)
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-700">Phone Number</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              className={`w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="text-sm text-gray-700">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className={`w-full mt-1 px-3 py-2 border rounded-md focus:ring focus:ring-indigo-200 ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          </div>
        </div>
      </form>

      {/* Remove Confirmation */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl w-80">
            <h3 className="text-lg font-semibold mb-2">Remove Profile Picture?</h3>
            <p className="text-sm text-gray-600 mb-4">Are you sure you want to remove it?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowRemoveConfirm(false)}
                className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveImage}
                className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
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
