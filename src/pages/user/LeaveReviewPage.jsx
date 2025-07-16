import React from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { userJobs } from "../../data/dummyData";

const LeaveReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const job = userJobs.find((job) => job.id === id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!job) {
    return <div className="p-6 text-center text-gray-500">Job not found.</div>;
  }

  const onSubmit = (data) => {
    console.log("Review submitted:", data);
    alert("Review submitted successfully!");
    navigate(`hom/my-jobs/${id}`);
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
              min: 1,
              max: 5,
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., 5"
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
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default LeaveReviewPage;
