// src/pages/AllBooks.jsx
import React from "react";

function AllBooks() {
  return (
    <div className="p-4">
      <h1>Search Books</h1>
      <input
        type="text"
        placeholder="Search for books..."
        className="border p-2 rounded w-full mb-4"
      />
    </div>
  );
}

export default AllBooks;
