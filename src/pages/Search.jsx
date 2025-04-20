import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevance"); // Default sorting

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20&printType=${
          filter === "books"
            ? "books"
            : filter === "magazines"
            ? "magazines"
            : "all"
        }&orderBy=${sortBy}`
      );
      const data = await response.json();

      if (data.items) {
        setSearchResults(data.items);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch results when the filter or sort changes (if a search term is present)
  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    }
  }, [filter, sortBy]);

  return (
    <div className="p-4 bg-amber-300">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Search Books
      </h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Enter book title or author"
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-amber-50 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
          onClick={handleSearch}
          disabled={loading || !searchTerm.trim()}
        >
          Search
        </button>
        <select
          className="shadow appearance-none border rounded py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold leading-tight focus:outline-none focus:shadow-outline ml-2"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All Print Types</option>
          <option value="books">Books Only</option>
          <option value="magazines">Magazines Only</option>
        </select>
      </div>

      {loading && <p>Searching for books...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((result) => (
          <BookCard
            key={result.id}
            book={result.volumeInfo}
            bookId={result.id}
          />
        ))}
      </div>

      {searchResults.length === 0 &&
        !loading &&
        !error &&
        searchTerm.trim() !== ""}
    </div>
  );
}

export default SearchPage;
