import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import { useWishlist, WishlistProvider } from "./context/WishlistContext";
import { lazy } from "react";

const AllBooks = lazy(() => import("./pages/AllBooks"));
const BookDetails = lazy(() => import("./pages/BookDetails"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  return (
    <WishlistProvider>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Router>
          <Navbar />
          <div className="container mx-auto mt-8">
            <Routes>
              <Route path="/" element={<AllBooks />} />
              <Route path="/books/:bookId" element={<BookDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </Router>
      </Suspense>
    </WishlistProvider>
  );
}

export default App;
