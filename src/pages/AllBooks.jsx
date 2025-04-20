import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";
import { useWishlist } from "../context/WishlistContext.jsx"; // Adjust the import path

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const maxResults = 20; // Number of books to fetch per page

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=${maxResults}&startIndex=${startIndex}`
        );
        const data = await response.json();
        console.log(data);
        if (data.items) {
          setBooks(data.items);
        } else {
          setBooks([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [startIndex]);

  const handleNext = () => {
    setStartIndex((prevIndex) => prevIndex + maxResults);
  };

  const handlePrevious = () => {
    setStartIndex((prevIndex) => Math.max(0, prevIndex - maxResults));
  };

  if (loading) {
    return <div className="p-4">Loading books...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading books: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">All Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book.volumeInfo} bookId={book.id} />
        ))}
      </div>
      <div className="flex justify-around mt-4">
        <button
          onClick={handlePrevious}
          disabled={startIndex === 0}
          className="px-3 py-2 bg-gray-300 text-white rounded hover:bg-blue-600"
        >
          &#8592; {/* Left arrow Unicode character */}
        </button>
        <button
          onClick={handleNext}
          className="px-3 py-2 bg-gray-300 text-white rounded hover:bg-blue-600"
        >
          &#8594; {/* Right arrow Unicode character */}
        </button>
      </div>
    </div>
  );
}

export default AllBooks;
