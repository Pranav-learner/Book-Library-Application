import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function BookCard({ book, bookId }) {
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();
  const inWishlist = isInWishlist(bookId);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <Link to={`/books/${bookId}`} className="block w-full h-full">
        {book?.imageLinks?.thumbnail && (
          <img
            src={book.imageLinks.thumbnail}
            alt={book?.title}
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
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (inWishlist) {
            removeFromWishlist(bookId);
          } else {
            addToWishlist({ ...book, id: bookId });
          }
        }}
        className="absolute top-2 right-2 p-2 rounded-full focus:outline-none"
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? (
          <span style={{ color: "red", fontSize: "1.5em" }}>&#10006;</span>
        ) : (
          <span
            style={{
              color: "red",
              fontSize: "1.5em",
              fontWeight: "bold",
            }}
          >
            &#10010;
          </span>
        )}
      </button>
    </div>
  );
}

export default BookCard;
