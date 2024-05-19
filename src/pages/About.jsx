import React, { useEffect, useState } from 'react';

const About = () => {
    const [blogPosts, setBlogPosts] = useState([]);


    useEffect(() => {
      const fetchBlogPosts = async () => {
        try {
          const response = await fetch('http://localhost:5000/blog');
          const data = await response.json();
          setBlogPosts(data);
        } catch (error) {
          console.error('Error fetching blog posts:', error);
        }
      };
    
      fetchBlogPosts();
    }, []);
    return (
        <div>
            {/* Breadcrumb Area Start */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">About Us</h2>
              {/* Breadcrumb List Start */}
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">About</li>
              </ul>
              {/* Breadcrumb List End */}
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Area End */}
            {/* About section Start */}
            <div className="about-area pt-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="about-wrapper text-center">
                                <div className="about-contant">
                                    <h2 className="title">
                                        <span>Smart Fashion </span>
                                        With Smart Devices
                                    </h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea comml consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa</p>
                                </div>
                                <div className="promo-video">
                                    <img src="https://template.hasthemes.com/hmart/hmart/assets/images/about/promo-video-img.webp" alt="" />
                                    <a href="https://youtu.be/7rmQIzbgpoA" className="venobox overlay-box" data-vbtype="video">
                                        <span className="fa fa-play"><i className="ripple"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* About section End */}
            {/* Team Area Start */}
            <div className="team-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center">
                                <h2 className="title line-height-1">Team Member</h2>
                                <p>There are many variations of passages of Lorem Ipsum available</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-n-30px">
                        {/* Single Team */}
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-lm-30px mb-lg-30px mb-md-30px">
                            <div className="team-wrapper ">
                                <div className="team-image overflow-hidden">
                                    <img src="https://template.hasthemes.com/hmart/hmart/assets/images/team/1.webp" alt="" />
                                    <ul className="team-social d-flex">
                                        <li>
                                            <a className="m-0" title="Twitter" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Tumblr" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-tumblr" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Facebook" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Instagram" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="team-inner">
                                    <div className="team-content">
                                        <h6 className="title">Sara Koivisto</h6>
                                        <span className="sub-title">Team Member</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Single Team */}
                        {/* Single Team */}
                        <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-lm-30px mb-lg-30px mb-md-30px">
                            <div className="team-wrapper">
                                <div className="team-image overflow-hidden">
                                    <img src="https://template.hasthemes.com/hmart/hmart/assets/images/team/2.webp" alt="" />
                                    <ul className="team-social d-flex">
                                        <li>
                                            <a className="m-0" title="Twitter" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Tumblr" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-tumblr" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Facebook" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Instagram" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="team-inner">
                                    <div className="team-content">
                                        <h6 className="title">Anaiah Whitten</h6>
                                        <span className="sub-title">Team Member</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Single Team */}
                        {/* Single Team */}
                        <div className="col-xl-4 col-lg-4 col-sm-6 col-md-6 mb-lm-30px ">
                            <div className="team-wrapper">
                                <div className="team-image overflow-hidden">
                                    <img src="https://template.hasthemes.com/hmart/hmart/assets/images/team/3.webp" alt="" />
                                    <ul className="team-social d-flex">
                                        <li>
                                            <a className="m-0" title="Twitter" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Tumblr" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-tumblr" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Facebook" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-twitter" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a title="Instagram" target="_blank" rel="noopener noreferrer" href="#">
                                                <i className="fa fa-instagram" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="team-inner">
                                    <div className="team-content">
                                        <h6 className="title">Rachel Leonard</h6>
                                        <span className="sub-title">Team Member</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Single Team */}
                    </div>
                </div>
            </div>
            {/* Team Area End */}
            {/* Feature Area Srart */}
            <div className="feature-area pt-100px pb-100px">
                <div className="container">
                    <div className="feature-wrapper">
                        <div className="single-feture-col mb-md-30px mb-lm-30px">
                            {/* single item */}
                            <div className="single-feature">
                                <div className="feature-icon">
                                    <img src="https://template.hasthemes.com/hmart/hmart/assets/images/icons/1.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4 className="title">Free Shipping</h4>
                                    <span className="sub-title">Capped at $39 per order</span>
                                </div>
                            </div>
                        </div>
                        {/* single item */}
                        <div className="single-feture-col mb-md-30px mb-lm-30px">
                            <div className="single-feature">
                                <div className="feature-icon">
                                    <img src="https://template.hasthemes.com/hmart/hmart/assets/images/icons/2.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4 className="title">Card Payments</h4>
                                    <span className="sub-title">12 Months Installments</span>
                                </div>
                            </div>
                        </div>
                        {/* single item */}
                        <div className="single-feture-col">
                            <div className="single-feature">
                                <div className="feature-icon">
                                    <img src="https://template.hasthemes.com/hmart/hmart/assets/images/icons/3.png" alt="" />
                                </div>
                                <div className="feature-content">
                                    <h4 className="title">Easy Returns</h4>
                                    <span className="sub-title">Shop With Confidence</span>
                                </div>
                            </div>
                            {/* single item */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Feature Area End */}
            {/* Testimonial area start */}
            <div className="trstimonial-area pt-100px pb-100px">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title text-center m-0">
                                <h2 className="title">Client Feedback</h2>
                                <p>There are many variations of passages of Lorem Ipsum available</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {/* Swiper */}
                            <div className="swiper-container content-top slider-nav-style-1">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <div className="testi-inner">
                                            <div className="testi-content">
                                                <p>Lorem ipsum dolor sit amel adipiscing elit, sed do eiusll tempor incididunt ut laborj et dolore magna sed do eiusll tempor dolore.</p>
                                            </div>
                                            <div className="testi-author">
                                                <div className="author-image">
                                                    <img className="img-responsive" src="https://template.hasthemes.com/hmart/hmart/assets/images/testimonial/1.png" alt="" />
                                                </div>
                                                <div className="author-name">
                                                    <h4 className="name">Regan Rosen<span>Client</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="testi-inner">
                                            <div className="testi-content">
                                                <p>Lorem ipsum dolor sit amel adipiscing elit, sed do eiusll tempor incididunt ut laborj et dolore magna sed do eiusll tempor dolore.</p>
                                            </div>
                                            <div className="testi-author">
                                                <div className="author-image">
                                                    <img className="img-responsive" src="https://template.hasthemes.com/hmart/hmart/assets/images/testimonial/1.png" alt="" />
                                                </div>
                                                <div className="author-name">
                                                    <h4 className="name">Regan Rosen<span>Client</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="testi-inner">
                                            <div className="testi-content">
                                                <p>Lorem ipsum dolor sit amel adipiscing elit, sed do eiusll tempor incididunt ut laborj et dolore magna sed do eiusll tempor dolore.</p>
                                            </div>
                                            <div className="testi-author">
                                                <div className="author-image">
                                                    <img className="img-responsive" src="https://template.hasthemes.com/hmart/hmart/assets/images/testimonial/1.png" alt="" />
                                                </div>
                                                <div className="author-name">
                                                    <h4 className="name">Regan Rosen<span>Client</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="swiper-slide">
                                        <div className="testi-inner">
                                            <div className="testi-content">
                                                <p>Lorem ipsum dolor sit amel adipiscing elit, sed do eiusll tempor incididunt ut laborj et dolore magna sed do eiusll tempor dolore.</p>
                                            </div>
                                            <div className="testi-author">
                                                <div className="author-image">
                                                    <img className="img-responsive" src="https://template.hasthemes.com/hmart/hmart/assets/images/testimonial/1.png" alt="" />
                                                </div>
                                                <div className="author-name">
                                                    <h4 className="name">Regan Rosen<span>Client</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Add Arrows */}
                                <div className="swiper-buttons">
                                    <div className="swiper-button-next"></div>
                                    <div className="swiper-button-prev"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonial area end*/}
            {/* Область последних блог-постов */}
        <div className="main-blog-area pb-100px" style={{marginTop: '50px'}}>
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
                  <img src={post.imageLink} className="img-responsive w-100" style={{ width:'300px', height:'350px'}} alt="" />
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

export default About;
