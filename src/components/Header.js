import React, { useState, useEffect, useRef } from 'react';
import Content from './Content';
import OffcanvasCart from './OffcanvasCart';
import OffcanvasWishlist from './OffcanvasWishlist';
import { useCart } from './CartContext';
import { useWishlist } from './WishlistContext';
import { Button, Dropdown } from 'react-bootstrap';

const Header = () => {
   const { cartItems } = useCart();
   const { wishlistItems } = useWishlist();
   const isAuthenticated = !!window.localStorage.getItem('token');

   const [isCartOpen, setIsCartOpen] = useState(false);
   const [isWishlistOpen, setIsWishlistOpen] = useState(false);

   const [searchTerm, setSearchTerm] = useState('');
   const [products, setProducts] = useState([]);
   const [userRole, setUserRole] = useState(null);
   const [showDropdown, setShowDropdown] = useState(false);
   const dropdownRef = useRef(null);

   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
         ) {
            setShowDropdown(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            if (isAuthenticated) {
               const response = await fetch(
                  'https://nodejska-1ae608a4fbbf.herokuapp.com/users/me',
                  {
                     headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                           'token'
                        )}`,
                     },
                  }
               );
               const userData = await response.json();
               setUserRole(userData.role);
            } else {
               setUserRole(null); // Если пользователь не аутентифицирован, устанавливаем userRole в null
            }
         } catch (error) {
            console.error('Error fetching user data:', error);
         }
      };
     

      fetchUserData();
   }, []);

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/products/');
            const data = await response.json();
            setProducts(data);
         } catch (error) {
            console.error('Error fetching products:', error);
         }
      };

      fetchProducts();
   }, []);

   const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const openCart = () => {
      setIsCartOpen(true);
      setIsWishlistOpen(false);
   };

   const closeCart = () => {
      setIsCartOpen(false);
   };

   const openWishlist = () => {
      setIsWishlistOpen(true);
      setIsCartOpen(false);
   };

   const closeWishlist = () => {
      setIsWishlistOpen(false);
   };

   const handleSearchSubmit = (e) => {
      e.preventDefault();
      if (filteredProducts.length > 0) {
         const firstProduct = filteredProducts[0];
         window.location.href = `/single-product/${firstProduct.id}`;
      }
   };

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   return (
      <>
         <header>
            {/* Header top area start */}
            <div className="header-top">
               <div className="container">
                  <div className="row justify-content-between align-items-center">
                     <div className="col">
                        <div className="welcome-text">
                           <p>Best shop in the world</p>
                        </div>
                     </div>
                     <div className="col d-none d-lg-block">
                        <div className="top-nav">
                           <ul>
                              <li>
                                 <a href="tel:0123456789">
                                    <i className="fa fa-phone"></i> +372 5555
                                    5556
                                 </a>
                              </li>
                              <li>
                                 <a href="mailto:demo@example.com">
                                    <i className="fa fa-envelope"></i>{' '}
                                    elshop@store.com
                                 </a>
                              </li>
                              {isAuthenticated ? (
                                 // Если пользователь аутентифицирован, перенаправляем на /profile
                                 <li>
                                    <a href="/profile">
                                       <i className="fa fa-user"></i> Account
                                    </a>
                                 </li>
                              ) : (
                                 // Если пользователь не аутентифицирован, перенаправляем на /login
                                 <li>
                                    <a href="/login">
                                       <i className="fa fa-user"></i> Account
                                    </a>
                                 </li>
                              )}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Header top area end */}
            <div className="header-bottom d-none d-lg-block">
               <div className="container">
                  <div className="row justify-content-between align-items-center">
                     <div className="col-lg-3 col">
                        <div className="header-logo">
                           <a href="/">
                              <img
                                 src="/images/logo/logo.png"
                                 alt="Site Logo"
                              />
                           </a>
                        </div>
                     </div>
                     <div className="col-lg-6 d-none d-lg-block">
                        <div className="search-element">
                           <form onSubmit={handleSearchSubmit}>
                              <div style={{ position: 'relative' }}>
                                 <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => {
                                       setSearchTerm(e.target.value);
                                       setShowDropdown(true);
                                       setShowDropdown(e.target.value !== '');
                                    }}
                                 />
                                 {/* Добавляем список с продуктами */}
                                 {showDropdown && (
                                    <div
                                       ref={dropdownRef}
                                       style={{
                                          position: 'absolute',
                                          top: 'calc(100% + 5px)', // Добавляем небольшое отступ после инпута
                                          left: 0,
                                          width: '100%',
                                          backgroundColor: '#fff',
                                          border: '1px solid #ccc',
                                          borderRadius: '4px',
                                          padding: '5px 0',
                                          zIndex: 999, // Устанавливаем zIndex, чтобы список был поверх других элементов
                                       }}
                                    >
                                       {filteredProducts.map((product) => (
                                          <div
                                             key={product.id}
                                             onClick={() => {
                                                setSearchTerm(product.name);
                                                setShowDropdown(false); // Закрываем список при выборе продукта
                                             }}
                                             style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                padding: '5px 10px',
                                                borderBottom: '1px solid #eee', // Добавляем линию для разделения продуктов
                                                cursor: 'pointer',
                                             }}
                                          >
                                             <img
                                                src={product.mainImage}
                                                alt=""
                                                style={{
                                                   width: '50px',
                                                   marginRight: '10px',
                                                }}
                                             />
                                             {product.name}
                                          </div>
                                       ))}
                                    </div>
                                 )}
                              </div>
                              <button type="submit">
                                 <i className="pe-7s-search"></i>
                              </button>
                           </form>
                        </div>
                     </div>
                     <div className="col-lg-3 col">
                        <div className="header-actions">
                           <a
                              href="#offcanvas-wishlist"
                              className="header-action-btn offcanvas-toggle"
                              onClick={openWishlist}
                           >
                              <i className="pe-7s-like"></i>
                              <span className="header-action-num">
                                 {wishlistItems.length}
                              </span>
                           </a>
                           <a
                              href="#offcanvas-cart"
                              className="header-action-btn header-action-btn-cart offcanvas-toggle pr-0"
                              onClick={openCart}
                           >
                              <i className="pe-7s-shopbag"></i>
                              <span className="header-action-num">
                                 {cartItems.length}
                              </span>
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Header action area end */}
            {/* Header action area start */}
            <div className="header-bottom d-lg-none sticky-nav style-1">
               <div className="container">
                  <div className="row justify-content-between align-items-center">
                     <div className="col-lg-3 col">
                        <div className="header-logo">
                           <a href="/">
                              <img
                                 src="/images/logo/logo.png"
                                 alt="Site Logo"
                              />
                           </a>
                        </div>
                     </div>
                     <div className="col-lg-3 col">
                     <div className="header-actions">
                           <a
                              href="#offcanvas-wishlist"
                              className="header-action-btn offcanvas-toggle"
                              onClick={openWishlist}
                           >
                              <i className="pe-7s-like"></i>
                              <span className="header-action-num">
                                 {wishlistItems.length}
                              </span>
                           </a>
                           <a
                              href="#offcanvas-cart"
                              className="header-action-btn header-action-btn-cart offcanvas-toggle pr-0"
                              onClick={openCart}
                           >
                              <i className="pe-7s-shopbag"></i>
                              <span className="header-action-num">
                                 {cartItems.length}
                              </span>
                           </a>
                           <Button
            variant="outline-primary" // Добавляем границу и цвет текста
            className="d-lg-none"
            onClick={toggleMobileMenu}
         >
            <i className={`pe-7s-menu ${isMobileMenuOpen ? 'open' : ''}`}></i>
         </Button>

         {/* Мобильное меню */}
         {isMobileMenuOpen && (
            <div className="mobile-menu d-lg-none">
               <ul>
                  <li>
                     <Button variant="link" href="/">Home</Button>
                  </li>
                  <li>
                     <Button variant="link" href="/about">About</Button>
                  </li>
                  <li>
                     <Button variant="link" href="/shop-left-sidebar">Shop</Button>
                  </li>
                  <li>
                     <Button variant="link" href="/blog-list">Blog</Button>
                  </li>
                  <li>
                     <Button variant="link" href="/contact">Contact</Button>
                  </li>
                  {/* Добавляем элемент для аккаунта */}
                  <li>
                     <Dropdown>
                        <Dropdown.Toggle variant="link" id="dropdown-basic">
                           Account
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                           {/* В зависимости от статуса аутентификации пользователя показываем разные ссылки */}
                           {isAuthenticated ? (
                              <Dropdown.Item href="/profile">
                                 Profile
                              </Dropdown.Item>
                           ) : (
                              <Dropdown.Item href="/login">
                                 Login
                              </Dropdown.Item>
                           )}
                        </Dropdown.Menu>
                     </Dropdown>
                  </li>
               </ul>
            </div>
         )}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Header action area end */}
            {/* header navigation area start */}
            <div className="header-nav-area d-none d-lg-block sticky-nav">
               <div className="container">
                  <div className="header-nav">
                     <div className="main-menu position-relative">
                        <ul>
                           <li className="dropdown">
                              <a href="/">Home</a>
                           </li>
                           <li>
                              <a href="/about">About</a>
                           </li>
                           <li>
                              <a href="/shop-left-sidebar">Shop</a>
                           </li>
                           <li>
                              <a href="/blog-list">Blog</a>
                           </li>
                           <li>
                              <a href="/contact">Contact</a>
                           </li>
                           {(userRole === 'admin' ||
                              userRole === 'client_manager') && (
                              <li>
                                 <a href="/admin">Admin</a>
                              </li>
                           )}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            {/* header navigation area end */}
         </header>
         <Content />
         <OffcanvasCart isOpen={isCartOpen} closeOffcanvas={closeCart} />
         <OffcanvasWishlist
            isOpen={isWishlistOpen}
            closeOffcanvas={closeWishlist}
         />
      </>
   );
};

export default Header;
