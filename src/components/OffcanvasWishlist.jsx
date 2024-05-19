import React from 'react';
import { useWishlist } from './WishlistContext';

const OffcanvasWishlist = ({ isOpen, closeOffcanvas }) => {
  const { wishlistItems, removeFromWishlist, isWishlistOpen, toggleWishlist } = useWishlist();

  const offcanvasClasses = `offcanvas offcanvas-wishlist ${isOpen ? 'offcanvas-open' : ''}`;

  return (
    <div id="offcanvas-wishlist" className={offcanvasClasses}>
      <div className="inner">
        <div className="head">
          <span className="title">Wishlist</span>
          <button className="offcanvas-close" onClick={closeOffcanvas}>×</button>
        </div>
        <div className="body customScroll">
          {wishlistItems.length === 0 ? (
            <p>The wishlist is empty.</p>
          ) : (
            <ul className="minicart-product-list">
              {wishlistItems.map((item) => (
                <li key={item.id}>
                  {/* Используем item.image, item.name и item.price, если они доступны */}
                  <a href={`/single-product/${item.id}`} className="image">
                    <img src={item.mainImage} alt={item.name} />
                  </a>
                  <div className="content">
                    <a href={`/single-product/${item.id}`} className="title">
                      {item.name}
                    </a>
                    <span className="quantity-price">
                      1 x <span className="amount">${item.cost ? Number(item.cost).toFixed(2) : 'N/A'}</span>
                    </span>
                    <button className="remove" onClick={() => removeFromWishlist(item.id)}>
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="foot">
          <div className="buttons">
            <a href="/wishlist" className="btn btn-dark btn-hover-primary mt-30px">
              view wishlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasWishlist;
