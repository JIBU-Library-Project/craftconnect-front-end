import { useState } from "react";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Your message has been sent successfully!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Contact CraftConnect Support</h1>
      <p className="text-gray-600 mb-8">
        We're here to help you with any questions or issues.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submitMessage && (
              <div className="mt-4 text-green-600">{submitMessage}</div>
            )}
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <i className="fas fa-map-marker-alt text-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">
                  123 Independence Ave, Accra, Ghana
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-phone text-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+233 20 123 4567</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fas fa-envelope text-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">support@craftconnect.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <i className="fab fa-whatsapp text-blue-600 mt-1 mr-3"></i>
              <div>
                <h3 className="font-medium">WhatsApp</h3>
                <p className="text-gray-600">+233 55 987 6543</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">FAQs</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">
                  How do I report a problem with an artisan?
                </h4>
                <p className="text-gray-600 text-sm">
                  Use the 'Report Profile' button on the artisan's profile page.
                </p>
              </div>
              <div>
                <h4 className="font-medium">
                  How long does verification take?
                </h4>
                <p className="text-gray-600 text-sm">
                  Typically 1-2 business days after submitting required
                  documents.
                </p>
              </div>
              <div>
                <h4 className="font-medium">
                  Is there a fee for using CraftConnect?
                </h4>
                <p className="text-gray-600 text-sm">
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

export default ContactPage;
