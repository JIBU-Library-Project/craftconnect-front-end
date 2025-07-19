import { useState } from "react";
import { useNavigate } from "react-router";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const locations = [
  "Accra",
  "Kumasi",
  "Tema",
  "Takoradi",
  "Cape Coast",
  // Easily add more here later
];

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&location=${location}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="max-w-2xl mx-auto bg-white rounded-full shadow-lg flex items-center p-2 space-x-2 border border-gray-300 transition hover:shadow-xl"
    >
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Search for plumbers, electricians, tailors..."
          className="w-full px-4 py-3 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="relative">
        <select
          className="
      appearance-none
      px-4 py-3
      rounded-full
      border border-gray-300
      bg-white
      text-gray-700
      focus:outline-none focus:ring-2 focus:ring-indigo-500
      transition
      pr-10
    "
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        {/* Dropdown arrow */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full transition"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;
