import React from 'react';

const Product = ({ product }) => {
   return (
      <div className="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
         <div className="product">
            <span className="badges">
               {product.badges.map((badge, index) => (
                  <span key={index} className={badge.class}>
                     {badge.text}
                  </span>
               ))}
            </span>
            <div className="thumb">
               <a href={`single-product/${product.id}`} className="image">
                  <img src={product.image} alt={product.title} />
                  <img
                     className="hover-image"
                     src={product.image}
                     alt={product.title}
                  />
               </a>
            </div>
            <div className="content">
               <span className="category">
                  <a href={product.categoryLink}>{product.category}</a>
               </span>
               <h5 className="title">
                  <a href={`single-product/${product.id}`}>{product.title}</a>
               </h5>
               <span className="price">
                  {product.salePrice ? (
                     <>
                        <span className="old">{product.oldPrice}</span>
                        <span className="new">{product.salePrice}</span>
                     </>
                  ) : (
                     <span className="new">{product.price}</span>
                  )}
               </span>
            </div>
            <div className="actions">
               <button
                  title="Add To Cart"
                  className="action add-to-cart"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal-Cart"
               >
                  <i className="pe-7s-shopbag"></i>
               </button>
               <button
                  className="action wishlist"
                  title="Wishlist"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal-Wishlist"
               >
                  <i className="pe-7s-like"></i>
               </button>
               <button
                  className="action quickview"
                  data-link-action="quickview"
                  title="Quick view"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
               >
                  <i className="pe-7s-look"></i>
               </button>
               <button
                  className="action compare"
                  title="Compare"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal-Compare"
               >
                  <i className="pe-7s-refresh-2"></i>
               </button>
            </div>
         </div>
      </div>
   );
};

export default Product;
