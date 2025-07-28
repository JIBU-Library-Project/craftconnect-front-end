import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import ArtisansCard from "../../components/ArtisansCard";
import { Search, Star, CheckCircle, Loader2 } from "lucide-react";
import { useGetAllArtisans } from "../../queries/artisanQueries";

const LOCATIONS = [
  "Greater Accra Region",
  "Ashanti Region",
  "Western Region",
  "Central Region",
  "Volta Region",
  "Eastern Region",
  "Northern Region",
  "Upper East Region",
  "Upper West Region",
  "Bono Region",
  "Bono East Region",
  "Ahafo Region",
  "Western North Region",
  "Oti Region",
  "Savannah Region",
  "North East Region",
];

const CRAFTS = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Tailor",
  "Mason",
  "Wood Carver",
  "Welder",
  "Steel Bender",
  "Tiler",
  "POP Designer",
  "Interior Decorator",
  "Hairdresser",
  "Barber",
  "Auto Mechanic",
  "Spray Painter",
  "Aluminum Fabricator",
  "Glass Installer",
  "Shoe Maker",
  "Bead Maker",
  "Blacksmith",
  "Dry Cleaner",
  "Satellite Installer",
  "Phone Repairer",
  "Computer Repairer",
  "CCTV Installer",
  "Fashion Designer",
  "Upholsterer",
  "Wallpaper Installer",
  "Block Moulder",
  "Ceiling Installer",
  "Wig Maker",
  "Tile Cleaner",
  "Goldsmith",
  "Sign Writer",
  "Mechanic Electrician",
  "Motorbike Repairer",
  "Chainsaw Operator",
  "Panel Beater",
  "Ladder Fabricator",
  "Leather Worker",
  "Glass Cutter",
  "Metal Gate Fabricator",
  "DSTV Installer",
  "Event Decorator",
  "Generator Repairer",
  "Laundry Worker",
  "Roofer",
  "Scaffolder",
  "Truck Mechanic",
  "Forklift Operator",
  "Plasterboard Installer",
  "Sound System Installer",
  "DJ",
  "Makeup Artist",
  "Caterer",
  "Pastry Baker",
  "Butcher",
  "Fish Smoker",
  "Basket Weaver",
  "Mat Weaver",
  "Cane Furniture Maker",
  "Grill Fabricator",
  "Water Pump Installer",
  "Car Air Conditioner Repairer",
  "Window Blind Installer",
  "Gate Installer",
  "Fumigation Expert",
  "Refrigeration Technician",
  "Washing Machine Repairer",
  "Electronic Technician",
  "Mobile Money Agent",
  "Printer Repairer",
  "Auto Electrician",
  "Sculptor",
  "Portrait Artist",
  "Bricklayer",
  "Electric Fence Installer",
  "Solar Panel Installer",
  "Borehole Driller",
  "Wallpaper Designer",
  "Curtain Installer",
  "Seamstress",
  "Embroidery Designer",
  "Hat Maker",
  "Signboard Installer",
  "LED Light Installer",
  "Fuel Pump Technician",
  "Septic Tank Cleaner",
  "Tiles Designer",
  "Charcoal Producer",
  "Ice Block Producer",
  "Candle Maker",
  "Soaps & Detergent Maker",
  "Pest Control Technician",
  "Palm Kernel Oil Processor",
  "Shea Butter Processor",
  "Livestock Pen Builder",
  "Greenhouse Builder",
  "Gutter Cleaner",
];

const RATINGS = [5, 4, 3];

const SearchPage = () => {
  const [artisans, setArtisans] = useState([]);
  const { data, isLoading, error } = useGetAllArtisans();

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

  useEffect(() => {
    if (data && data.success && Array.isArray(data.artisans)) {
      console.log("Fetched all Artisan profiles:", data.artisans);

      const normalizedArtisans = data.artisans.map((artisan) => ({
        ...artisan,
        id: artisan._id || artisan.id,
        rating: artisan.rating || 0,
        reviewCount: artisan.reviewCount || 0,
        verificationStatus: artisan.verificationStatus || "unverified",
        hourlyRate: artisan.hourlyRate || "N/A",
        specialties: Array.isArray(artisan.specialties)
          ? artisan.specialties
          : [],
        services: Array.isArray(artisan.services) ? artisan.services : [],
      }));
      setArtisans(normalizedArtisans);
      setFilteredArtisans(normalizedArtisans);
    }
  }, [data]);

  const handleRatingToggle = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  // const handleApplyFilters = () => {
  //   const lowerSearch = searchTerm.trim().toLowerCase();

  //   const results = artisans.filter((artisan) => {
  //     // Safely access all properties with fallbacks
  //     const businessName = (artisan.businessName || "").toLowerCase();
  //     const craft = (artisan.craft || "").toLowerCase();
  //     const specialties = artisan.specialties || [];
  //     const artisanLocation = (artisan.location || "").toLowerCase();
  //     const rating = artisan.rating || 0;
  //     const verificationStatus = artisan.verificationStatus || "";

  //     // Search term matching
  //     const matchesSearch =
  //       lowerSearch === "" ||
  //       businessName.includes(lowerSearch) ||
  //       craft.includes(lowerSearch) ||
  //       specialties.some(s => s.toLowerCase().includes(lowerSearch));

  //     // Location matching
  //     const matchesLocation =
  //       !locationFilter ||
  //       artisanLocation.includes(locationFilter.toLowerCase());

  //     // Craft matching - exact match
  //     const matchesCraft =
  //       !craftFilter ||
  //       craft === craftFilter.toLowerCase();

  //     // Verification status
  //     const matchesVerified =
  //       !verifiedOnly || verificationStatus === "verified";

  //     // Rating matching
  //     const matchesRating =
  //       selectedRatings.length === 0 ||
  //       selectedRatings.some(r => Math.floor(rating) >= r);

  //     return (
  //       matchesSearch &&
  //       matchesLocation &&
  //       matchesCraft &&
  //       matchesVerified &&
  //       matchesRating
  //     );
  //   });

  //   setFilteredArtisans(results);
  // };

  const handleApplyFilters = () => {
    const lowerSearch = searchTerm.trim().toLowerCase();

    const results = artisans.filter((artisan) => {
      // Safely access all properties with fallbacks
      const businessName = (artisan.businessName || "").toLowerCase();
      const artisanCraft = (artisan.craft || "").toLowerCase();
      const specialties = artisan.specialties || [];
      const artisanLocation = (artisan.location || "").toLowerCase();
      const rating = artisan.rating || 0;
      const verificationStatus = artisan.verificationStatus || "";

      // Search term matching
      const matchesSearch =
        lowerSearch === "" ||
        businessName.includes(lowerSearch) ||
        artisanCraft.includes(lowerSearch) ||
        specialties.some((s) => s.toLowerCase().includes(lowerSearch));

      // Location matching
      const matchesLocation =
        !locationFilter ||
        artisanLocation.includes(locationFilter.toLowerCase());

      // Craft matching - FIXED THIS PART
      const matchesCraft =
        !craftFilter || artisanCraft === craftFilter.toLowerCase();

      // Verification status
      const matchesVerified =
        !verifiedOnly || verificationStatus === "verified";

      // Rating matching
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((r) => Math.floor(rating) >= r);

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
  }, [
    searchTerm,
    locationFilter,
    craftFilter,
    selectedRatings,
    verifiedOnly,
    artisans,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="w-12 h-12 text-orange-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-center text-red-500">
          Error loading all artisan profiles.
        </p>
      </div>
    );
  }

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
                onChange={(e) => setLocationFilter(e.target.value)}
              >
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
                onChange={(e) => setCraftFilter(e.target.value)}
              >
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
                    className="flex items-center space-x-2 cursor-pointer"
                  >
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
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition"
              >
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
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                >
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
