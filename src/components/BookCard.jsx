import React from "react";
import { Link } from "react-router-dom";

function BookCard({ book }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link
        to={`/books/${
          book?.id || book?.industryIdentifiers?.[0]?.identifier || "unknown"
        }`}
      >
        {book?.imageLinks?.thumbnail && (
          <img
            src={book.imageLinks.thumbnail}
            alt={book.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {book?.title}
          </h3>
          <p className="text-sm text-gray-600">
            By {book?.authors?.[0] || "Unknown Author"}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default BookCard;
