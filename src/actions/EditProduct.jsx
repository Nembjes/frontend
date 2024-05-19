import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalImageInputs, setAdditionalImageInputs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
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
    const fetchAdditionalImages = async () => {
      try {
        const response = await fetch(`https://nodejska-1ae608a4fbbf.herokuapp.com/products/${id}/images`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setAdditionalImages(data);
        setAdditionalImageInputs(data.map(image => image.link));
      } catch (error) {
        console.error('Error fetching additional images:', error);
      }
    };

    fetchAdditionalImages();
  }, [id]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`https://nodejska-1ae608a4fbbf.herokuapp.com/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setName(data.name);
        setCategoryId(data.category_id);
        setBrandId(data.brand_id);
        setDescription(data.description);
        setCost(data.cost);
        setMainImage(data.mainImage);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const categoriesResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/category');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const brandsResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/brand');
        const brandsData = await brandsResponse.json();
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching categories and brands:', error);
      }
    };

    fetchCategoriesAndBrands();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleBrandChange = (e) => {
    setBrandId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCostChange = (e) => {
    setCost(e.target.value);
  };

  const handleMainImageChange = (e) => {
    setMainImage(e.target.value);
  };

  const handleAdditionalImageInputChange = (index, e) => {
    const newInputs = [...additionalImageInputs];
    newInputs[index] = e.target.value;
    setAdditionalImageInputs(newInputs);
  };

  const handleAddImageInput = () => {
    setAdditionalImageInputs([...additionalImageInputs, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nonEmptyAdditionalImages = additionalImageInputs.filter(link => link.trim() !== '');

    const productData = {
      name,
      category_id: categoryId,
      brand_id: brandId,
      description,
      cost,
      mainImage,
      additionalImages: nonEmptyAdditionalImages
    };

    try {
      const response = await fetch(`https://nodejska-1ae608a4fbbf.herokuapp.com/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        window.location.href = '/admin/products';
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="container mt-5">
      {userRole === 'admin' || userRole === 'client_manager' ? (
        <>
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" value={name} onChange={handleNameChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">Category</label>
              <select className="form-select" id="categoryId" value={categoryId} onChange={handleCategoryChange} required>
                <option value="">Select category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="brandId" className="form-label">Brand</label>
              <select className="form-select" id="brandId" value={brandId} onChange={handleBrandChange} required>
                <option value="">Select brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" value={description} onChange={handleDescriptionChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cost" className="form-label">Cost</label>
              <input type="number" className="form-control" id="cost" value={cost} onChange={handleCostChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="mainImage" className="form-label">Main Image</label>
              <input type="text" className="form-control" id="mainImage" value={mainImage} onChange={handleMainImageChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="additionalImages" className="form-label">Additional Images</label>
              {additionalImageInputs.map((link, index) => (
                <input key={index} type="text" className="form-control mb-2" value={link} onChange={(e) => handleAdditionalImageInputChange(index, e)} />
              ))}
              <button type="button" className="btn btn-secondary" onClick={handleAddImageInput}>Add Image</button>
            </div>
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </form>
        </>
      ) : (
        <p>You don't have permission to view this page.</p>
      )}
    </div>
  );
};

export default EditProduct;
