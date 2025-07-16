import { useNavigate } from "react-router";
import { artisanProfile } from "../../data/dummyData";

function ArtisanProfilePage() {
  const navigate = useNavigate();
  const defaultValues = artisanProfile;

  const {
    name,
    businessName,
    description,
    location,
    experience,
    craft,
    specialties,
    hourlyRate,
    phone,
    whatsapp,
    profileImageUrl,
  } = defaultValues;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            Artisan Profile
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1">
            Your professional profile as shown to clients
          </p>
        </div>
        <button
          onClick={() => navigate("/artisan/profile/edit")}
          className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Edit Profile
        </button>
      </div>

      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image & Contact */}
            <div className="md:w-1/3 flex flex-col gap-6">
              <div className="flex justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow">
                  <img
                    src={profileImageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="bg-neutral-50 rounded p-4">
                <h3 className="text-base font-semibold text-neutral-800 mb-2">
                  Specialization
                </h3>
                <p className="text-neutral-700">{craft}</p>
              </div>

              <div className="bg-neutral-50 rounded p-4">
                <h3 className="text-base font-semibold text-neutral-800 mb-2">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-neutral-500">Phone</p>
                    <p className="text-sm text-neutral-800">{phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500">WhatsApp</p>
                    <p className="text-sm text-neutral-800">{whatsapp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="md:w-2/3 flex flex-col gap-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
                  {name}
                </h2>
                <p className="text-lg text-indigo-600 font-medium">
                  {businessName}
                </p>
                <p className="mt-3 text-sm sm:text-base text-neutral-700 whitespace-pre-line">
                  {description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-50 rounded p-4">
                  <h3 className="text-base font-semibold text-neutral-800 mb-2">
                    Location
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-700 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-neutral-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {location}
                  </div>
                </div>

                <div className="bg-neutral-50 rounded p-4">
                  <h3 className="text-base font-semibold text-neutral-800 mb-2">
                    Experience
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-700 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-neutral-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {experience}
                  </div>
                </div>

                <div className="bg-neutral-50 rounded p-4">
                  <h3 className="text-base font-semibold text-neutral-800 mb-2">
                    Hourly Rate
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-700 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-neutral-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    ${hourlyRate}/hr
                  </div>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="text-base font-semibold text-neutral-800 mb-3">
                  Specialties
                </h3>
                <div className="flex flex-wrap gap-2">
                  {specialties.map((specialty, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtisanProfilePage;
