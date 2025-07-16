import { useState } from "react";
import { useNavigate } from "react-router";


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
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-2 flex"
    >
      <input
        type="text"
        placeholder="Search for plumbers, electricians, tailors..."
        className="flex-grow px-4 py-3 text-gray-800 focus:outline-none rounded-l-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="px-4 py-3 text-gray-600 border-l border-gray-200 focus:outline-none"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        <option value="Accra">Accra</option>
        <option value="Kumasi">Kumasi</option>
        <option value="Tema">Tema</option>
        <option value="Takoradi">Takoradi</option>
        <option value="Cape Coast">Cape Coast</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 font-medium"
      >
        <i className="fas fa-search mr-2"></i>Search
      </button>
    </form>
  );
};

export default SearchBar;
