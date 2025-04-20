import React, { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (book) => {
    console.log("Adding to wishlist:", book);
    if (!wishlist.some((item) => item.id === book.id)) {
      setWishlist([...wishlist, book]);
      console.log("wishlist updated ", [...wishlist, book]);
    } else {
      console.log("Book already in wishlist:", book.id);
    }
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter((item) => item.id !== bookId));
  };

  const isInWishlist = (bookId) => {
    return wishlist.some((item) => item.id === bookId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};
