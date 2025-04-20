import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";
import Activites from "./pages/Activites";
import { lazy, suspense } from "react";
import { useWishlist, WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WishlistProvider>
        <Router>
          <Navbar />
          <div className="container mx-auto mt-8">
            <Routes>
              <Route path="/" element={<AllBooks />} />
              <Route path="/activites" element={<Activites />} />
              <Route path="/books/:bookId" element={<BookDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </div>
        </Router>
      </WishlistProvider>
    </Suspense>
  );
}

export default App;
