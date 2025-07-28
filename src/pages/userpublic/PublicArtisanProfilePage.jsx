import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import RatingStars from "../../components/RatingStars";
import { BadgeCheck, Loader2, MapPin, ToolCase, Wallet } from "lucide-react";
import { useGetSingleArtisan } from "../../queries/artisanQueries";
import { usePostJobs } from "../../queries/jobQueries";
import { usePostReviews } from "../../queries/reviewsQueries";
import { toast } from "react-toastify";

const PublicArtisanProfilePage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [isJobRequestModalOpen, setIsJobRequestModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // State for lightbox
  const { data, isLoading, error } = useGetSingleArtisan(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const postReviewMutation = usePostReviews();
  const artisan = data?.artisan;

  // Calculate rating distribution with proper null checks
  const ratingDistribution = {
    5: artisan?.reviews?.length
      ? (artisan.reviews.filter((r) => r.rating === 5).length /
          artisan.reviews.length) *
        100
      : 0,
    4: artisan?.reviews?.length
      ? (artisan.reviews.filter((r) => r.rating === 4).length /
          artisan.reviews.length) *
        100
      : 0,
    3: artisan?.reviews?.length
      ? (artisan.reviews.filter((r) => r.rating === 3).length /
          artisan.reviews.length) *
        100
      : 0,
    2: artisan?.reviews?.length
      ? (artisan.reviews.filter((r) => r.rating === 2).length /
          artisan.reviews.length) *
        100
      : 0,
    1: artisan?.reviews?.length
      ? (artisan.reviews.filter((r) => r.rating === 1).length /
          artisan.reviews.length) *
        100
      : 0,
  };

  const onSubmit = async (data) => {
    try {
      const reviewData = {
        artisanId: id,
        rating: rating,
        comment: data.comment,
      };
      await postReviewMutation.mutateAsync(reviewData);
      console.log("Review submitted successfully!");
      reset();
      setRating(0);
      setHover(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const getRatingLabel = (rating) => {
    if (rating === 5) return "Excellent";
    if (rating === 4) return "Good";
    if (rating === 3) return "Fair";
    if (rating === 2) return "Poor";
    return "Bad";
  };

  // Handle image click to open lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-center text-red-500">
          Error loading artisan profile: {error.message}
        </p>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-center text-gray-500">Artisan not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Gradient Header */}
      <div className="loginpage bg-gradient-to-r from-neutral-800 to-neutral-700 text-white py-8 md:py-12">
        <div className="container mx-auto pt-7 px-4 md:px-6 min-h-60">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={artisan.profilePic || "/profiles/default-artisan.jpg"}
                alt={artisan.name || artisan.businessName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/profiles/default-artisan.jpg";
                }}
              />
            </div>
            <div className="text-center md:text-left flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-center md:text-left">
                  {artisan.businessName}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-end gap-2">
                  <div className="flex items-center">
                    <RatingStars rating={artisan.rating || 0} size="md" />
                    <span className="ml-2 text-sm md:text-base text-gray-200">
                      {(artisan.rating || 0).toFixed(1)} (
                      {artisan.reviewCount || 0} reviews)
                    </span>
                  </div>
                  <span className="hidden md:inline text-gray-300">•</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                      artisan.verificationStatus === "Pending"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <i className="fas fa-badge-check mr-1"></i>
                    {artisan.verificationStatus === "Pending"
                      ? "Verified"
                      : "Not Verified"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-5 text-sm md:text-base mt-3">
                <div className="flex items-center text-gray-200">
                  <MapPin className="w-4 h-4 mr-1.5 md:mr-2" />
                  <span>{artisan.location || "Location not specified"}</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <ToolCase className="w-4 h-4 mr-1.5 md:mr-2" />
                  <span>{artisan.experience || "0"} years experience</span>
                </div>
                <div className="flex items-center text-gray-200">
                  <Wallet className="w-4 h-4 mr-1.5 md:mr-2" />
                  <span> GHS {artisan.hourlyRate || "0"}/hr</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 pt-2">
                <button
                  onClick={() => setIsJobRequestModalOpen(true)}
                  className="bg-neutral-100 hover:bg-neutral-200 hover:cursor-pointer  text-neutral-800 px-3 py-1.5 rounded-md flex items-center text-sm md:text-base font-medium transition-colors"
                >
                  <i className="fas fa-briefcase mr-1.5"></i> Request Service
                </button>
                {artisan.phone ? (
                  <a
                    href={`https://wa.me/${artisan.phone.replace(
                      /^\\+/,
                      ""
                    )}?text=${encodeURIComponent(
                      `Hello! I'm interested in your services as a ${
                        artisan.craft ?? "professional"
                      }. I found your profile and would like to inquire about your work. Could you please provide more details about your services and availability? Thank you!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 hover:cursor-pointer  text-white px-3 py-1.5 rounded-md flex items-center text-sm md:text-base font-medium transition-colors"
                  >
                    <i className="fab fa-whatsapp mr-1.5"></i> WhatsApp
                  </a>
                ) : (
                  <p className="text-sm text-red-500 mt-2">
                    Phone number not available for WhatsApp contact.
                  </p>
                )}
                <a
                  href={`tel:${artisan.whatsapp || artisan.phone}`}
                  className="bg-neutral-900 border-[#686868] border hover:bg-neutral-800 hover:cursor-pointer text-white px-3 py-1.5 rounded-md flex items-center text-sm md:text-base font-medium transition-colors"
                >
                  <i className="fas fa-phone mr-1.5"></i> Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex overflow-x-auto no-scrollbar">
              {["overview", "portfolio", "reviews", "pricing"].map((tab) => (
                <button
                  key={tab}
                  className={`px-5 py-4 font-medium text-sm md:text-base whitespace-nowrap relative ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "reviews"
                    ? `Reviews (${artisan.reviewCount || 0})`
                    : tab === "overview"
                    ? "Overview"
                    : tab === "portfolio"
                    ? "Portfolio"
                    : "Services & Pricing"}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-5 md:p-7">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-neutral-800">
                    About {artisan.name || artisan.businessName}
                  </h2>
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                    {artisan.description || "No description available"}
                  </p>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-neutral-800">
                    My Specialities
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {(artisan.specialties || []).map((service, index) => (
                      <div
                        key={index}
                        className="border border-neutral-200 rounded-lg p-3 md:p-4 hover:shadow transition-all bg-white flex items-start gap-3"
                      >
                        <BadgeCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-neutral-800 text-sm md:text-base">
                            {service}
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "portfolio" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Projects
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {(artisan.portfolio || []).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => openLightbox(image)}
                    >
                      <img
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/profiles/default-project.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button className="text-blue-600 font-medium hover:text-blue-800">
                    View Full Portfolio ({(artisan.portfolio || []).length}{" "}
                    Photos)
                  </button>
                </div>
              </div>
            )}

            {/* Lightbox Modal */}
            {/* {selectedImage && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                <div className="relative max-w-4xl w-full">
                  <img
                    src={selectedImage}
                    alt="Full view"
                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/profiles/default-project.jpg";
                    }}
                  />
                  <button
                    onClick={closeLightbox}
                    className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )} */}

            {selectedImage && (
  <div
    className="fixed inset-0 bg-[#2b2b2b]/90 backdrop-blur-xl bg-opacity-75 flex items-center justify-center z-50 p-4"
    onClick={closeLightbox}
  >
    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
      <img
        src={selectedImage}
        alt="Full view"
        className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/profiles/default-project.jpg";
        }}
      />
      <button
        onClick={closeLightbox}
        className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {/* Navigation Arrows */}
      {artisan.portfolio && artisan.portfolio.length > 1 && (
        <>
          <button
            onClick={() => {
              const currentIndex = artisan.portfolio.indexOf(selectedImage);
              const prevIndex =
                (currentIndex - 1 + artisan.portfolio.length) %
                artisan.portfolio.length;
              setSelectedImage(artisan.portfolio[prevIndex]);
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              const currentIndex = artisan.portfolio.indexOf(selectedImage);
              const nextIndex = (currentIndex + 1) % artisan.portfolio.length;
              setSelectedImage(artisan.portfolio[nextIndex]);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  </div>
)}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-gray-800">
                  Customer Reviews
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-8 bg-gray-50 p-5 rounded-lg">
                  <div className="text-center md:text-left space-y-2">
                    <div className="text-4xl md:text-5xl font-bold text-blue-600">
                      {(artisan.rating || 0).toFixed(1)}
                    </div>
                    <div className="text-amber-400">
                      <RatingStars rating={artisan.rating || 0} size="lg" />
                    </div>
                    <div className="text-gray-500 text-sm">
                      {artisan.reviewCount || 0} reviews
                    </div>
                  </div>
                  <div className="flex-grow w-full space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="w-12 text-right text-sm text-gray-500">
                          {rating} star{rating !== 1 ? "s" : ""}
                        </span>
                        <div className="flex-grow bg-gray-200 h-2 rounded-full">
                          <div
                            className="bg-amber-400 h-2 rounded-full"
                            style={{
                              width: `${ratingDistribution[rating] || 0}%`,
                            }}
                          ></div>
                        </div>
                        <span className="w-10 text-sm text-gray-500">
                          {Math.round(ratingDistribution[rating] || 0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Write a Review
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Rating <span className="text-red-500">*</span>
                      </label>
                      <div className="flex text-2xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            className={`${
                              star <= (hover || rating)
                                ? "text-amber-400"
                                : "text-gray-300"
                            } mx-1`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(rating)}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                      {rating === 0 && (
                        <p className="text-red-500 text-xs mt-1">
                          Please select a rating
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Review <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...register("comment", {
                          required: "Review is required",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                        placeholder="Share your experience..."
                      />
                      {errors.comment && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.comment.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting || rating === 0}
                      className={`px-4 py-2 rounded-lg font-medium ${
                        isSubmitting || rating === 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                    {isSubmitSuccessful && (
                      <p className="text-green-600 text-sm">
                        Review submitted successfully!
                      </p>
                    )}
                  </form>
                </div>
                <div className="space-y-6">
                  {(artisan.reviews || []).map((review) => {
                    const ratingLabel = getRatingLabel(review.rating);
                    const labelColor = {
                      Excellent: "bg-green-100 text-green-800",
                      Good: "bg-blue-100 text-blue-800",
                      Fair: "bg-yellow-100 text-yellow-800",
                      Poor: "bg-orange-100 text-orange-800",
                      Bad: "bg-red-100 text-red-800",
                    }[ratingLabel];

                    return (
                      <div
                        key={review.id || review._id}
                        className="border-b border-gray-100 pb-6 last:border-0"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div className="flex items-center mb-2 sm:mb-0">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                              <img
                                src={
                                  review.user?.profilePic ||
                                  "/profiles/default-user.jpg"
                                }
                                alt={review.user?.name || "Anonymous"}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/profiles/default-user.jpg";
                                }}
                              />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {review.user?.name || "Anonymous"}
                              </h3>
                              <div className="flex items-center mt-1">
                                <RatingStars rating={review.rating} size="sm" />
                                <span
                                  className={`ml-2 text-xs px-2 py-1 rounded-full ${labelColor}`}
                                >
                                  {ratingLabel}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(review.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="pl-0 sm:pl-13">
                          <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "pricing" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Services & Pricing
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(artisan.services || []).map((service, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl shadow border border-gray-200 p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
                    >
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {service.service}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100 text-sm text-gray-700">
                        <div>
                          <span className="block font-medium">Price</span>
                          <span>{service.price || "N/A"}</span>
                        </div>
                        <div>
                          <span className="block font-medium">
                            Estimated Time
                          </span>
                          <span>{service.estimatedTime || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {artisan.pricingNotes && (
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Pricing Notes
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line text-sm">
                      {artisan.pricingNotes}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="text-right mt-6">
              <button className="text-red-600 hover:text-red-800 text-sm flex items-center">
                <i className="fas fa-flag mr-2"></i>Report Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <JobRequestModal
        isOpen={isJobRequestModalOpen}
        onClose={() => setIsJobRequestModalOpen(false)}
        artisan={artisan}
      />
    </div>
  );
};

// JobRequestModal remains unchanged
const JobRequestModal = ({ isOpen, onClose, artisan }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [previewImages, setPreviewImages] = useState([]);
  const images = watch("images");
  const postJobMutation = usePostJobs();

  useEffect(() => {
    if (images && images.length > 0) {
      const imageArray = Array.from(images).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setPreviewImages(imageArray);
    } else {
      setPreviewImages([]);
    }
  }, [images]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setPreviewImages([]);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    return () => {
      previewImages.forEach((item) => {
        URL.revokeObjectURL(item.preview);
      });
    };
  }, [previewImages]);

  const removeImage = (index) => {
    const newFiles = Array.from(images);
    newFiles.splice(index, 1);
    const dataTransfer = new DataTransfer();
    newFiles.forEach((file) => dataTransfer.items.add(file));
    setValue("images", dataTransfer.files, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("budget", data.budget);
      formData.append("scheduledAt", data.scheduledAt);
      formData.append("location", data.location);
      formData.append("artisanId", artisan._id);
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file, index) => {
          formData.append("images", file);
        });
      }
      await postJobMutation.mutateAsync(formData);
      console.log("Job request submitted successfully!");
      toast.success("Job Requested Successfully");
      onClose();
      reset();
      setPreviewImages([]);
    } catch (error) {
      console.error("Error submitting job request:", error);
      toast.error(error.response?.data?.error || "Job request failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-sm w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg md:text-xl font-semibold  text-gray-800">
              Request Service from {artisan.businessName || "Artisan"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 "
              disabled={isSubmitting || postJobMutation.isPending}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: "Job title is required" })}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., Fix leaking pipe in kitchen"
                disabled={isSubmitting || postJobMutation.isPending}
              />
              {errors.title && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Describe the job in detail..."
                disabled={isSubmitting || postJobMutation.isPending}
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">
                  GHS
                </span>
                <input
                  {...register("budget", {
                    required: "Budget is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter a valid number",
                    },
                    min: {
                      value: 1,
                      message: "Budget must be greater than 0",
                    },
                  })}
                  type="number"
                  className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="e.g., 250"
                  disabled={isSubmitting || postJobMutation.isPending}
                />
              </div>
              {errors.budget && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.budget.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                {...register("scheduledAt", {
                  required: "Date and time are required",
                  validate: (value) => {
                    const selectedDate = new Date(value);
                    const now = new Date();
                    return (
                      selectedDate > now ||
                      "Please select a future date and time"
                    );
                  },
                })}
                type="datetime-local"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={isSubmitting || postJobMutation.isPending}
              />
              {errors.scheduledAt && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.scheduledAt.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                {...register("location", { required: "Location is required" })}
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="e.g., East Legon, Accra"
                disabled={isSubmitting || postJobMutation.isPending}
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <label
                className={`flex flex-col items-center justify-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg transition ${
                  isSubmitting || postJobMutation.isPending
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:border-blue-400"
                }`}
              >
                <span className="text-sm text-gray-600">
                  Click to upload or drag & drop
                </span>
                <span className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </span>
                <input
                  {...register("images", {
                    required: "At least one image is required",
                    validate: (files) => {
                      if (!files || files.length === 0) {
                        return "At least one image is required";
                      }
                      const maxSize = 10 * 1024 * 1024;
                      for (let file of files) {
                        if (file.size > maxSize) {
                          return `File ${file.name} is too large. Maximum size is 10MB.`;
                        }
                      }
                      return true;
                    },
                  })}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  disabled={isSubmitting || postJobMutation.isPending}
                />
              </label>
              {errors.images && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.images.message}
                </p>
              )}
              {previewImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {previewImages.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={item.preview}
                        alt={`Preview ${idx}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                        title="Remove"
                        disabled={isSubmitting || postJobMutation.isPending}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                disabled={isSubmitting || postJobMutation.isPending}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || postJobMutation.isPending}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                  isSubmitting || postJobMutation.isPending
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isSubmitting || postJobMutation.isPending ? (
                  <div className="flex items-center">
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
                    Submitting...
                  </div>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PublicArtisanProfilePage;