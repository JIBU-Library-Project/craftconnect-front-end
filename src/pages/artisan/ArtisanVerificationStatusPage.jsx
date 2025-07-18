import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { artisanVerificationStatus } from "../../data/dummyData";

// Mock data matching backend structure
const mockVerificationData = artisanVerificationStatus;

function ArtisanVerificationStatusPage() {
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDoc, setExpandedDoc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerificationStatus = async () => {
      try {
        // const response = await fetch('/api/verification/status');
        // const data = await response.json();
        setVerificationData(mockVerificationData);
      } catch (error) {
        console.error("Failed to fetch verification status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerificationStatus();
  }, []);

  const statusConfig = {
    pending: {
      title: "Verification Pending",
      description:
        "Your documents are under review. This usually takes 1-3 business days.",
      icon: "⏳",
      color: "bg-yellow-100 text-yellow-800",
    },
    verified: {
      title: "Verified Successfully!",
      description:
        "Your account is now fully verified. Users can now verify your authenticity.",
      icon: "✅",
      color: "bg-green-100 text-green-800",
      action: {
        text: "Go to Dashboard",
        handler: () => navigate("/artisan"),
      },
    },
    rejected: {
      title: "Verification Rejected",
      description:
        "We found issues with your submission. Please review the reason below.",
      icon: "❌",
      color: "bg-red-100 text-red-800",
    },
  };

  const documentTypes = {
    id_front: "Front of ID",
    id_back: "Back of ID",
    address_proof: "Proof of Address",
    business_reg: "Business Registration",
  };

  const openDocument = (doc) => setExpandedDoc(doc);
  const closeDocument = () => setExpandedDoc(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!verificationData) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 text-center">
        <h2 className="text-lg font-semibold text-neutral-800 mb-3">
          Verification Status Unavailable
        </h2>
        <p className="text-neutral-600 mb-5">
          We couldn't retrieve your verification status. Please try again later.
        </p>
        <button
          onClick={() => navigate("/artisan")}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const status = verificationData.verificationStatus;
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-6">
        Verification Status
      </h1>

      <div className="bg-white rounded-lg shadow-xl border border-neutral-200">
        <div className="p-5 sm:p-6">
          {/* Status Banner */}
          <div className={`flex items-start p-4 rounded ${config.color} mb-6`}>
            <span className="text-xl sm:text-2xl mr-3">{config.icon}</span>
            <div>
              <h2 className="text-lg sm:text-xl font-semibold">
                {config.title}
              </h2>
              <p className="mt-1 text-sm sm:text-base">{config.description}</p>
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="border border-neutral-200 rounded-lg p-4">
              <h3 className="font-medium text-neutral-800 mb-2">
                Submission Details
              </h3>
              <p className="text-sm">
                <span className="text-neutral-600">Request ID:</span>{" "}
                {verificationData.id}
              </p>
              <p className="text-sm mt-1">
                <span className="text-neutral-600">Submitted:</span>{" "}
                {new Date(verificationData.submittedAt).toLocaleString()}
              </p>
              {verificationData.reviewedAt && (
                <p className="text-sm mt-1">
                  <span className="text-neutral-600">Reviewed:</span>{" "}
                  {new Date(verificationData.reviewedAt).toLocaleString()}
                </p>
              )}
            </div>

            {status === "rejected" && (
              <div className="border border-red-200 bg-red-50 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">
                  Rejection Reason
                </h3>
                <p className="text-sm text-red-700">
                  {verificationData.rejectionReason ||
                    "Your submission did not meet our verification requirements."}
                </p>
              </div>
            )}
          </div>

          {/* Documents Section */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-neutral-800 mb-3">
              Submitted Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {verificationData.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow transition cursor-pointer"
                  onClick={() => openDocument(doc)}
                >
                  <div className="bg-neutral-100 flex items-center justify-center h-40">
                    {doc.url.endsWith(".pdf") ? (
                      <div className="text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-red-500 mx-auto"
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
                        <p className="text-xs text-neutral-700 mt-1">
                          PDF Document
                        </p>
                      </div>
                    ) : (
                      <img
                        src={doc.url}
                        alt={documentTypes[doc.type] || doc.type}
                        className="object-contain h-full w-full"
                      />
                    )}
                  </div>
                  <div className="p-3 bg-white border-t border-neutral-200">
                    <p className="text-sm font-medium">
                      {documentTypes[doc.type] || doc.type.replace("_", " ")}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        doc.verified ? "text-green-600" : "text-neutral-500"
                      }`}
                    >
                      {doc.verified ? "Verified" : "Pending Verification"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/artisan")}
              className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 transition"
            >
              Back to Dashboard
            </button>
            {config.action && (
              <button
                onClick={config.action.handler}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                {config.action.text}
              </button>
            )}
            {status === "rejected" && (
              <button
                onClick={() => navigate("/artisan/verification")}
                className="px-5 py-2.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Resubmit Documents
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Document Modal */}
      {expandedDoc && (
        <div
          onClick={closeDocument}
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
        >
          <div className="bg-white rounded-lg max-w-full w-full sm:max-w-2xl max-h-full overflow-auto">
            <div className="flex justify-between items-center p-3 bg-neutral-100 border-b border-neutral-200">
              <h3 className="text-sm font-medium">
                {documentTypes[expandedDoc.type] ||
                  expandedDoc.type.replace("_", " ")}
              </h3>
              <button
                onClick={closeDocument}
                className="text-neutral-600 hover:text-neutral-800"
              >
                ✕
              </button>
            </div>
            <div className="p-3">
              {expandedDoc.url.endsWith(".pdf") ? (
                <iframe
                  src={expandedDoc.url}
                  title="Document Preview"
                  className="w-full h-[70vh] rounded"
                ></iframe>
              ) : (
                <img
                  src={expandedDoc.url}
                  alt="Document Preview"
                  className="w-full max-h-[70vh] object-contain rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtisanVerificationStatusPage;
