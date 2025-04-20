import React from "react";
import { useWishlist } from "../context/WishlistContext";
import BookCard from "../components/BookCard";

function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((book) => (
          <BookCard key={book.id} book={book} bookId={book.id} />
        ))}
        {wishlist.length === 0 && <p>Your wishlist is empty.</p>}
      </div>
    </div>
  );
}

export default WishlistPage;
