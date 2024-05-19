// login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users/login', loginDetails);
      console.log(response.data);
      window.localStorage.setItem('token', response.data.token);
      navigate('/profile');
      window.location.reload();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const [registerDetails, setRegisterDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confPassword: '',
  });

  const handleRegisterChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { firstname, lastname, email, password, confPassword } = registerDetails;
      if (password !== confPassword) {
        return console.error('Password and Confirm Password do not match');
      }

      const username = `${firstname} ${lastname}`;

      const response = await axios.post('http://localhost:5000/users/register', {
        email,
        username,
        password,
        confPassword, // Добавляем confPassword
      });
      console.log(response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <>
    <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
    <div className="container">
      <div className="row align-items-center justify-content-center">
        <div className="col-12 text-center">
          <h2 className="breadcrumb-title">Login</h2>
          <ul className="breadcrumb-list">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active">Login & Register</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
    <div className="login-register-area pt-100px pb-100px">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 col-md-12 ml-auto mr-auto">
            <div className="login-register-wrapper">
              <div className="login-register-tab-list nav">
                <a className="active" data-bs-toggle="tab" href="#lg1">
                  <h4>Login</h4>
                </a>
                <a data-bs-toggle="tab" href="#lg2">
                  <h4>Register</h4>
                </a>
              </div>
              <div className="tab-content">
                <div id="lg1" className="tab-pane active">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form onSubmit={handleLoginSubmit}>
                        <input type="email" name="email" placeholder="Email" onChange={handleLoginChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleLoginChange} />
                        <div className="button-box">
                          <button type="submit"><span>Login</span></button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div id="lg2" className="tab-pane">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form onSubmit={handleRegisterSubmit}>
                        <input type="text" name="firstname" placeholder="First Name" onChange={handleRegisterChange} />
                        <input type="text" name="lastname" placeholder="Last Name" onChange={handleRegisterChange} />
                        <input type="email" name="email" placeholder="Email" onChange={handleRegisterChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleRegisterChange} />
                        <input type="password" name="confPassword" placeholder="Confirm Password" onChange={handleRegisterChange} />
                        <div className="button-box">
                          <button type="submit"><span>Register</span></button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {registrationSuccess && (
            <div className="registration-success-message">
              Registration successful! You can now log in.
            </div>
          )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
