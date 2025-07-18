// src/pages/ContactPage.jsx

import { useForm } from "react-hook-form";

const ArtisanContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("🚀 Contact payload:", data);

    // ✅ Future: Replace with API call
    // await axios.post('/api/contact', data);

    // For now: simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    reset();
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Contact CraftConnect Support</h1>
        <p className="text-gray-500 mt-2">
          We're here to help you with any questions or issues.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow p-6 md:p-8">
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.subject ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Subject"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={5}
                {...register("message", { required: "Message is required" })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your message..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {isSubmitSuccessful && (
              <div className="text-green-600 font-medium">
                Your message has been sent successfully!
              </div>
            )}
          </form>
        </div>

        {/* Contact Info + FAQs */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4 text-gray-700 text-sm">
              <div>
                <strong>Address:</strong> 123 Independence Ave, Accra, Ghana
              </div>
              <div>
                <strong>Phone:</strong> +233 20 123 4567
              </div>
              <div>
                <strong>Email:</strong> support@craftconnect.com
              </div>
              <div>
                <strong>WhatsApp:</strong> +233 55 987 6543
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <div>
                <strong>How do I report a problem with an artisan?</strong>
                <p>
                  Use the 'Report Profile' button on the artisan's profile page.
                </p>
              </div>
              <div>
                <strong>How long does verification take?</strong>
                <p>
                  Typically 1-2 business days after submitting required
                  documents.
                </p>
              </div>
              <div>
                <strong>Is there a fee for using CraftConnect?</strong>
                <p>
                  No, it's free for homeowners to find artisans. Artisans pay a
                  small commission on completed jobs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanContactPage
