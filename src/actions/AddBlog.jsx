import React, { useState, useEffect } from 'react';

const AddBlog = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogText, setBlogText] = useState('');
  const [blogImageLink, setBlogImageLink] = useState('');
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

  const handleBlogTitleChange = (e) => {
    setBlogTitle(e.target.value);
  };

  const handleBlogTextChange = (e) => {
    setBlogText(e.target.value);
  };

  const handleBlogImageLinkChange = (e) => {
    setBlogImageLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: blogTitle, text: blogText, imageLink: blogImageLink, userId : 3 }),
      });
      if (response.ok) {
        window.location.href = '/admin/blogs';
      } else {
        console.error('Failed to add blog post');
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
    }
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Add a New Blog Post</h2>
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
              Add Post
            </button>
          </form>
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default AddBlog;
