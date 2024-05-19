import React, { useState, useEffect } from 'react';

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
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

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: categoryName }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/admin/categories';
        } else {
          console.error('Failed to add category');
        }
      })
      .catch((error) => console.error('Error adding category:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Add a New Category</h2>
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
              Add Category
            </button>
          </form>
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default AddCategory;
