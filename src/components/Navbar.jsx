import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Title */}
        <Link to="/" className="text-xl font-bold text-white">
          Book Library
        </Link>

        {/* Mobile Menu Button (Hidden on larger screens) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <div
              className={`w-6 h-0.5 bg-white rounded-sm transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white rounded-sm mt-1 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-white rounded-sm mt-1 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </button>
        </div>

        {/* Desktop Navigation Links (Visible on larger screens) */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/activites"
            className="text-indigo-100 hover:text-white hover:bg-indigo-700 px-3 py-1 rounded-md transition-colors"
          >
            Your Activity
          </Link>
          <Link
            to="/wishlist"
            className="text-indigo-100 hover:text-white hover:bg-indigo-700 px-3 py-1 rounded-md transition-colors"
          >
            Wishlist
          </Link>
          <Link
            to="/search"
            className="text-indigo-100 hover:text-white hover:bg-indigo-700 px-3 py-1 rounded-md transition-colors"
          >
            Search
          </Link>
        </div>
      </div>

      {/* Mobile Menu (Collapsed by default) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-2 flex flex-col space-y-1">
          <Link
            to="/search"
            className="block text-indigo-100 hover:text-white hover:bg-indigo-800 px-3 py-2 rounded-md"
          >
            Search
          </Link>
          <Link
            to="/activites"
            className="block text-indigo-100 hover:text-white hover:bg-indigo-800 px-3 py-2 rounded-md"
          >
            Your Activity
          </Link>
          <Link
            to="/wishlist"
            className="block text-indigo-100 hover:text-white hover:bg-indigo-800 px-3 py-2 rounded-md"
          >
            Wishlist
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
