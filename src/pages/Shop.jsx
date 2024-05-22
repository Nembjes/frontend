import React, { useState, useEffect } from 'react';
import ProductButtons from '../components/ProductButtons';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortOrder, setSortOrder] = useState('default');
  const productsPerPage = 12;

  

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const categoriesResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/category');
        const brandsResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/brand');

        if (!categoriesResponse.ok || !brandsResponse.ok) {
          throw new Error('Failed to fetch sidebar data');
        }

        const categoriesData = await categoriesResponse.json();
        const brandsData = await brandsResponse.json();

        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    fetchSidebarData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/products/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? 'All' : category);
    setSelectedBrand('All');
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand === selectedBrand ? 'All' : brand);
    setSelectedCategory('All');
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange({ ...priceRange, [name]: parseFloat(value) });
  };

  const filteredProducts = products.filter(product => {
    const categoryFilter = selectedCategory === 'All' || product.category.name === selectedCategory;
    const brandFilter = selectedBrand === 'All' || product.brand.name === selectedBrand;
    const priceFilter = product.cost >= priceRange.min && product.cost <= priceRange.max;
    return categoryFilter && brandFilter && priceFilter;
  });

  const sortedProducts = (() => {
    switch (sortOrder) {
      case 'nameAsc':
        return filteredProducts.slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return filteredProducts.slice().sort((a, b) => b.name.localeCompare(a.name));
      case 'priceAsc':
        return filteredProducts.slice().sort((a, b) => a.cost - b.cost);
      case 'priceDesc':
        return filteredProducts.slice().sort((a, b) => b.cost - a.cost);
      default:
        return filteredProducts;
    }
  })();

  const totalProducts = filteredProducts.length;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const currentProductsScore = currentProducts.length;


  return (
    <div>
      {/* Breadcrumb Area Start */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Single Product Page</h2>
              {/* Breadcrumb List Start */}
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Shop</li>
              </ul>
              {/* Breadcrumb List End */}
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Area End */}
      
      {/* Product Details Area */}
      <div className="product-details-area pt-100px pb-100px">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-xs-12 mb-lm-30px mb-md-30px mb-sm-30px">
              {/* Swiper */}
              <div className="swiper-container zoom-top">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <img className="img-responsive m-auto" src={mainImage} alt={`Product ${product.id}`} />
                    <a className="venobox full-preview" data-gall="myGallery" href={mainImage}>
                      <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* Additional Images */}
              <div className="swiper-container mt-20px zoom-thumbs slider-nav-style-1 small-nav">
                <div className="swiper-wrapper">
                  {images.map((image, index) => (
                    <div key={index} className="swiper-slide" style={{ width: '120px', height: '250px' }}>
                      <img
                        className="img-responsive m-auto"
                        src={image.link}
                        alt={`Product ${product.id}`}
                        style={{ width: '170px', height: '125px' }}
                        onClick={() => handleMainImageChange(image.link)} // Добавляем обработчик клика
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
  
            <div className="col-lg-6 col-sm-12 col-xs-12" data-aos="fade-up" data-aos-delay="200">
              {/* Product Details Content */}
              <div className="product-details-content quickview-content ml-25px">
                <h2>{product.name}</h2>
                {/* Pricing Meta */}
                <div className="pricing-meta">
                  <ul className="d-flex">
                    <li className="new-price">${product.cost}</li>
                  </ul>
                </div>
                <div className="pro-details-rating-wrap">
                  <div className="rating-product">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FaStar
                        key={value}
                        className={`star ${value <= (userRating || averageRating) ? 'selected' : ''}`}
                        onClick={() => submitRating(value)}
                        style={{ color: value <= (userRating || averageRating) ? '#FFD700' : '#aaa' }}
                      />
                    ))}
                  </div>
                  <span className="read-review">
                    <a className="reviews" href="">
                      ({averageRating} / {totalReviews} Customer Reviews)
                    </a>
                  </span>
                </div>
  
                {/* Product Description */}
                <p className="mt-30px"><b>Description:</b><br></br>{product.description}</p>
  
                {/* Categories */}
                <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                  <span>Categories: </span>
                  <ul className="d-flex">
                    <li>{product.category.name}</li>
                  </ul>
                </div>
  
                {/* Tags */}
                <div className="pro-details-categories-info pro-details-same-style d-flex m-0">
                  <span>Brand: </span>
                  <ul className="d-flex">
                    <li>{product.brand.name}</li>
                  </ul>
                </div>
  
                {/* Product Quantity */}
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button className="dec qtybutton" onClick={decreaseQuantity}>-</button>
                    <input
                      className="cart-plus-minus-box"
                      type="text"
                      name="qtybutton"
                      placeholder="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                    />
                    <button className="inc qtybutton" onClick={increaseQuantity}>+</button>
                  </div>
  
                  {/* Add to Cart Button */}
                  <ProductButtons productId={product.id} quantity={quantity} />
                </div>
              </div>
              
              {/* Product Details Description Area */}
              <div className="description-review-wrapper">
                <div className="description-review-topbar nav">
                  <button className="active" data-bs-toggle="tab" data-bs-target="#des-details1">Description</button>
                  <button data-bs-toggle="tab" data-bs-target="#des-details3">Comments</button>
                </div>
                <div className="tab-content description-review-bottom">
                  <div id="des-details1" className="tab-pane active">
                    {/* Product Description */}
                    <div className="product-description-wrapper">
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <div id="des-details3" className="tab-pane">
                    {/* Product Comments */}
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="comment-wrapper">
                          {/* Display comments or "No comments" */}
                          {comments.length > 0 ? (
                            comments.map((comment) => (
                              <div key={comment.id} className="single-comment">
                                <div className="comment-img">
                                  <img src="https://template.hasthemes.com/hmart/hmart/assets/images/review-image/1.png" alt={`User ${comment.user_id}`} />
                                </div>
                                <div className="comment-content">
                                  <div className="comment-top-wrap">
                                    <div className="comment-left" style={{ marginBottom: '50px' }}>
                                      <div className="comment-name">
                                        <h4>{comment.users.username}</h4>
                                      </div>
                                      <div className="comment-right">
                                        <p>{comment.com_text}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>No comments</p>
                          )}
                        </div>
                      </div>
                      {userId && (
                        <div className="col-lg-12">
                          {/* Add a Comment Form */}
                          <div className="comment-form-wrapper pl-50">
                            <h3>Add a Comment</h3>
                            <div className="comment-form">
                              <form onSubmit={submitComment}>
                                <div className="row">
                                  <div className="col-md-12">
                                    <div className="comment-form-style form-submit">
                                      <textarea name="comment" placeholder="Comment"></textarea>
                                      <button className="btn btn-primary btn-hover-color-primary" type="submit" value="Submit">Submit Comment</button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Related Products */}
            <div className="product-area related-product" style={{ marginTop: '100px' }}>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="section-title text-center m-0">
                      <h2 className="title">Related Products</h2>
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="new-product-slider swiper-container slider-nav-style-1">
                      <div className="d-flex justify-content-center align-items-center swiper-wrapper">
                        {relatedProducts.slice(currentIndex, currentIndex + 4).map((relatedProduct) => (
                          <div key={relatedProduct.id} className="swiper-slide" style={{ width: '275px' }}>
                            {/* Single Product */}
                            <div className="product" style={{ width: '270px', height: '400px' }}>
                              <div className="thumb">
                                <a href={`${relatedProduct.id}`} className="image">
                                  <img src={relatedProduct.mainImage} alt="Product" />
                                  <img className="hover-image" src={relatedProduct.mainImage} alt="Product" />
                                </a>
                              </div>
                              <div className="content">
                                <span className="category">{relatedProduct.category.name}</span>
                                <h5 className="title">
                                  <a href={`${relatedProduct.id}`}>{relatedProduct.name}</a>
                                </h5>
                                <span className="price">
                                  <span className="new">{relatedProduct.cost}</span>
                                </span>
                              </div>
                              <div className="actions">
                                <ProductButtons productId={relatedProduct.id} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <button className="prev" onClick={handlePrev}><FaChevronLeft size={32} /></button>
                        <button className="next" onClick={handleNext}><FaChevronRight size={32} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default ShopPage;
