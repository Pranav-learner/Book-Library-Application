import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function BookCard({ book, bookId }) {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();
  const inWishlist = isInWishlist(bookId);

  const defaultCover =
    "https://via.placeholder.com/128x192/e2e8f0/64748b?text=No+Cover";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative flex flex-col h-full border border-gray-100">
      <Link
        to={`/books/${bookId}`}
        className="flex flex-col flex-grow group"
        aria-label={`View details for ${book?.title || "book"}`}
      >
        <div className="relative overflow-hidden h-48 bg-gray-100">
          {book?.imageLinks?.thumbnail ? (
            <img
              src={book.imageLinks.thumbnail}
              alt={`Cover of ${book?.title || ""}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">No cover available</span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
            {book?.title || "Untitled"}
          </h3>

          <p className="text-sm text-gray-600 mb-2">
            {book?.authors?.length > 0
              ? book.authors.slice(0, 2).join(", ") +
                (book.authors.length > 2 ? " & others" : "")
              : "Unknown Author"}
          </p>

          {book?.categories && book.categories.length > 0 && (
            <div className="mt-auto">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                {book.categories[0]}
              </span>
            </div>
          )}
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (inWishlist) {
            removeFromWishlist(bookId);
          } else {
            addToWishlist({ ...book, id: bookId });
          }
        }}
        className={`absolute top-2 right-2 p-2 rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none 
          ${
            inWishlist
              ? "bg-red-50 hover:bg-red-100"
              : "bg-white/80 hover:bg-white"
          } 
          shadow-sm transition-all duration-200`}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? (
          <svg
            className="w-5 h-5 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-gray-400 hover:text-red-500 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        )}
      </button>
    </div>
  );
}

export default BookCard;
