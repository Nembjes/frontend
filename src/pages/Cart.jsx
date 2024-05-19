// Cart.jsx
import React from 'react';
import { useCart } from '../components/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, cartQuantity, updateCartItemQuantity } = useCart();

    const handleQuantityChange = (itemId, newQuantity) => {
      // Проверка, чтобы избежать отрицательных значений и некорректных данных
      newQuantity = Math.max(1, parseInt(newQuantity, 10) || 1);
      updateCartItemQuantity(itemId, newQuantity);
    };

  return (
    <div>
      {/* Breadcrumb Area Start */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Cart</h2>
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Cart</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Area End */}

      {cartItems.length > 0 ? (
        // Cart Items Area Start
        <div className="cart-main-area pt-100px pb-100px">
          <div className="container">
            <h3 className="cart-page-title">Your cart items</h3>
            <form action="#">
              <div className="table-content table-responsive cart-table-content">
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Until Price</th>
                      <th>Qty</th>
                      <th>Subtotal</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="product-thumbnail">
                          <a href="#"><img className="img-responsive ml-15px" src={item.mainImage} alt="" /></a>
                        </td>
                        <td className="product-name"><a href="#">{item.name}</a></td>
                        <td className="product-price-cart"><span className="amount">${item.cost}</span></td>
                        <td className="product-quantity">
                          <div className="cart-plus-minus">
                            <input
                              className="cart-plus-minus-box"
                              type="text"
                              name="qtybutton"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                          </div>
                        </td>
                        <td className="product-subtotal">${item.cost * item.quantity}</td>
                        <td className="product-remove">
                          <button onClick={() => removeFromCart(item.id)}><i className="fa fa-times"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <a href="shop-left-sidebar">Continue Shopping</a>
                    </div>
                    <div className="cart-clear">
                      <a href="checkout">Checkout</a>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-lm-30px">
                {/* Add Estimate Shipping and Tax Component here */}
              </div>
              <div className="col-lg-4 col-md-6 mb-lm-30px">
                {/* Add Discount Code Component here */}
              </div>
              <div className="col-lg-4 col-md-12 mt-md-30px">
                {/* Add Grand Total Component here */}
              </div>
            </div>
          </div>
        </div>
        // Cart Items Area End
      ) : (
        // Empty Cart Area Start
        <div className="empty-cart-area pb-100px pt-100px">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="cart-heading">
                  <h2>Your cart item</h2>
                </div>
                <div className="empty-text-contant text-center">
                  <i className="pe-7s-shopbag"></i>
                  <h3>There are no more items in your cart</h3>
                  <a className="empty-cart-btn" href="/">
                    <i className="fa fa-arrow-left"></i> Continue shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        // Empty Cart Area End
      )}
    </div>
  );
};

export default Cart;
