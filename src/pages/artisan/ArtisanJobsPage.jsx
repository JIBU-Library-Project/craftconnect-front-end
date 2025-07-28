import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Clock, CheckCircle2, Loader, Ban, ThumbsDown } from "lucide-react";
import { artisanJobs } from "../../data/dummyData";

const ArtisanJobsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDeclineChecked, setIsDeclineChecked] = useState(false);
  const [isAcceptChecked, setIsAcceptChecked] = useState(false);
  const [isCompleteChecked, setIsCompleteChecked] = useState(false);
  const { register, handleSubmit, reset, watch } = useForm();

  const currentArtisanId = "art_001";

  useEffect(() => {
    // Filter jobs for the current artisan and deduplicate by job ID
    const artisanJobsData = artisanJobs.filter(
      (job) => job.artisanId === currentArtisanId
    );
    // Deduplicate jobs based on job ID
    const uniqueJobs = Array.from(
      new Map(artisanJobsData.map((job) => [job.id, job])).values()
    );
    setJobs(uniqueJobs);
  }, []);

  const handleDecline = async (data) => {
    if (!selectedJobId) return;

    // Backend integration point: Send decline request to the server
    // Example: await axios.post(`/api/jobs/${selectedJobId}/decline`, { declineReason: data.declineReason });
    // This updates jobStatus to "declined" and sets declineReason in the backend
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === selectedJobId
          ? {
              ...job,
              jobStatus: "declined",
              declineReason: data.declineReason,
            }
          : job
      )
    );
    setShowDeclineModal(false);
    setSelectedJobId(null);
    setIsDeclineChecked(false);
    reset();
  };

  const handleAccept = async () => {
    if (!selectedJobId || !isAcceptChecked) return;

    // Backend integration point: Send accept request to the server
    // Example: await axios.post(`/api/jobs/${selectedJobId}/accept`);
    // This updates jobStatus to "accepted" in the backend
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === selectedJobId
          ? {
              ...job,
              jobStatus: "accepted",
            }
          : job
      )
    );
    setShowAcceptModal(false);
    setSelectedJobId(null);
    setIsAcceptChecked(false);
  };

  const handleComplete = async () => {
    if (!selectedJobId || !isCompleteChecked) return;

    // Backend integration point: Send complete request to the server
    // Example: await axios.post(`/api/jobs/${selectedJobId}/complete`);
    // This updates jobStatus to "completed" in the backend
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === selectedJobId
          ? {
              ...job,
              jobStatus: "completed",
            }
          : job
      )
    );
    setShowCompleteModal(false);
    setSelectedJobId(null);
    setIsCompleteChecked(false);
  };

  const statusIcons = {
    pending: <Clock size={16} className="inline-block" />,
    active: <Loader size={16} className="inline-block" />,
    completed: <CheckCircle2 size={16} className="inline-block" />,
    cancelled: <Ban size={16} className="inline-block" />,
    declined: <ThumbsDown size={16} className="inline-block" />,
  };

  const tabs = ["pending", "active", "completed", "cancelled", "declined"];

  const getStatusCount = (tab) => {
    return jobs.filter((job) => {
      if (tab === "completed") return job.jobStatus === "completed";
      if (tab === "active") return job.jobStatus === "accepted";
      if (tab === "cancelled") return job.jobStatus === "cancelled";
      if (tab === "declined") return job.jobStatus === "declined";
      return job.jobStatus === "pending";
    }).length;
  };

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "completed") return job.jobStatus === "completed";
    if (activeTab === "active") return job.jobStatus === "accepted";
    if (activeTab === "cancelled") return job.jobStatus === "orcancelled";
    if (activeTab === "declined") return job.jobStatus === "declined";
    return job.jobStatus === "pending";
  });

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    declined: "bg-purple-100 text-purple-800",
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Decline Job Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Decline Job Request
              </h3>
              <button
                onClick={() => {
                  setShowDeclineModal(false);
                  setIsDeclineChecked(false);
                  reset();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            <form onSubmit={handleSubmit(handleDecline)}>
              <div className="mb-4">
                <div className="flex items-start mb-3">
                  <div className="flex items-center h-5">
                    <input
                      id="confirmDecline"
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      checked={isDeclineChecked}
                      onChange={(e) => setIsDeclineChecked(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="confirmDecline"
                      className="font-medium text-gray-700"
                    >
                      I confirm I want to decline this job
                    </label>
                  </div>
                </div>
                <label
                  htmlFor="declineReason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for declining (required)
                </label>
                <textarea
                  id="declineReason"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  placeholder="I need to decline because..."
                  {...register("declineReason", {
                    required: "Reason is required",
                  })}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeclineModal(false);
                    setIsDeclineChecked(false);
                    reset();
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition text-sm sm:text-base"
                  disabled={!isDeclineChecked || !watch("declineReason")}
                >
                  Confirm Decline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accept Job Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Accept Job Request
              </h3>
              <button
                onClick={() => {
                  setShowAcceptModal(false);
                  setIsAcceptChecked(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={isAcceptChecked}
                    onChange={(e) => setIsAcceptChecked(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">
                    I confirm that I can complete this job as requested
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAcceptModal(false);
                  setIsAcceptChecked(false);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition text-sm sm:text-base"
                disabled={!isAcceptChecked}
              >
                Confirm Acceptance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Job Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Mark Job as Completed
              </h3>
              <button
                onClick={() => {
                  setShowCompleteModal(false);
                  setIsCompleteChecked(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            <div className="mb-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="completionConfirmed"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={isCompleteChecked}
                    onChange={(e) => setIsCompleteChecked(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="completionConfirmed"
                    className="font-medium text-gray-700"
                  >
                    I confirm that I have fully completed this job
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowCompleteModal(false);
                  setIsCompleteChecked(false);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleComplete}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition text-sm sm:text-base"
                disabled={!isCompleteChecked}
              >
                Confirm Completion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              My Job Requests
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              {jobs[0]?.artisan?.businessName || "Business Name"} •{" "}
              {jobs[0]?.artisan?.email || "artisan@example.com"}
            </p>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="relative">
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap rounded-lg flex items-center gap-1 ${
                    activeTab === tab
                      ? "bg-indigo-100 text-indigo-700"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span className="sm:hidden">{statusIcons[tab]}</span>
                  <span className="hidden sm:inline capitalize">{tab}</span>
                  <span
                    className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
                      activeTab === tab
                        ? "bg-indigo-200 text-indigo-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {getStatusCount(tab)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
          <div className="max-w-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-400 mb-3 sm:mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-1 sm:mb-2">
              No {activeTab} jobs available
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
              {activeTab === "pending"
                ? "You don't have any pending job requests at the moment."
                : `You don't have any ${activeTab} jobs at the moment.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-5">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-shadow overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 truncate">
                        {job.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[job.jobStatus]
                        }`}
                      >
                        {job.jobStatus.charAt(0).toUpperCase() +
                          job.jobStatus.slice(1)}
                      </span>
                    </div>

                    <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Scheduled: {formatDate(job.scheduledAt)}</span>
                    </div>
                  </div>
                  <div className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap">
                    {job.budget}
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Job Images
                {job.images && job.images.length > 0 && (
                  <div className="mb-4 flex gap-2 overflow-x-auto">
                    {job.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Job image ${index + 1}`}
                        className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )} */}

                {/* Completion Confirmation Status */}
                {job.jobStatus === "completed" && (
                  <div className="mb-4">
                    <div
                      className={`p-2 sm:p-3 rounded-lg text-sm ${
                        job.confirmCompleted
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      <div className="flex items-center">
                        {job.confirmCompleted ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            <span>Client has confirmed job completion</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 mr-2" />
                            <span>
                              Waiting for client to confirm completion
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Customer Information */}
                {job.user && (
                  <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="bg-indigo-100 text-indigo-800 rounded-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-xs sm:text-sm">
                        {job.user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-2 sm:ml-3 min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">
                          {job.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {job.user.location}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs sm:text-sm">
                      <a
                        href={`tel:${job.user.phone}`}
                        className="flex items-center text-blue-600 hover:text-blue-800 truncate"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        {job.user.phone}
                      </a>
                      <a
                        href={`mailto:${job.user.email}`}
                        className="flex items-center text-blue-600 hover:text-blue-800 truncate"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        {job.user.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Cancellation/Decline Reason */}
                {(job.cancellationReason || job.declineReason) && (
                  <div className="mb-4 p-2 sm:p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-xs sm:text-sm">
                    <p className="font-medium text-red-700">
                      {job.jobStatus === "cancelled"
                        ? "Cancellation Reason:"
                        : "Decline Reason:"}
                    </p>
                    <p className="text-red-600">
                      {job.cancellationReason || job.declineReason}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-3 sm:pt-4 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/artisan/jobs/view/${job.id}`)}
                    className="px-2.5 py-1 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Details
                  </button>

                  {job.jobStatus === "pending" && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowDeclineModal(true);
                        }}
                        className="px-2.5 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        Decline Job
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setShowAcceptModal(true);
                        }}
                        className="px-2.5 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        Accept Job
                      </button>
                    </>
                  )}

                  {job.jobStatus === "accepted" && (
                    <button
                      onClick={() => {
                        setSelectedJobId(job.id);
                        setShowCompleteModal(true);
                      }}
                      className="px-2.5 py-1 text-xs sm:text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      Mark as Completed
                    </button>
                  )}

                  {job.jobStatus === "completed" && job.reviewId && (
                    <button
                      onClick={() => navigate(`/artisan/jobs/${job.id}/review`)}
                      className="px-2.5 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      View Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtisanJobsPage;
