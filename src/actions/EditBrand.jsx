import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditBrand = () => {
  const { id } = useParams();
  const [brandName, setBrandName] = useState('');
  const [brand, setBrand] = useState(null);
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
    fetch(`http://localhost:5000/brand/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBrand(data);
        setBrandName(data.name);
      })
      .catch((error) => console.error('Error fetching brand:', error));
  }, [id]);

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/brand/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: brandName }),
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.href = '/admin/brands';
      })
      .catch((error) => console.error('Error updating brand:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Edit Brand</h2>
          {brand ? (
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

export default EditBrand;
