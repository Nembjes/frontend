import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditCategory = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [category, setCategory] = useState(null);
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
    fetch(`http://localhost:5000/category/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        setCategoryName(data.name);
      })
      .catch((error) => console.error('Error fetching category:', error));
  }, [id]);

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: categoryName }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/admin/categories';
      })
      .catch((error) => console.error('Error updating category:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Edit Category</h2>
          {category ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="categoryName"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
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

export default EditCategory;
