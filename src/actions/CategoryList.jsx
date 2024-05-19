import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
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
    fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/category')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleDeleteCategory = (id) => {
    fetch(`https://nodejska-1ae608a4fbbf.herokuapp.com/category/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedCategories = categories.filter((category) => category.id !== id);
        setCategories(updatedCategories);
      })
      .catch((error) => console.error('Error deleting category:', error));
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <div className="mb-3">
            <Link to="/admin/categories/add" className="btn btn-primary">
              Add New Category
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>
                    <Link to={`/admin/categories/edit/${category.id}`} className="btn btn-warning me-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDeleteCategory(category.id)} className="btn btn-danger">
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

export default CategoryList;
