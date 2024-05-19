import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Blog from '../pages/Blog';
import BlogSingle from '../pages/BlogSingle';
import SingleProduct from '../pages/SingleProduct';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Thanks from '../pages/Thanks';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Admin from '../pages/AdminPanel';
import Brandlist from '../actions/Brandlist';
import AddBrand from '../actions/AddBrand';
import EditBrand from '../actions/EditBrand';
import CategoryList from '../actions/CategoryList';
import AddCategory from '../actions/AddCategory';
import EditCategory from '../actions/EditCategory';
import BlogList from '../actions/BlogList';
import AddBlog from '../actions/AddBlog';
import EditBlog from '../actions/EditBlog';
import ProductsList from '../actions/ProductsList';
import AddProduct from '../actions/AddProduct';
import EditProduct from '../actions/EditProduct';

// Функция для проверки авторизации
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Ваша логика проверки токена
    return token !== null; // Возвращаем true, если токен есть, иначе false
}

export default function Content() {
    return (
        <main className="flex-shrink-0">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/shop-left-sidebar" element={<Shop />} />
                    <Route path="/single-product/:id" element={<SingleProduct />} />

                    <Route path="/blog-single/:id" element={<BlogSingle />} />
                    <Route path="/blog-list" element={<Blog />} />

                    <Route path="/about" element={<About />} />

                    <Route path="/contact" element={<Contact />} />

                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />

                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/thanks" element={<Thanks />} />

                    <Route path="/login" element={ isAuthenticated() ? <Navigate to="/profile" /> : <Login /> } />
                    <Route path="/profile" element={ isAuthenticated() ? <Profile /> : <Navigate to="/login" /> } />

                    <Route path="/admin" element={ isAuthenticated() ? <Admin /> : <Navigate to="/login" /> } />

                    <Route path="/admin/brands" element={ isAuthenticated() ? <Brandlist /> : <Navigate to="/login" /> } />
                    <Route path="/admin/brands/add" element={ isAuthenticated() ? <AddBrand /> : <Navigate to="/login" /> } />
                    <Route path="/admin/brands/edit/:id" element={ isAuthenticated() ? <EditBrand /> : <Navigate to="/login" /> } />
                    <Route path="/admin/categories" element={ isAuthenticated() ? <CategoryList /> : <Navigate to="/login" /> } />
                    <Route path="/admin/categories/add" element={ isAuthenticated() ? <AddCategory /> : <Navigate to="/login" /> } />
                    <Route path="/admin/categories/edit/:id" element={ isAuthenticated() ? <EditCategory /> : <Navigate to="/login" /> } />
                    <Route path="/admin/blogs" element={ isAuthenticated() ? <BlogList /> : <Navigate to="/login" /> } />
                    <Route path="/admin/blogs/add" element={ isAuthenticated() ? <AddBlog /> : <Navigate to="/login" /> } />
                    <Route path="/admin/blogs/edit/:id" element={ isAuthenticated() ? <EditBlog /> : <Navigate to="/login" /> } />
                    <Route path="/admin/products" element={ isAuthenticated() ? <ProductsList /> : <Navigate to="/login" /> } />
                    <Route path="/admin/products/add" element={ isAuthenticated() ? <AddProduct /> : <Navigate to="/login" /> } />
                    <Route path="/admin/products/edit/:id" element={ isAuthenticated() ? <EditProduct /> : <Navigate to="/login" /> } />
                </Routes>
            </Router>
        </main>
    );
}
