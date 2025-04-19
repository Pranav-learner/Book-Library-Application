import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20"
        ); // Example query
        const data = await response.json();
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
  }, []);

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
          <BookCard key={book.id} book={book.volumeInfo} />
        ))}
      </div>
    </div>
  );
}

export default AllBooks;
