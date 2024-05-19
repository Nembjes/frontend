// CartContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const getCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const [cartItems, setCartItems] = useState(() => getCartFromLocalStorage());
  const [cartQuantity, setCartQuantity] = useState(() => {
    const storedQuantity = localStorage.getItem('cartQuantity');
    return storedQuantity ? parseInt(storedQuantity, 10) : 0;
  });

  const addToCart = async (itemId, quantity) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${itemId}`);
      const newItem = response.data;
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === newItem.id);
  
        if (existingItem) {
          // Если товар уже есть в корзине, увеличиваем количество
          const updatedCart = prevItems.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + quantity } : item
          );
          saveCartToLocalStorage(updatedCart);
          return updatedCart;
        } else {
          // Если товара еще нет в корзине, добавляем с указанным количеством
          const updatedCart = [...prevItems, { ...newItem, quantity }];
          saveCartToLocalStorage(updatedCart);
          return updatedCart;
        }
      });
      setCartQuantity((prevQuantity) => prevQuantity + quantity);
      localStorage.setItem('cartQuantity', cartQuantity + quantity);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };
  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  
    // Declare updatedCart outside of the map function
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
  
    setCartQuantity((prevQuantity) => calculateTotalQuantity(updatedCart));
    localStorage.setItem('cartQuantity', calculateTotalQuantity(updatedCart));
  };
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== itemId);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
    setCartQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    localStorage.setItem('cartQuantity', Math.max(0, cartQuantity - 1));
  };

  useEffect(() => {
    console.log('CartContext useEffect triggered');
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartQuantity(0);
    // После сброса состояний, обновите локальное хранилище
    saveCartToLocalStorage([]);
    localStorage.setItem('cartQuantity', 0);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartQuantity, updateCartItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
