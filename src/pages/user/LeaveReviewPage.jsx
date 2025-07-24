import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { userJobs } from "../../data/dummyData";
import { usePostReviews } from "../../queries/reviewsQueries";

const LeaveReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = userJobs.find((job) => job.id === id);
  const postReviewMutation = usePostReviews();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!job) {
    return <div className="p-6 text-center text-gray-500">Job not found.</div>;
  }

  const onSubmit = async (data) => {
    try {
      // Prepare the review data according to your API structure
      const reviewData = {
        jobId: id,
        artisanId: job.artisanId, // Assuming job has artisanId
        rating: parseInt(data.rating),
        comment: data.comment,
        // Add any other required fields for your API
      };

      await postReviewMutation.mutateAsync(reviewData);

      alert("Review submitted successfully!");
      navigate(`/home/my-jobs/${id}`);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold mb-4">
        Leave a Review for {job.title}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Rating (1-5)</label>
          <input
            type="number"
            {...register("rating", {
              required: "Rating is required",
              min: { value: 1, message: "Rating must be at least 1" },
              max: { value: 5, message: "Rating must be at most 5" },
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., 5"
            disabled={postReviewMutation.isLoading}
          />
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Comment</label>
          <textarea
            {...register("comment", { required: "Comment is required" })}
            className="w-full border rounded px-3 py-2"
            placeholder="Share your experience..."
            rows={4}
            disabled={postReviewMutation.isLoading}
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={postReviewMutation.isLoading}
          className={`w-full py-2 font-medium rounded transition ${
            postReviewMutation.isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {postReviewMutation.isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {postReviewMutation.isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          Error:{" "}
          {postReviewMutation.error?.message || "Failed to submit review"}
        </div>
      )}
    </div>
  );
};

export default LeaveReviewPage;
