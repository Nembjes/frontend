// Footer.js
import React from 'react';


const Footer = () => {
  const isAuthenticated = !!window.localStorage.getItem('token');
  return (
    <div className="footer-area">
      <div className="footer-container">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              {/* Start single blog */}
              <div className="col-md-6 col-lg-3 mb-md-30px mb-lm-30px">
                <div className="single-wedge">
                  <div className="footer-logo">
                    <a href="/">
                      <img src="/images/logo/logo.png" alt="logo" />
                    </a>
                  </div>
                  <p className="about-text">Lorem ipsum dolor sit amet consl adipisi elit, sed do eiusmod templ incididunt ut labore</p>
                  <ul className="link-follow">
                    <li>
                      <a className="m-0" title="Twitter" target="_blank" rel="noopener noreferrer" href="/">
                        <i className="fa fa-facebook" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a title="Tumblr" target="_blank" rel="noopener noreferrer" href="/">
                        <i className="fa fa-tumblr" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a title="Facebook" target="_blank" rel="noopener noreferrer" href="/">
                        <i className="fa fa-twitter" aria-hidden="true"></i>
                      </a>
                    </li>
                    <li>
                      <a title="Instagram" target="_blank" rel="noopener noreferrer" href="/">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* End single blog */}
              {/* Start single blog */}
              <div className="col-md-6 col-lg-3 col-sm-6 mb-lm-30px pl-lg-60px">
                <div className="single-wedge">
                  <h4 className="footer-herading">Services</h4>
                  <div className="footer-links">
                    <div className="footer-row">
                      <ul className="align-items-center">
                        <li className="li">
                          <a className="single-link" href="contact">
                            Contact
                          </a>
                        </li>
                        <li className="li">
                          <a className="single-link" href="shop-left-sidebar">
                            Shop
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* End single blog */}
              {/* Start single blog */}
              <div className="col-md-6 col-lg-3 col-sm-6 mb-lm-30px pl-lg-40px">
                <div className="single-wedge">
                  <h4 className="footer-herading">My Account</h4>
                  <div className="footer-links">
                    <div className="footer-row">
                      <ul className="align-items-center">
                      {isAuthenticated ? (
          // Если пользователь аутентифицирован, перенаправляем на /profile
          <li>
            <a className="single-link" href="/profile">My account
            </a>
          </li>
        ) : (
          // Если пользователь не аутентифицирован, перенаправляем на /login
          <li>
            <a className="single-link" href="/login">My account
            </a>
          </li>
        )}
                        <li className="li">
                          <a className="single-link" href="cart">
                            Shopping cart
                          </a>
                        </li>
                        <li className="li">
                          <a className="single-link" href="login">
                            Services Login
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              {/* End single blog */}
              {/* Start single blog */}
              <div className="col-md-6 col-lg-3 col-sm-12">
                <div className="single-wedge">
                  <h4 className="footer-herading">Contact Info</h4>
                  <div className="footer-links">
                    <p className="address">Address: Tallinn, Punane tee 56.</p>
                    <p className="phone">
                      Phone/Fax:
                      <a href="tel:0123456789"> 555555555</a>
                    </p>
                    <p className="mail">
                      Email:
                      <a href="mailto:demo@example.com"> elshop@store.com</a>
                    </p>
                    <p className="mail">
                      <a href="https://demo@example.com"> elshop@store.com</a>
                    </p>
                  </div>
                </div>
              </div>
              {/* End single blog */}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="line-shape-top line-height-1">
              <div className="row flex-md-row-reverse align-items-center">
                <div className="col-md-8 text-center text-md-start">
                  <p className="copy-text">
                    © 2023 <strong>Elshop</strong> Made with <i className="fa fa-heart" aria-hidden="true"></i> By
                    <strong> Artjom Makarov JKTV22 </strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
