import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  useGetSingleVerification,
  useModifyVerificationRequest,
} from "../../queries/adminQueries";
import { toast } from "react-toastify";

function AdminVerificationDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const verifyMutation = useModifyVerificationRequest();
  const [isVeryfying, setIsVeryfying] = useState(false);
  const [expandedImage, setExpandedImage] = useState(null);

  const { data, isLoading, error } = useGetSingleVerification(id);

  const watchDecision = watch("decision");

  const request = data?.verficationRequest;

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-gray-500">Failed to load verification request.</p>
        <button
          onClick={() => navigate("/admin/verification")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Requests
        </button>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <p className="text-gray-500">Verification request not found.</p>
        <button
          onClick={() => navigate("/admin/verification")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Back to Requests
        </button>
      </div>
    );
  }

  const documents = [
    { type: "id_front", url: request.frontId?.url, name: "Front of ID" },
    { type: "id_back", url: request.backId?.url, name: "Back of ID" },
    {
      type: "address_proof",
      url: request.addressProof?.url,
      name: "Proof of Address",
    },
    {
      type: "business_reg",
      url: request.businessReg?.url,
      name: "Business Registration",
    },
    ...(request.additionalDocs || []).map((doc, index) => ({
      ...doc,
      type: "additional",
      name: doc.name || `Additional Document ${index + 1}`,
    })),
  ].filter((doc) => doc.url);

  const onSubmit = async (payload) => {
    setIsVeryfying(true);

    try {
      await verifyMutation.mutateAsync({ id, payload });
      console.log("Verification action:", data);
      toast.success("verified successfully!");
      navigate("/admin/verification");
    } catch (error) {
      console.error("Artisan verification error:", error);
      toast.error(error.response?.data?.error || "Verification update failed.");
    } finally {
      setIsVeryfying(false);
    }
  };

  const openImage = (url) => setExpandedImage(url);
  const closeImage = () => setExpandedImage(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/admin/verification")}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to requests
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-600">
              Verification Review
            </h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Artisan</h3>
                <p className="text-lg">{request.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Business</h3>
                <p className="text-lg">{request.businessName}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">ID Type</h3>
                <p className="text-lg capitalize">
                  {request.idType ? request.idType.replace("_", " ") : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Submitted</h3>
                <p className="text-lg">
                  {request.submittedAt
                    ? new Date(request.submittedAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Verification Documents
            </h3>
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div
                      className="bg-gray-100 p-4 h-48 flex items-center justify-center cursor-pointer"
                      onClick={() => openImage(doc.url)}
                    >
                      {doc.url.endsWith(".pdf") ? (
                        <div className="text-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-red-500 mx-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-sm text-gray-700 mt-2">
                            PDF Document
                          </span>
                        </div>
                      ) : (
                        <img
                          src={doc.url}
                          alt={doc.name}
                          className="object-contain h-full w-full"
                        />
                      )}
                    </div>
                    <div className="p-3 bg-white border-t border-gray-200">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {doc.type.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No documents available for this verification request.
              </div>
            )}
          </div>

          {expandedImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
              onClick={closeImage}
            >
              <div className="max-w-4xl max-h-full overflow-auto">
                {expandedImage.endsWith(".pdf") ? (
                  <div className="bg-white p-8 rounded-lg">
                    <iframe
                      src={expandedImage}
                      title="PDF Document"
                      className="w-full h-[80vh]"
                    />
                  </div>
                ) : (
                  <img
                    src={expandedImage}
                    alt="Expanded view"
                    className="max-w-full max-h-screen"
                  />
                )}
                <button
                  className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2"
                  onClick={closeImage}
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
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">
                Decision
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                  <input
                    type="radio"
                    value="approve"
                    {...register("action", {
                      required: "Decision is required",
                    })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-700">
                      Approve
                    </span>
                    <span className="block text-sm text-gray-500">
                      Verify this artisan
                    </span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50">
                  <input
                    type="radio"
                    value="reject"
                    {...register("action", {
                      required: "Decision is required",
                    })}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="block text-sm font-medium text-gray-700">
                      Reject
                    </span>
                    <span className="block text-sm text-gray-500">
                      Request more information
                    </span>
                  </div>
                </label>
              </div>
              {errors.decision && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.decision.message}
                </p>
              )}
            </div>

            {watchDecision === "reject" && (
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">
                  Reason for Rejection
                </label>
                <textarea
                  {...register("rejectionReason", {
                    required: "Reason is required when rejecting",
                    minLength: {
                      value: 20,
                      message:
                        "Please provide a detailed reason (min 20 characters)",
                    },
                  })}
                  rows={4}
                  className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    errors.rejectionReason ? "border-red-500" : ""
                  }`}
                  placeholder="Specify why the verification is being rejected and what needs to be corrected..."
                ></textarea>
                {errors.rejectionReason && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rejectionReason.message}
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate("/admin/verification")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isVeryfying}
                className={`px-6 py-3 rounded-lg font-medium ${
                  isVeryfying
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white transition-colors`}
              >
                {isVeryfying ? "Processing..." : "Submit Decision"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminVerificationDetailPage;
