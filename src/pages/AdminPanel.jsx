import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user data including role from your server.
    // Replace 'http://localhost:5000/users/me' with your actual endpoint.
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUserRole(data.role); // Assuming the role is returned in the server response.
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Manage Categories</h5>
                  <p className="card-text">Manage product categories</p>
                  <Link to="/admin/categories" className="btn btn-primary">
                    Go
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Manage Brands</h5>
                  <p className="card-text">Manage product brands</p>
                  <Link to="/admin/brands" className="btn btn-primary">
                    Go
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Manage Products</h5>
                  <p className="card-text">Manage products in the store</p>
                  <Link to="/admin/products" className="btn btn-primary">
                    Go
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Manage Blogs</h5>
                  <p className="card-text">Manage blog posts</p>
                  <Link to="/admin/blogs" className="btn btn-primary">
                    Go
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default AdminPanel;
