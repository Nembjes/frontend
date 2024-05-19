import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';
import { AiOutlineSmallDash } from 'react-icons/ai';

const BlogSingle = ({ match }) => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`https://nodejska-1ae608a4fbbf.herokuapp.com/blog/${id}`);
                const data = await response.json();
                setBlogData(data);
            } catch (error) {
                console.error('Error fetching blog data:', error);
            }
        };

        fetchBlogData();
    }, [id]);

    if (!blogData) {
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
              <h2 className="breadcrumb-title">Single Blog Page</h2>
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
            {/* Back to Blog List Button */}
            <div className="container mt-3">
                <Link to="/blog-list" className="btn-alert btn-alert">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i> Back to Blog List
                </Link>
            </div>
            {/* Blog Area Start */}
            <div className="blog-grid pb-100px pt-100px main-blog-page single-blog-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 offset-lg-2">
                            <div className="blog-posts">
                                <div className="single-blog-post blog-grid-post">
                                    <div className="blog-image single-blog">
                                        <img className="img-fluid h-auto border-radius-10px" src={blogData.imageLink} alt="blog" style={{width: '500px', height: '200px'}} />
                                    </div>
                                    <div className="blog-post-content-inner mt-30px">
                                        <div className="blog-athor-date">
                                        <span className="blog-date"><i className="fa fa-calendar" aria-hidden="true"></i> {format(parseISO(blogData.createdAt), 'dd MMM yyyy')}</span>
                                            <span><a className="blog-author" href=""><i className="fa fa-user" aria-hidden="true"></i> {blogData.users.username}</a></span>
                                        </div>
                                        <h4 className="blog-title">{blogData.title}</h4>
                                        <p data-aos="fade-up">
                                            {blogData.text}
                                        </p>
                                        {/* Другие поля блога, если они есть */}
                                    </div>
                                    {/* Дополнительные блоги */}
                                </div>
                                {/* Теги и кнопки для социальных сетей */}
                            </div>
                            {/* Навигация между блогами */}
                            {/* Комментарии */}
                            {/* Форма комментариев */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Blag Area End */}
        </div>
    );
};

export default BlogSingle;
