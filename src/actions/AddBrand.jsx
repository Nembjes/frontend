import React, { useEffect, useState } from 'react';

const AddBrand = () => {
  const [brandName, setBrandName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Get user data, including role, from your server.
    // Replace 'http://localhost:5000/users/me' with your actual endpoint.
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUserRole(data.role); // Assumes role is provided in the server response.
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use your API to send data to the server
    fetch('http://localhost:5000/brand', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: brandName }),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/admin/brands';
        } else {
          console.error('Failed to add brand');
        }
      })
      .catch((error) => console.error('Error adding brand:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Add a New Brand</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Brand Name
              </label>
              <input
                type="text"
                className="form-control"
                id="brandName"
                value={brandName}
                onChange={handleBrandNameChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Brand
            </button>
          </form>
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default AddBrand;
