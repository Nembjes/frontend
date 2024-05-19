import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [activeButton, setActiveButton] = useState(null); // Добавляем состояние для отслеживания активной кнопки

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://nodejska-1ae608a4fbbf.herokuapp.com/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get(`https://nodejska-1ae608a4fbbf.herokuapp.com/orders/purchasehistory/${userData.email}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        setPurchaseHistory(response.data);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    if (userData) {
      fetchPurchaseHistory();
    }
  }, [userData]);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get('https://nodejska-1ae608a4fbbf.herokuapp.com/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        // Фильтрация статусов заказов по адресу электронной почты пользователя
        const userOrders = response.data.filter(order => order.customers.email === userData.email);

        setOrderStatus(userOrders);
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, [userData]);

  const handleLogout = () => {
    // Удаляем токен из локального хранилища
    localStorage.removeItem('token');
    // Перенаправляем пользователя на страницу входа
    window.location.href = '/login';
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleOrderClick = (orderNum) => {
    setExpandedOrder(expandedOrder === orderNum ? null : orderNum);
};

  return (
    <>
      {/* Breadcrumb Area */}
      <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Profile</h2>
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Profile</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-4">
            {/* Кнопки слева */}
            <div className="list-group">
              <button className={`list-group-item list-group-item-action${activeButton === 'Profile' ? ' active' : ''}`} onClick={() => handleButtonClick('Profile')}>Profile</button>
              <button className={`list-group-item list-group-item-action${activeButton === 'Purchase Story' ? ' active' : ''}`} onClick={() => handleButtonClick('Purchase Story')}>Purchase Story</button>
              <button className={`list-group-item list-group-item-action${activeButton === 'Track Order' ? ' active' : ''}`} onClick={() => handleButtonClick('Track Order')}>Track Order</button>
              <button className="list-group-item list-group-item-action" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="col-md-8">
            {/* Информация о пользователе и заказах справа */}
            {activeButton === 'Profile' && userData && (
              <div>
                <h2>{userData.username}'s Profile</h2>
                <p>Email: {userData.email}</p>
                <p>Registration Date: {new Date(userData.createdAt).toLocaleDateString()}</p>
                {/* Дополнительные данные о пользователе, которые у вас есть в базе данных */}
              </div>
            )}

            {/* Отображение истории покупок пользователя */}
            {activeButton === 'Purchase Story' && purchaseHistory.length > 0 && (
              <div>
              <h3 className="mt-4">Purchase History</h3>
              <ul className="list-group">
                  {purchaseHistory.map((order) => (
                      <li key={order.orderNum} className="list-group-item">
                          <strong onClick={() => handleOrderClick(order.orderNum)}>Order {order.orderNum}</strong>
                          {expandedOrder === order.orderNum && (
                              <ul style={{ listStyle: 'none', padding: 0 }}>
                                  {order.orderdetails.map((detail, index) => (
                                      <li key={detail.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', borderBottom: index !== order.orderdetails.length - 1 ? '1px solid #ccc' : 'none', paddingBottom: index !== order.orderdetails.length - 1 ? '10px' : 0 }}>
                                          {/* Ссылка на изображение товара */}
                                          <a href={`/single-product/${detail.products.id}`} style={{ marginRight: '10px' }}>
                                              <img src={detail.products.mainImage} alt={detail.products.name} style={{ width: '50px', height: 'auto' }} />
                                          </a>
                                          {/* Ссылка на название товара */}
                                          <div>
                                              <a href={`/single-product/${detail.products.id}`}>{detail.products.name}</a><br />
                                              ${detail.products.cost} - Quantity: {detail.productQuantity}
                                          </div>
                                      </li>
                                  ))}
                              </ul>
                          )}</li>
                  ))}
              </ul>
          </div>
          

          
            )}

            {/* Отображение статуса заказов пользователя */}
            {activeButton === 'Track Order' && orderStatus.length > 0 && (
              <div>
                <h3 className="mt-4">Order Status</h3>
                <ul className="list-group">
                  {orderStatus.map((order) => (
                    <li key={order.id} className="list-group-item">
                      <strong>Order {order.orderNum}</strong> - {order.status.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
