import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductButtons from '../components/ProductButtons';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [userId, setUserId] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [totalReviews, setTotalReviews] = useState(0);
  
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const fetchUserRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rate/${id}`);
        // Проверяем, есть ли оценка от пользователя в ответе
        const userRate = response.data && response.data.user_id === userId ? response.data : null;
        if (userRate) {
          setUserRating(parseInt(userRate.value, 10));
        }
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };
    

    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}/images`);
        setImages(response.data);
        if (response.data.length > 0) {
          setMainImage(response.data[0].link);
        } else {
          setMainImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkaQjRLl9Q4nriLgQln4vNvBCoWsnT_NTVIw&usqp=CAU');
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/comments/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rate/${id}`);
        
        // Проверяем, является ли response.data массивом
        if (Array.isArray(response.data)) {
          const ratings = response.data.map(rate => parseInt(rate.rate_id, 10));
          const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
          setAverageRating(average);
          setTotalReviews(ratings.length);
        } else {
          console.error('Response data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    };
    
    

    const fetchUserId = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const userData = await response.json();
        setUserId(userData.userId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserRating();
    fetchProduct();
    fetchImages();
    fetchComments();
    fetchAverageRating();
    fetchUserId();
  }, [id, userId]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10) || 1;
    setQuantity(Math.max(1, value));
  };

  const decreaseQuantity = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleMainImageChange = (imageLink) => {
    setMainImage(imageLink);
  };

  const submitComment = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/comments', {
        user_id: userId,
        prod_code: id,
        com_text: event.target.comment.value,
        date: new Date(),
      });
      // Очистить поле комментария после успешной отправки
      event.target.comment.value = '';
      // Обновить комментарии
      const response = await axios.get(`http://localhost:5000/comments/${id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        // Get four random products excluding the current one
        const filteredProducts = response.data.filter((p) => p.id !== parseInt(id, 10));
        const randomProducts = [];

        while (randomProducts.length < 12 && filteredProducts.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredProducts.length);
          randomProducts.push(filteredProducts.splice(randomIndex, 1)[0]);
        }

        setRelatedProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };
    fetchRelatedProducts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? relatedProducts.length - 4 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === relatedProducts.length - 4 ? 0 : prevIndex + 1));
  };

  const submitRating = async (ratingValue) => {
    try {
      const existingRating = userRating ? await axios.get(`http://localhost:5000/rate/${id}`) : null;
      if (existingRating) {
        await axios.put(`http://localhost:5000/rate/${id}`, {
          rate_id: existingRating.rate_id,
          user_id: userId,
          prod_code: id,
          value: ratingValue,
        });
      } else {
        await axios.post('http://localhost:5000/rate', {
          rate_id: ratingValue,
          user_id: userId,
          prod_code: id,
        });
      }
      // Обновить средний рейтинг после успешной отправки оценки
      const response = await axios.get(`http://localhost:5000/rate/${id}`);
      if (response.data && typeof response.data === 'object' && 'value' in response.data) {
        const newRating = parseInt(response.data.value, 10);
        setAverageRating(newRating);
      } else {
        console.error('Invalid response format:', response.data);
      }
      // Обновить текущую оценку пользователя
      setUserRating(ratingValue);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  if (!product) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;
  }

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
        <ProductButtons productId={product.id} quantity={quantity}  />
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
              <div className=" d-flex justify-content-center align-items-center swiper-wrapper">
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

export default SingleProduct;
