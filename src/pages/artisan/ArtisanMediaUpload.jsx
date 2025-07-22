import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetPersonalProfile,
  usePostArtisanPortfolio,
  useUpdateArtisanProfile,
} from "../../queries/artisanQueries";

const ArtisanMediaUpload = () => {
  const navigate = useNavigate();
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [portfolioPreviews, setPortfolioPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const { data: profileData, isLoading } = useGetPersonalProfile();
  const updateProfileMutation = useUpdateArtisanProfile();
  const updatePortfolioMutation = usePostArtisanPortfolio();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const profilePicFile = watch("profilePic");
  const portfolioFiles = watch("portfolio");

  useEffect(() => {
    if (profileData?.artisan) {
      setProfilePicPreview(profileData.artisan.profilePic || "");
      setPortfolioPreviews(profileData.artisan.portfolio || []);
    }
  }, [profileData]);

  useEffect(() => {
    if (profilePicFile && profilePicFile[0]) {
      const file = profilePicFile[0];
      setProfilePicPreview(URL.createObjectURL(file));
    }
  }, [profilePicFile]);

  useEffect(() => {
    if (portfolioFiles && portfolioFiles.length > 0) {
      const previews = Array.from(portfolioFiles).map((file) =>
        URL.createObjectURL(file)
      );
      setPortfolioPreviews((prev) => [...prev, ...previews]);
    }
  }, [portfolioFiles]);

  const removePortfolioImage = (index) => {
    setPortfolioPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);

      // Upload Profile Picture if selected
      if (data.profilePic && data.profilePic.length > 0) {
        const profilePayload = new FormData();
        profilePayload.append("file", data.profilePic[0]);

        const profileRes = await updateProfileMutation.mutateAsync(profilePayload);
        toast.success("Profile picture updated successfully!");
      }

      // Upload Portfolio Images if selected
      if (data.portfolio && data.portfolio.length > 0) {
        const portfolioPayload = new FormData();
        Array.from(data.portfolio).forEach((file) => {
          portfolioPayload.append("files", file);
        });

        const portfolioRes = await updatePortfolioMutation.mutateAsync(portfolioPayload);
        toast.success("Portfolio images uploaded successfully!");
      }

      toast.success("Upload complete!");
      navigate("/artisan/profile");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Upload failed, try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Media Upload</h1>
        <button
          onClick={() => navigate("/artisan/profile")}
          className="text-sm text-indigo-600 hover:underline"
        >
          ← Back to Profile
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Picture */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Profile Picture
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
              {profilePicPreview ? (
                <img
                  src={profilePicPreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload New Profile Picture
              </label>
              <input
                type="file"
                {...register("profilePic")}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-indigo-50 file:text-indigo-700
                  hover:file:bg-indigo-100"
              />
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Portfolio Images
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {portfolioPreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Portfolio ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePortfolioImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add More Portfolio Images
            </label>
            <input
              type="file"
              {...register("portfolio")}
              accept="image/*"
              multiple
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate("/artisan/profile")}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 rounded-lg transition-all text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUploading}
            className="px-6 py-2.5 bg-indigo-700 text-white rounded-lg hover:bg-indigo-600 transition-all text-sm flex items-center gap-2 disabled:opacity-70"
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                Uploading...
              </>
            ) : (
              <>
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisanMediaUpload;
