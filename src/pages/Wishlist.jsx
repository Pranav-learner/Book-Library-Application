import React from "react";
import { useWishlist } from "../context/WishlistContext";
import BookCard from "../components/BookCard";

function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 hidden lg:block">
          <div className="text-purple-200 transform rotate-12 opacity-20"></div>
        </div>

        {/* Header section with improved typography and visual appeal */}
        <div className="relative mb-12 text-center sm:text-left">
          <div className="inline-block">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full mb-3">
              Personal Collection
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Wishlist
              </span>
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-4 mb-4 mx-auto sm:mx-0"></div>
            <p className="mt-3 text-lg text-gray-600">
              {wishlist.length > 0
                ? `You have ${wishlist.length} ${
                    wishlist.length === 1 ? "book" : "books"
                  } saved in your collection`
                : "Start building your literary dreams"}
            </p>
          </div>
        </div>

        {/* Main content area with enhanced styling */}
        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <BookCard book={book} bookId={book.id} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-2xl p-10 text-center border border-purple-100 shadow-xl max-w-2xl mx-auto transform transition-all">
            <div className="mx-auto w-24 h-24 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your wishlist is waiting
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto text-lg">
              Discover your next favorite read and add it to your collection
              with just one click.
            </p>
            <a
              href="/browse"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md transition-all duration-200"
            >
              Explore Books
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
