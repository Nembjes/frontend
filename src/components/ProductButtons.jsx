import React from 'react';
import { useCart } from '../components/CartContext';
import { useWishlist } from '../components/WishlistContext';

const ProductButtons = ({ productId, quantity = 1 }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = () => {
    addToCart(productId, quantity); // Передаем идентификатор товара и количество
  };

  const handleAddToWishlist = () => {
    addToWishlist(productId);
  };

  return (
    <>
      <button
        title="Add To Cart"
        className="action add-to-cart"
        onClick={handleAddToCart}
      >
        <i className="pe-7s-shopbag"></i>
      </button>
      <button
        className="action wishlist"
        title="Wishlist"
        onClick={handleAddToWishlist}
      >
        <i className="pe-7s-like"></i>
      </button>
      {/* Другие кнопки */}
    </>
  );
};

export default ProductButtons;
