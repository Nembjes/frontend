// WishlistContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const getWishlistFromLocalStorage = () => {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  };

  const saveWishlistToLocalStorage = (wishlist) => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const [wishlistItems, setWishlistItems] = useState(getWishlistFromLocalStorage);

  const addToWishlist = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${itemId}`);
      const newItem = response.data;
      setWishlistItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === newItem.id);

        if (existingItem) {
          // Если товар уже есть в вишлисте, увеличиваем количество
          const updatedWishlist = prevItems.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          saveWishlistToLocalStorage(updatedWishlist);
          return updatedWishlist;
        } else {
          // Если товара еще нет в вишлисте, добавляем с количеством 1
          const updatedWishlist = [...prevItems, { ...newItem, quantity: 1 }];
          saveWishlistToLocalStorage(updatedWishlist);
          return updatedWishlist;
        }
      });
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prevItems) => {
      const updatedWishlist = prevItems.filter((item) => item.id !== itemId);
      saveWishlistToLocalStorage(updatedWishlist);
      return updatedWishlist;
    });
  };

  useEffect(() => {
    console.log('WishlistContext useEffect triggered');
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
