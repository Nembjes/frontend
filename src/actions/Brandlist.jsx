import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
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
    fetch('http://localhost:5000/brand')
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error('Error fetching brands:', error));
  }, []);

  const handleDeleteBrand = (id) => {
    fetch(`http://localhost:5000/brand/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedBrands = brands.filter((brand) => brand.id !== id);
        setBrands(updatedBrands);
      })
      .catch((error) => console.error('Error deleting brand:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <div className="mb-3">
            <Link to="/admin/brands/add" className="btn btn-primary">
              Add New Brand
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Brand Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <th scope="row">{brand.id}</th>
                  <td>{brand.name}</td>
                  <td>
                    <Link to={`/admin/brands/edit/${brand.id}`} className="btn btn-warning me-2">
                      Edit
                    </Link>
                    <button className="btn btn-danger" onClick={() => handleDeleteBrand(brand.id)}>
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

export default BrandList;
