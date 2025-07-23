import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { idTypes } from "../../data/verificationRequirement";
import { useVerifyRequest } from "../../queries/artisanQueries";
import { toast } from "react-toastify";
import { verificationRequirements } from "../../data/verificationRequirement";

function ArtisanVerificationPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [frontIdPreview, setFrontIdPreview] = useState(null);
  const [backIdPreview, setBackIdPreview] = useState(null);
  const [addressProofPreview, setAddressProofPreview] = useState(null);
  const [businessRegPreview, setBusinessRegPreview] = useState(null);
  const [additionalDocs, setAdditionalDocs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Store the actual File objects
  const [frontIdFile, setFrontIdFile] = useState(null);
  const [backIdFile, setBackIdFile] = useState(null);
  const [addressProofFile, setAddressProofFile] = useState(null);
  const [businessRegFile, setBusinessRegFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);

  const handleFileChange = (e, setPreview, setFile) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file); // Store the File object

      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalDocChange = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newDocs = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        type: file.type.split("/")[1] || "document",
      }));
      setAdditionalDocs([...additionalDocs, ...newDocs]);
      setAdditionalFiles([...additionalFiles, ...files]);
    }
  };

  const removeAdditionalDoc = (index) => {
    const newDocs = [...additionalDocs];
    URL.revokeObjectURL(newDocs[index].preview);
    newDocs.splice(index, 1);
    setAdditionalDocs(newDocs);

    const newFiles = [...additionalFiles];
    newFiles.splice(index, 1);
    setAdditionalFiles(newFiles);
  };

  const requestVerification = useVerifyRequest();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Create FormData payload
      const formData = new FormData();

      // Append all required fields
      formData.append("idType", data.idType);
      formData.append("idNumber", data.idNumber);

      // Append required files
      if (frontIdFile) formData.append("frontId", frontIdFile);
      if (backIdFile) formData.append("backId", backIdFile);
      if (addressProofFile) formData.append("addressProof", addressProofFile);
      if (businessRegFile) formData.append("businessReg", businessRegFile);

      // Append additional files with proper naming
      additionalFiles.forEach((file, index) => {
        formData.append(`additionalDocs[${index}]`, file);
      });

      // Submit the form data
      const response = await requestVerification.mutateAsync(formData);

      if (response) {
        toast.success("Verification request submitted successfully!");
        console.log(response);
        navigate("/artisan");
      }
    } catch (error) {
      console.error("Verification submission error:", error);
      toast.error(
        error.response?.data?.error || "Submission failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 ">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Account Verification
        </h1>
        <p className="text-gray-600 mt-2">
          Complete your verification to access all features of CraftConnect
        </p>
      </div>

      {/* Verification Requirements Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Verification Requirements
          </h2>
          <p className="text-gray-600 mb-4">
            To verify your identity as an artisan, please provide the
            following documents:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verificationRequirements.map((req) => (
              <div
                key={req.id}
                className={`border rounded-lg p-4 ${
                  req.required
                    ? "border-indigo-200 bg-indigo-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      req.required
                        ? "bg-indigo-100 text-indigo-600"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {req.required ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">{req.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {req.description}
                    </p>
                    {req.examples && (
                      <p className="text-xs text-gray-500 mt-1">
                        Examples: {req.examples.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verification Form */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* ID Type and Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    ID Type
                  </label>
                  <select
                    {...register("idType", { required: "ID type is required" })}
                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.idType ? "border-red-500" : ""
                    }`}
                  >
                    <option value="">Select ID Type</option>
                    {idTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {errors.idType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.idType.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    ID Number
                  </label>
                  <input
                    type="text"
                    {...register("idNumber", {
                      required: "ID number is required",
                    })}
                    className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.idNumber ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your ID number"
                  />
                  {errors.idNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.idNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* ID Front */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Front of ID
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white">
                    {frontIdPreview ? (
                      <img
                        src={frontIdPreview}
                        alt="Front of ID"
                        className="max-h-64 mx-auto mb-4 rounded-lg"
                      />
                    ) : (
                      <div className="py-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm text-gray-500 mt-2">
                          Upload front of your ID
                        </p>
                      </div>
                    )}
                    <label className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer">
                      <span>{frontIdPreview ? "Change File" : "Select File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, setFrontIdPreview, setFrontIdFile)
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* ID Back */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    Back of ID
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white">
                    {backIdPreview ? (
                      <img
                        src={backIdPreview}
                        alt="Back of ID"
                        className="max-h-64 mx-auto mb-4 rounded-lg"
                      />
                    ) : (
                      <div className="py-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm text-gray-500 mt-2">
                          Upload back of your ID
                        </p>
                      </div>
                    )}
                    <label className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer">
                      <span>{backIdPreview ? "Change File" : "Select File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, setBackIdPreview, setBackIdFile)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Proof of Address */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Proof of Address
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white">
                  {addressProofPreview ? (
                    <img
                      src={addressProofPreview}
                      alt="Proof of Address"
                      className="max-h-64 mx-auto mb-4 rounded-lg"
                    />
                  ) : (
                    <div className="py-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">
                        Upload proof of address document
                      </p>
                    </div>
                  )}
                  <label className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer">
                    <span>
                      {addressProofPreview ? "Change File" : "Select File"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          setAddressProofPreview,
                          setAddressProofFile
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Business Registration */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Business Registration Document
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white">
                  {businessRegPreview ? (
                    <img
                      src={businessRegPreview}
                      alt="Business Registration"
                      className="max-h-64 mx-auto mb-4 rounded-lg"
                    />
                  ) : (
                    <div className="py-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">
                        Upload business registration document
                      </p>
                    </div>
                  )}
                  <label className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer">
                    <span>
                      {businessRegPreview ? "Change File" : "Select File"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(
                          e,
                          setBusinessRegPreview,
                          setBusinessRegFile
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              {/* Additional Documents */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Additional Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
                  <div className="text-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mx-auto text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500 mt-2">
                      Upload any additional supporting documents
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer">
                      <span>Select Files</span>
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleAdditionalDocChange}
                      />
                    </label>
                  </div>

                  {additionalDocs.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Selected Documents:
                      </h4>
                      <div className="space-y-2">
                        {additionalDocs.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center">
                              {doc.type === "pdf" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-red-500 mr-2"
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
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-blue-500 mr-2"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              )}
                              <span className="text-sm text-gray-700 truncate max-w-xs">
                                {doc.name}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAdditionalDoc(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-6 py-3 rounded-lg font-medium ${
                    isSubmitting
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } text-white transition-colors`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
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
                    </span>
                  ) : (
                    "Submit Verification Request"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ArtisanVerificationPage;