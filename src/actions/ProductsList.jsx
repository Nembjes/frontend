import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
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
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        // Update the product list after successful deletion
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Product List</h2>
          <Link to="/admin/products/add" className="btn btn-primary mb-3">Add Product</Link>
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card">
                  <img
                    src={product.mainImage}
                    className="card-img-top"
                    alt={product.name}
                    style={{ width: '100%', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Cost: {product.cost}</p>
                    <Link to={`/admin/products/edit/${product.id}`} className="btn btn-primary mr-2">Edit</Link>
                    <button className="btn btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default ProductsList;
