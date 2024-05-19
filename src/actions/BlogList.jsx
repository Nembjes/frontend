import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/me', {
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
    fetch('http://localhost:5000/blog')
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error('Error fetching blog posts:', error));
  }, []);

  const handleDeleteBlogPost = (id) => {
    fetch(`http://localhost:5000/blog/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedBlogPosts = blogPosts.filter((post) => post.id !== id);
        setBlogPosts(updatedBlogPosts);
      })
      .catch((error) => console.error('Error deleting blog post:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <div className="mb-3">
            <Link to="/admin/blogs/add" className="btn btn-primary">
              Add New Blog Post
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((post) => (
                <tr key={post.id}>
                  <th scope="row">{post.id}</th>
                  <td>{post.title}</td>
                  <td>
                    <Link to={`/admin/blogs/edit/${post.id}`} className="btn btn-warning me-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDeleteBlogPost(post.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default BlogList;
