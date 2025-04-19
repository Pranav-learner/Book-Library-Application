import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllBooks from "./pages/AllBooks";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/Wishlist";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path="/books" element={<AllBooks />} />{" "}
          {/* Optional: Alias for the home page */}
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
