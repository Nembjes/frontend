import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const [blogTitle, setBlogTitle] = useState('');
  const [blogText, setBlogText] = useState('');
  const [blogImageLink, setBlogImageLink] = useState('');
  const [blogPost, setBlogPost] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetch(`https://nodejska-1ae608a4fbbf.herokuapp.com/blog/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlogPost(data);
        setBlogTitle(data.title);
        setBlogText(data.text);
        setBlogImageLink(data.imageLink);
      })
      .catch((error) => console.error('Error fetching blog post:', error));
  }, [id]);

  const handleBlogTitleChange = (e) => {
    setBlogTitle(e.target.value);
  };

  const handleBlogTextChange = (e) => {
    setBlogText(e.target.value);
  };

  const handleBlogImageLinkChange = (e) => {
    setBlogImageLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://nodejska-1ae608a4fbbf.herokuapp.com/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: blogTitle, text: blogText, imageLink: blogImageLink }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/admin/blogs';
      })
      .catch((error) => console.error('Error updating blog post:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Edit Blog Post</h2>
          {blogPost ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="blogTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="blogTitle"
                  value={blogTitle}
                  onChange={handleBlogTitleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="blogText" className="form-label">
                  Text
                </label>
                <textarea
                  className="form-control"
                  id="blogText"
                  rows="5"
                  value={blogText}
                  onChange={handleBlogTextChange}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="blogImageLink" className="form-label">
                  Image Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="blogImageLink"
                  value={blogImageLink}
                  onChange={handleBlogImageLinkChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          ) : (
            <p>Loading...</p>
          )}
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default EditBlog;
