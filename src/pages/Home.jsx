import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductButtons from '../components/ProductButtons';
import { Button } from 'react-bootstrap';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [mostPurchasedProducts, setMostPurchasedProducts] = useState([]);
  const [topRatedProducts, setTopRatedProducts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);


  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/blog');
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };
  
    fetchBlogPosts();
  }, []);
  

  useEffect(() => {
    // Запросы к вашей базе данных для получения продуктов для "Most Purchased" и "Top Rated"
    const fetchMostPurchasedProducts = async () => {
      // Ваш запрос к базе данных для "Most Purchased"
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/products/mostPurchased');
        const data = await response.json();
        setMostPurchasedProducts(data);
      } catch (error) {
        console.error('Error fetching most purchased products:', error);
      }
    };

    const fetchTopRatedProducts = async () => {
      // Ваш запрос к базе данных для "Top Rated"
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/products/topRated');
        const data = await response.json();
        setTopRatedProducts(data);
      } catch (error) {
        console.error('Error fetching top rated products:', error);
      }
    };

    fetchMostPurchasedProducts();
    fetchTopRatedProducts();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/products/featured');
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div>
      <div className="section pt-5" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/hero/bg/hero-bg-1.webp)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '65vh' }}>
                <div className="container h-100">
                  <div className="row h-100">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 align-self-center sm-center-view">
                      <div className="hero-slide-content">
                        <h2 className="title-1">Welcome to ELSHOP!</h2>
                        <a href="shop-left-sidebar" className="btn btn-primary text-capitalize">
                          Shop All Devices
                        </a>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 d-flex justify-content-center position-relative align-items-end">
  <div className="show-case">
    <div className="hero-slide-content d-none d-md-block">
      <img src="https://htmldemo.net/hmart/hmart/assets/images/hero/inner-img/hero-1-1.png" alt="" />
    </div>
  </div>
</div>
                  </div>
                </div>
      </div>

      {/* Banner Area */}
<div className="banner-area style-one pt-100px pb-100px">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <div className="single-banner nth-child-1">
          <img src="https://img.freepik.com/free-photo/smartphone-balancing-with-pink-background_23-2150271746.jpg?size=626&ext=jpg&ga=GA1.1.444422499.1704699928&semt=sph" alt="" style={{ height: '540px', width: '100%'}} />
          <div className="banner-content nth-child-1">
            <h3 className="title">Smartphone</h3>
            <span className="category">From $30.00</span>
            {/* Добавляем параметры запроса к URL */}
            <a href="shop-left-sidebar" className="shop-link">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="single-banner nth-child-2 mb-30px mb-lm-30px mt-lm-30px">
          <img style={{ height: '255px', width: '100%'}} src="https://img.freepik.com/free-photo/television-and-houseplants-in-room-scene-generative-ai_188544-12145.jpg?size=626&ext=jpg&ga=GA1.1.444422499.1704699928&semt=sph" alt="" />
          <div className="banner-content nth-child-2">
            <h3 className="title">TV</h3>
            <span className="category">From $30.00</span>
            {/* Добавляем параметры запроса к URL */}
            <a href="shop-left-sidebar" className="shop-link">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
        <div className="single-banner nth-child-2">
          <img style={{ height: '255px', width: '100%'}} src="https://img.freepik.com/free-photo/retro-computer-and-technology-with-monitor-and-hardware_23-2149506835.jpg?size=626&ext=jpg&ga=GA1.1.444422499.1704699928&semt=sph" alt="" />
          <div className="banner-content nth-child-3">
            <h3 className="title">Computers</h3>
            <span className="category">From $30.00</span>
            {/* Добавляем параметры запроса к URL */}
            <a href="shop-left-sidebar" className="shop-link">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Banner Area End */}
      {/* <!-- Product Area Start --> */}
      <div className="product-area pb-100px">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tab-slider d-md-flex justify-content-md-between align-items-md-center">
              <ul className="product-tab-nav nav justify-content-start align-items-center">
                <li className="nav-item">
                  <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#newarrivals">
                    Most Purchased
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" data-bs-toggle="tab" data-bs-target="#toprated">
                    Top Rated
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="tab-content mt-60px">
              {/* Most Purchased Tab */}
              <div className="tab-pane fade show active" id="newarrivals">
                <div className="row mb-n-30px">
                  {Array.isArray(mostPurchasedProducts) &&
            mostPurchasedProducts.map((product, index) => (
                    <div key={index} className="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
                      <div className="product" style={{ width: '100%' , height: '370px'}}>
                        <div className="thumb">
                          <a href={`single-product/${product.id}`} className="image">
                            <img src={product.mainImage} alt={product.name} style={{ width: '100%' , height: '220px'}} />
                            <img className="hover-image" src={product.mainImage} alt={product.name} style={{ width: '90%' , height: '220px'}} />
                          </a>
                        </div>
                        <div className="content">
                          <span className="category">
                            <a href="#">{product.brand.name}</a>
                          </span>
                          <h5 className="title">
                            <a href={`single-product/${product.id}`}>{product.name}</a>
                          </h5>
                          <span className="price">
                            <span className="new">${product.cost}</span>
                          </span>
                        </div>
                        <div className="actions">
                        <ProductButtons productId={product.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Rated Tab */}
              <div className="tab-pane fade" id="toprated">
                <div className="row">
                  {Array.isArray(topRatedProducts) &&
            topRatedProducts.map((product, index) => (
                    <div key={index} className="col-lg-4 col-xl-3 col-md-6 col-sm-6 col-xs-6 mb-30px">
                      <div className="product" style={{ width: '100%' , height: '370px'}}>
                        <div className="thumb">
                          <a href={`single-product/${product.id}`} className="image">
                            <img src={product.mainImage} alt={product.name} style={{ width: '100%' , height: '220px'}} />
                            <img className="hover-image" src={product.mainImage} alt={product.name} />
                          </a>
                        </div>
                        <div className="content">
                          <span className="category">
                            <a href="#">{product.brand.name}</a>
                          </span>
                          <h5 className="title">
                            <a href={`single-product/${product.id}`}>{product.name}</a>
                          </h5>
                          <span className="price">
                            <span className="new">${product.cost}</span>
                          </span>
                        </div>
                        <div className="actions">
                        <ProductButtons productId={product.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        {/* <!-- Product Area End --> */}
        {/* <!-- Fashion Area Start --> */}
        <div className="fashion-area" style={{ backgroundImage: `url('https://htmldemo.net/hmart/hmart/assets/images/fashion/fashion-bg.webp')` }}>
            <div className="container h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 text-center">
                        <h2 className="title"> <span>Smart Fashion</span> With Smart Devices </h2>
                        <a href="shop-left-sidebar" className="btn btn-primary text-capitalize m-auto">Shop All Devices</a>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Fashion Area End --> */}
        {/* <!-- Feature product area start --> */}
        <div className="section" style={{ marginTop: '50px', marginBottom: '50px' }}>
      <div className="container">
        <div className="row">
          {/* Top Selling */}
          <div className="col-md-4 col-xs-6">
            <div className="section-title">
              <h4 className="title">Top selling</h4>
              <div className="section-nav">
                <div id="slick-nav-3" className="products-slick-nav"></div>
              </div>
            </div>

            <div className="products-widget-slick" data-nav="#slick-nav-3">
            <Slider {...sliderSettings}>
              {Array.isArray(mostPurchasedProducts) &&
            mostPurchasedProducts.map((product, index) => (
                <div key={index}>
                  <div className="product-widget">
                    <div className="product-img">
                      <img src={product.mainImage} alt={product.name} />
                    </div>
                    <div className="product-body">
                      <p className="product-category">
                        <a href="#">{product.brand.name}</a>
                      </p>
                      <h3 className="product-name">
                        <a href={`single-product/${product.id}`}>{product.name}</a>
                      </h3>
                      <h4 className="product-price">
                        ${product.cost} <del className="product-old-price">${product.oldPrice}</del>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
              </Slider>
            </div>
          </div>

          {/* Most Rated */}
          <div className="col-md-4 col-xs-6">
            <div className="section-title">
              <h4 className="title">Most Rated</h4>
              <div className="section-nav">
                <div id="slick-nav-4" className="products-slick-nav"></div>
              </div>
            </div>

            <div className="products-widget-slick" data-nav="#slick-nav-4">
            <Slider {...sliderSettings}>
              {Array.isArray(topRatedProducts) &&
            topRatedProducts.map((product, index) => (
                <div key={index}>
                  <div className="product-widget">
                    <div className="product-img">
                      <img src={product.mainImage} alt={product.name} />
                    </div>
                    <div className="product-body">
                      <p className="product-category">
                        <a href="#">{product.brand.name}</a>
                      </p>
                      <h3 className="product-name">
                        <a href={`single-product/${product.id}`}>{product.name}</a>
                      </h3>
                      <h4 className="product-price">
                        ${product.cost} <del className="product-old-price">${product.oldPrice}</del>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
              </Slider>
            </div>
          </div>

          {/* Most Popular */}
          <div className="col-md-4 col-xs-6">
            <div className="section-title">
              <h4 className="title">Most popular</h4>
              <div className="section-nav">
                <div id="slick-nav-5" className="products-slick-nav"></div>
              </div>
            </div>

            <div className="products-widget-slick" data-nav="#slick-nav-5">
            <Slider {...sliderSettings}>
              {Array.isArray(mostPurchasedProducts) &&
            mostPurchasedProducts.map((product, index) => (
                <div key={index}>
                  <div className="product-widget">
                    <div className="product-img">
                      <img src={product.mainImage} alt={product.name} />
                    </div>
                    <div className="product-body">
                      <p className="product-category">
                        <a href="#">{product.brand.name}</a>
                      </p>
                      <h3 className="product-name">
                        <a href={`single-product/${product.id}`}>{product.name}</a>
                      </h3>
                      <h4 className="product-price">
                        ${product.cost} <del className="product-old-price">${product.oldPrice}</del>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
        {/* <!-- Feature product area End --> */}
        {/* Область последних блог-постов */}
        <div className="main-blog-area pb-100px">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <div className="section-title text-center mb-30px0px">
          <h2 className="title">Lastest blogs</h2>
          <p>View and read our interesting blogs!</p>
        </div>
      </div>
    </div>
    <div className="row">
      {Array.isArray(blogPosts) &&
        blogPosts.slice(0, 2).map((post, index) => (
          <div key={index} className="col-lg-6 col-sm-6 mb-xs-30px">
            <div className="single-blog">
              <div className="blog-image">
                <a href={`blog-single/${post.id}`}>
                  <img src={post.imageLink} className="img-responsive w-100" style={{ width:'100%', height:'350px'}} alt="" />
                </a>
              </div>
              <div className="blog-text">
                <div className="blog-athor-date line-height-1">
                  <span className="blog-date">
                    <i className="fa fa-calendar" aria-hidden="true"></i> {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    <a className="blog-author" href={`blog-grid/${post.users.id}`}>
                      <i className="fa fa-user" aria-hidden="true"></i> {post.users.username}
                    </a>
                  </span>
                </div>
                <h5 className="blog-heading">
                  <a className="blog-heading-link" href={`blog-single/${post.id}`}>{post.title}</a>
                </h5>
                <p>{post.text.length > 100 ? post.text.slice(0, 100) + '...' : post.text}</p>
                <a href={`blog-single/${post.id}`} className="btn btn-primary blog-btn">
                Read more
                </a>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
</div>


    </div>
  );
};

export default Home;
