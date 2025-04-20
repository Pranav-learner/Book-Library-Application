import React, { useState } from "react";
import BookCard from "../components/BookCard"; // Adjust the import path

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setSearchResults([]); // Clear previous results

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20` // Adjust maxResults as needed
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">
        Search Books
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Enter book title or author"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
