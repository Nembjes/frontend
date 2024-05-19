import React from 'react';
import { useCart } from './CartContext';

const OffcanvasCart = ({ isOpen, closeOffcanvas }) => {
  const { cartItems, removeFromCart } = useCart();

  const offcanvasClasses = `offcanvas offcanvas-cart ${isOpen ? 'offcanvas-open' : ''}`;

  return (
    <div id="offcanvas-cart" className={offcanvasClasses}>
      <div className="inner">
        <div className="head">
          <span className="title">Cart</span>
          <button className="offcanvas-close" onClick={closeOffcanvas}>×</button>
        </div>
        <div className="body customScroll">
          {cartItems.length === 0 ? (
            <p>The cart is empty.</p>
          ) : (
            <ul className="minicart-product-list">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <a href={`/single-product/${item.id}`} className="image">
                    <img src={item.mainImage} alt={item.name} />
                  </a>
                  <div className="content">
                    <a href={`/single-product/${item.id}`} className="title">
                      {item.name}
                    </a>
                    <span className="quantity-price">
                      {item.quantity} x <span className="amount">${item.cost ? Number(item.cost).toFixed(2) : 'N/A'}</span>
                    </span>
                    <button className="remove" onClick={() => removeFromCart(item.id)}>
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="foot">
          <div className="buttons mt-30px">
            <a href="/cart" className="btn btn-dark btn-hover-primary mb-30px">
              view cart
            </a>
            <a href="/checkout" className="btn btn-outline-dark current-btn">
              checkout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasCart;
