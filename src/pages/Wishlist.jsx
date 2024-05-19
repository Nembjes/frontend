// Wishlist.jsx
import React from 'react';
import { useWishlist } from '../components/WishlistContext';
import { useCart } from '../components/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item.id,1);
    removeFromWishlist(item.id);
  };

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
  };


  return (
    <div>
      {/* Breadcrumb Area */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Wishlist</h2>
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Wishlist</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wishlist Area */}
      <div className="cart-main-area pt-100px pb-100px">
        <div className="container">
          <h3 className="cart-page-title">Your wishlist items</h3>
          
          {wishlistItems.length > 0 ? (
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <form action="#">
                  <div className="table-content table-responsive cart-table-content">
                    <table>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Name</th>
                          <th>Until Price</th>
                          <th>Add To Cart</th>
                        </tr>
                      </thead>
                      <tbody>
        {wishlistItems.map((item) => (
          <tr key={item.id}>
            <td className="product-thumbnail">
              <a href="#"><img className="img-responsive ml-15px" style={{ width: '50%'}} src={item.mainImage} alt={item.name} /></a>
            </td>
            <td className="product-name"><a href="#">{item.name}</a></td>
            <td className="product-price-cart"><span className="amount">${item.cost}</span></td>
            <td className="product-wishlist-cart">
              <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              <button onClick={() => handleRemoveFromWishlist(item.id)}>Delete from Wishlist</button> {/* Добавляем кнопку удаления */}
            </td>
          </tr>
        ))}
      </tbody>
                    </table>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-12">
                <div className="cart-heading">
                  <h2>Your wishlist is empty</h2>
                </div>
                <div className="empty-text-contant text-center">
                  <i className="pe-7s-shopbag"></i>
                  <h3>There are no more items in your wishlist</h3>
                  <a className="empty-cart-btn" href="shop-left-sidebar">
                    <i className="fa fa-arrow-left"> </i> Continue shopping
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
