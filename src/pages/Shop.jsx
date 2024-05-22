import React, { useState, useEffect } from 'react';
import ProductButtons from '../components/ProductButtons';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [sortOrder, setSortOrder] = useState('default');
  const productsPerPage = 12;

  

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const categoriesResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/category');
        const brandsResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/brand');

        if (!categoriesResponse.ok || !brandsResponse.ok) {
          throw new Error('Failed to fetch sidebar data');
        }

        const categoriesData = await categoriesResponse.json();
        const brandsData = await brandsResponse.json();

        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    fetchSidebarData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/products/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? 'All' : category);
    setSelectedBrand('All');
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand === selectedBrand ? 'All' : brand);
    setSelectedCategory('All');
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPriceRange({ ...priceRange, [name]: parseFloat(value) });
  };

  const filteredProducts = products.filter(product => {
    const categoryFilter = selectedCategory === 'All' || product.category.name === selectedCategory;
    const brandFilter = selectedBrand === 'All' || product.brand.name === selectedBrand;
    const priceFilter = product.cost >= priceRange.min && product.cost <= priceRange.max;
    return categoryFilter && brandFilter && priceFilter;
  });

  const sortedProducts = (() => {
    switch (sortOrder) {
      case 'nameAsc':
        return filteredProducts.slice().sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return filteredProducts.slice().sort((a, b) => b.name.localeCompare(a.name));
      case 'priceAsc':
        return filteredProducts.slice().sort((a, b) => a.cost - b.cost);
      case 'priceDesc':
        return filteredProducts.slice().sort((a, b) => b.cost - a.cost);
      default:
        return filteredProducts;
    }
  })();

  const totalProducts = filteredProducts.length;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const currentProductsScore = currentProducts.length;


  return (
    <>
      {/* Breadcrumb Area Start */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Product Page</h2>
              {/* Breadcrumb List Start */}
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Shop</li>
              </ul>
              {/* Breadcrumb List End */}
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Area End */}
      
      {/* <!-- Shop Page Start  --> */}
        <div className="shop-category-area pt-100px pb-100px">
            <div className="container">
                <div className="row">
                    <div className="col-lg-9 order-lg-last col-md-12 order-md-first">
                        {/* <!-- Shop Top Area Start --> */}
                        <div className="shop-top-bar d-flex">
                            <p className="compare-product"> <span>{currentProductsScore}</span> Product Found of <span>{totalProducts}</span></p>
                            {/* <!-- Left Side End --> */}
                            <div className="shop-tab nav">
                                <button className="active" data-bs-target="#shop-grid" data-bs-toggle="tab">
                                    <i className="fa fa-th" aria-hidden="true"></i>
                                </button>
                            </div>
                            {/* <!-- Right Side Start --> */}
                            <div className="select-shoing-wrap d-flex align-items-center">
                                <div className="shot-product">
                                    <p>Sort By:</p>
                                </div>
                                {/* <!-- Single Wedge End --> */}
                                <div className="header-bottom-set dropdown">
                                <button className="dropdown-toggle header-action-btn" data-bs-toggle="dropdown">
              {sortOrder === 'default' ? 'Default' : `Sort By ${sortOrder}`}
              <i className="fa fa-angle-down"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-right">
            <li><a className="dropdown-item" onClick={() => setSortOrder('default')}>Default</a></li>
              <li><a className="dropdown-item" onClick={() => setSortOrder('nameAsc')}>Name, A to Z</a></li>
              <li><a className="dropdown-item" onClick={() => setSortOrder('nameDesc')}>Name, Z to A</a></li>
              <li><a className="dropdown-item" onClick={() => setSortOrder('priceAsc')}>Price, low to high</a></li>
              <li><a className="dropdown-item" onClick={() => setSortOrder('priceDesc')}>Price, high to low</a></li>
            </ul>
                                </div>
                                {/* <!-- Single Wedge Start --> */}
                            </div>
                            {/* <!-- Right Side End --> */}
                        </div>
                        {/* <!-- Shop Top Area End --> */}
                        {/* <!-- Shop Bottom Area Start --> */}
                        <div className="shop-bottom-area">
                            {/* Tab Content Area Start */}
                <div className="row mb-n-30px">
                  {currentProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-30px">
                      {/* Single Prodect */}
                      <div className="product">
                        <span className="badges"></span>
                        <div className="thumb">
                          <a href={`single-product/${product.id}`} className="image">
                            <img src={`${product.mainImage}`} alt="Product" style={{ width:'100%', height:'200px'}}  />
                            <img className="hover-image" src={`${product.mainImage}`} style={{ width:'90%', height:'200px'}} alt="Product" />
                          </a>
                        </div>
                        <div className="content">
                          <h5 className="title">
                            <a href={`single-product/${product.id}`}>{product.name}</a>
                          </h5>
                          <span className="price">
                            <span className="new">${Number(product.cost).toFixed(2)}</span>
                          </span>
                        </div>
                        <div className="actions">
                        <ProductButtons productId={product.id} />
  </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Tab Content Area End */}
                             {/* Pagination Area Start */}
      <div className="pro-pagination-style text-center text-lg-end" data-aos="fade-up" data-aos-delay="200">
        <div className="pages">
          <ul>
            <li className="li">
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fa fa-angle-left"></i>
              </button>
            </li>
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
              <li key={index} className="li">
                <button
                  className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="li">
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
              >
                <i className="fa fa-angle-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Pagination Area End */}
                        </div>
                        {/* <!-- Shop Bottom Area End --> */}
                    </div>
                    {/* <!-- Sidebar Area Start --> */}
                    <div className="col-lg-3 order-lg-first col-md-12 order-md-last">
      <div className="shop-sidebar-wrap">
        <div className="sidebar-widget">
          <h4 className="sidebar-title">Categories</h4>
          <div className="sidebar-widget-category">
            <ul>
              <li>
                <button className={selectedCategory === 'All' ? 'selected' : ''} onClick={() => handleCategoryChange('All')}>
                  All
                </button>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <button className={selectedCategory === category.name ? 'selected' : ''} onClick={() => handleCategoryChange(category.name)}>
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebar-widget">
          <h4 className="sidebar-title">Brands</h4>
          <div className="sidebar-widget-brand">
            <ul>
              <li>
                <button className={selectedBrand === 'All' ? 'selected' : ''} onClick={() => handleBrandChange('All')}>
                  All
                </button>
              </li>
              {brands.filter(brand =>
                products.some(product =>
                  product.brand.name === brand.name && (selectedCategory === 'All' || product.category.name === selectedCategory)
                )
              ).map((brand) => (
                <li key={brand.id}>
                  <button className={selectedBrand === brand.name ? 'selected' : ''} onClick={() => handleBrandChange(brand.name)}>
                    {brand.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="sidebar-widget">
          <h4 className="sidebar-title">Price Range</h4>
          <div className="sidebar-widget-price">
            <input
              type="number"
              name="min"
              value={priceRange.min}
              onChange={handlePriceChange}
              placeholder="Min"
              style={{ width: '30%', marginRight: '5%' }}
            />
            <span>-</span>
            <input
              type="number"
              name="max"
              value={priceRange.max}
              onChange={handlePriceChange}
              placeholder="Max"
              style={{ width: '50%', marginLeft: '5%' }}
            />
          </div>
        </div>
      </div>
    </div>
                </div>
            </div>
        </div>
        {/* <!-- Shop Page End  --> */}
    </>
  );
};

export default ShopPage;
