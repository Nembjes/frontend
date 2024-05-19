import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('https://nodejska-1ae608a4fbbf.herokuapp.com/blog');
                setBlogPosts(response.data);
            } catch (error) {
                console.error('Error fetching blog posts:', error);
            }
        };

        fetchBlogPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Breadcrumb Area Start */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Blog Page</h2>
              {/* Breadcrumb List Start */}
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Blog</li>
              </ul>
              {/* Breadcrumb List End */}
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Area End */}
            {/* Blog Area Start */}
            <div className="blog-list pb-100px pt-100px main-blog-page single-blog-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 ms-auto me-auto">
                            <div className="row">
                                {currentPosts.map(post => (
                                    <div key={post.id} className="col-12 mb-50px">
                                        <div className="single-blog">
                                            <div className="blog-image">
                                                <a href={post.imageLink}><img src={post.imageLink} className="img-responsive w-100" alt="" /></a>
                                            </div>
                                            <div className="blog-text">
                                                <div className="blog-athor-date line-height-1">
                                                    <span className="blog-date"><i className="fa fa-calendar" aria-hidden="true"></i> {format(parseISO(post.createdAt), 'dd MMM yyyy')}</span>
                                                    <span><a className="blog-author" href={`blog-single/${post.id}`}><i className="fa fa-user" aria-hidden="true"></i> {post.users.username}</a></span>
                                                </div>
                                                <h5 className="blog-heading"><a className="blog-heading-link" href={`blog-single/${post.id}`}>{post.title}</a></h5>
                                                <p>{post.text}</p>
                                                <a href={`blog-single/${post.id}`} className="btn btn-primary blog-btn"> Read More</a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/*  Pagination Area Start */}
                    <div className="pro-pagination-style text-center mt-0 mb-0" data-aos="fade-up" data-aos-delay="200">
                        <div className="pages">
                            <ul>
                                {Array.from({ length: Math.ceil(blogPosts.length / postsPerPage) }, (_, index) => (
                                    <li key={index} className={`li ${currentPage === index + 1 ? 'active' : ''}`}>
                                        <a className="page-link" onClick={() => paginate(index + 1)}>
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/*  Pagination Area End */}
                </div>
            </div>
            {/* Blog Area End */}
        </div>
    );
};

export default Blog;
