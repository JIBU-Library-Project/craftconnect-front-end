import React from "react";
import { Link } from "react-router-dom";

const ArtisanReviewsPage = () => {
  const reviews = [
    {
      id: "rev_014",
      jobId: "job-12",
      rating: 5,
      comment: "Absolutely loved the quality and attention to detail!",
      date: "2025-01-18T10:25:00Z",
      user: {
        id: "user_111",
        name: "Sarah Owusu",
        profilePic: "/profiles/user4.jpg",
      },
    },
    {
      id: "rev_015",
      jobId: "job-13",
      rating: 3,
      comment: "Work was okay, but it took longer than expected.",
      date: "2025-02-07T14:00:00Z",
      user: {
        id: "user_222",
        name: "Michael Boateng",
        profilePic: "/profiles/user5.jpg",
      },
    },
    {
      id: "rev_016",
      jobId: "job-14",
      rating: 2,
      comment: "Communication was poor and delivery was late.",
      date: "2025-03-12T09:15:00Z",
      user: {
        id: "user_333",
        name: "Linda Mensah",
        profilePic: "/profiles/user6.jpg",
      },
    },
    {
      id: "rev_017",
      jobId: "job-15",
      rating: 4,
      comment: "Great work overall, minor issues fixed promptly.",
      date: "2025-04-22T16:40:00Z",
      user: {
        id: "user_444",
        name: "Kweku Amponsah",
        profilePic: "/profiles/user7.jpg",
      },
    },
    {
      id: "rev_018",
      jobId: "job-16",
      rating: 1,
      comment: "Terrible experience, product was damaged on arrival.",
      date: "2025-05-30T12:55:00Z",
      user: {
        id: "user_555",
        name: "Nana Adwoa",
        profilePic: "/profiles/user8.jpg",
      },
    },
    {
      id: "rev_019",
      jobId: "job-17",
      rating: 5,
      comment: "Exceptional service, highly recommend this artisan!",
      date: "2025-06-14T11:35:00Z",
      user: {
        id: "user_666",
        name: "Yaw Sarkodie",
        profilePic: "/profiles/user9.jpg",
      },
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingCounts = [5,4,3,2,1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600 mt-2">Feedback from your clients</p>
        </div>
        <Link
          to="/artisan"
          className="mt-4 md:mt-0 inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
          {/* Average Rating */}
          <div className="flex items-center mb-6 md:mb-0">
            <div className="text-4xl font-bold text-gray-900 mr-4">
              {averageRating.toFixed(1)}
            </div>
            <div>
              <div className="flex mb-1">
                {[1,2,3,4,5].map(star => (
                  <StarIcon 
                    key={star} 
                    filled={star <= Math.round(averageRating)} 
                    className="w-5 h-5" 
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="w-full md:w-2/3">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Rating Breakdown</h3>
            <div className="space-y-2">
              {ratingCounts.map(({star, count, percentage}) => (
                <div key={star} className="flex items-center">
                  <div className="w-8 text-sm font-medium text-gray-600 flex items-center">
                    {star}
                    <StarIcon filled={true} className="w-4 h-4 ml-1 text-yellow-400" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          star >= 4 ? 'bg-green-500' : 
                          star >= 3 ? 'bg-blue-500' : 
                          star >= 2 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{width: `${percentage}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="w-10 text-right text-sm text-gray-500">
                    {count} ({Math.round(percentage)}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition-colors">
          All Reviews
        </button>
       
      </div>

      {/* Reviews List - Single Column */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>

    
    </div>
  );
};

// Star Icon Component
const StarIcon = ({ filled, className }) => (
  <svg
    className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Review Card Component
const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'bg-green-100 text-green-800';
    if (rating >= 3) return 'bg-blue-100 text-blue-800';
    if (rating >= 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="relative mr-4">
              <img
                src={review.user.profilePic}
                alt={review.user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
              />
              <div className={`absolute -bottom-1 -right-1 rounded-full px-2 py-1 text-xs font-medium ${getRatingColor(review.rating)}`}>
                {review.rating}.0
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{review.user.name}</h4>
              <p className="text-xs text-gray-500">{formatDate(review.date)}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </div>

        <div className="flex mb-3">
          {[1,2,3,4,5].map(star => (
            <StarIcon 
              key={star} 
              filled={star <= review.rating} 
              className="w-5 h-5" 
            />
          ))}
        </div>

        <p className="text-gray-700 mb-5">{review.comment}</p>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">Job #{review.jobId}</span>
         
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => (
  <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-12 text-center">
    <div className="mx-auto w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </div>
    <h3 className="text-xl font-medium text-gray-900 mb-2">No Reviews Yet</h3>
    <p className="text-gray-500 mb-6 max-w-md mx-auto">
      Your reviews will appear here once customers rate your services. Complete jobs to get feedback.
    </p>
    <div className="flex justify-center gap-3">
      <Link
        to="/artisan/jobs"
        className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm shadow-sm"
      >
        View Available Jobs
      </Link>
      <Link
        to="/artisan/profile"
        className="inline-flex items-center px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm shadow-sm"
      >
        Edit Profile
      </Link>
    </div>
  </div>
);

export default ArtisanReviewsPage;