import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ArtisansCard from "../../components/ArtisansCard";
import { publicArtisanProfiles as artisans } from "../../data/dummyData";
import { Search, Star, CheckCircle } from "lucide-react";

const LOCATIONS = [
  "Greater Accra",
  "Ashanti Region",
  "Western Region",
  "Central Region",
  "Volta Region",
];

const CRAFTS = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Tailor",
  "Mason",
  "Wood Carver",
];

const RATINGS = [5, 4, 3];

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [searchTerm, setSearchTerm] = useState(queryParams.get("q") || "");
  const [locationFilter, setLocationFilter] = useState(
    queryParams.get("location") || ""
  );
  const [craftFilter, setCraftFilter] = useState(
    queryParams.get("craft") || ""
  );
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [filteredArtisans, setFilteredArtisans] = useState([]);

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const handleApplyFilters = () => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    const results = artisans.filter((artisan) => {
      // Search term matching
      const matchesSearch =
        lowerSearch === "" ||
        artisan.businessName.toLowerCase().includes(lowerSearch) ||
        artisan.craft?.toLowerCase().includes(lowerSearch) ||
        (artisan.specialties &&
          artisan.specialties.some((s) =>
            s.toLowerCase().includes(lowerSearch)
          ));

      // Location matching
      const matchesLocation =
        !locationFilter ||
        artisan.location?.toLowerCase().includes(locationFilter.toLowerCase());

      // Craft matching - exact match
      const matchesCraft =
        !craftFilter ||
        artisan.craft?.toLowerCase() === craftFilter.toLowerCase();

      // Verification status
      const matchesVerified =
        !verifiedOnly || artisan.verificationStatus === "verified";

      // Rating matching
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => Math.floor(artisan.rating) >= rating);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCraft &&
        matchesVerified &&
        matchesRating
      );
    });

    setFilteredArtisans(results);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setLocationFilter("");
    setCraftFilter("");
    setSelectedRatings([]);
    setVerifiedOnly(false);
    setFilteredArtisans(artisans);
  };

  useEffect(() => {
    handleApplyFilters();
  }, [searchTerm, locationFilter, craftFilter, selectedRatings, verifiedOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Find Skilled Artisans
        </h1>
        <p className="text-gray-600 max-w-lg">
          Search for trusted professionals in your area
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 sticky top-24 space-y-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>

            {/* Search Term */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Search
              </label>
              <input
                type="text"
                placeholder="Specialty"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Location
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}>
                <option value="">All Locations</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Craft Filter */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Craft
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                value={craftFilter}
                onChange={(e) => setCraftFilter(e.target.value)}>
                <option value="">All Crafts</option>
                {CRAFTS.map((craft) => (
                  <option key={craft} value={craft}>
                    {craft}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-gray-700 mb-1 font-medium">
                Minimum Rating
              </label>
              <div className="space-y-2">
                {RATINGS.map((rating) => (
                  <label
                    key={rating}
                    className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => handleRatingToggle(rating)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="flex items-center space-x-0.5">
                      {[...Array(rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={16}
                          className="text-amber-400 fill-amber-400"
                        />
                      ))}
                      {[...Array(5 - rating)].map((_, idx) => (
                        <Star key={idx} size={16} className="text-gray-300" />
                      ))}
                      <span className="text-gray-700 text-sm ml-1">
                        & above
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Verified Only */}
            <div className="pt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={() => setVerifiedOnly(!verifiedOnly)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700 font-medium flex items-center">
                  Verified Only
                  {verifiedOnly && (
                    <CheckCircle className="ml-1 text-green-500" size={16} />
                  )}
                </span>
              </label>
            </div>

            {/* Filter Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleApplyFilters}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition flex items-center justify-center">
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition">
                Reset All
              </button>
            </div>
          </div>
        </aside>

        {/* Results Section */}
        <main className="lg:w-3/4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {filteredArtisans.length} Artisans Found
            </h3>
            {craftFilter && (
              <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                {craftFilter}
              </span>
            )}
          </div>

          {/* Artisan Results */}
          <div className="space-y-4">
            {filteredArtisans.length > 0 ? (
              filteredArtisans.map((artisan) => (
                <ArtisansCard key={artisan.id} artisan={artisan} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 p-8 text-center space-y-3">
                <Search size={40} className="text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-800">
                  No artisans match your search
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search term
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchPage;
