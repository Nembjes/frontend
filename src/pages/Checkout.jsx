import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';
import { SiAsda } from 'react-icons/si';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    // Функция для получения информации о пользователе
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/users/me', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        const { email } = userData;
        setBillingDetails((prevDetails) => ({
          ...prevDetails,
          email
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleBillingDetailsChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      console.log(`Начало оформления заказа `);
      // Генерация случайных чисел для checknum и ordersnum
      const checkNum = Math.floor(Math.random() * 1000000).toString();
      const orderNum = Math.floor(Math.random() * 1000000).toString();
  
      // Создание кастомера
      console.log('Создание кастомера');
      const customerResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${billingDetails.firstName} ${billingDetails.lastName}`,
          phone: billingDetails.phone,
          email: billingDetails.email,
          address: billingDetails.streetAddress,
          city_id: selectedCity,
        }),
      });
  
      if (!customerResponse.ok) {
        throw new Error(`Ошибка при создании кастомера: ${customerResponse.statusText}`);
      }
  
      const customerData = await customerResponse.json();


      const customerId = customerData.id;


      // Создание заказа
      console.log(`Создание заказа`);
      const orderResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNum: orderNum,
          customer_id: customerId,
          date: new Date(),
          status_id: 1, // Установите соответствующий статус
        }),
      });
  
      if (!orderResponse.ok) {
        throw new Error(`Ошибка при создании заказа: ${orderResponse.statusText}`);
      }
  
      // Создание ордердетаилс
      for (const item of cartItems) {
        console.log(`Создание orderdetails ${item.quantity}`);
        const orderDetailsResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/orderdetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderNum: orderNum,
            prod_code: item.id, // Используйте соответствующий атрибут товара
            productQuantity: item.quantity,
          }),
        });
  
        if (!orderDetailsResponse.ok) {
          throw new Error(`Ошибка при создании деталей заказа: ${orderDetailsResponse.statusText}`);
        }
      }
  
      // Создание пейментс
      const paymentResponse = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: customerId,
          checkNum: checkNum,
          payment: new Date(),
          amount: cartItems.reduce((total, item) => total + item.cost * item.quantity, 0),
        }),
      });
  
      if (!paymentResponse.ok) {
        throw new Error(`Ошибка при создании платежа: ${paymentResponse.statusText}`);
      }
  
      // Очистка корзины
      // (Добавьте соответствующий код для очистки корзины)
  
      // Дополнительные действия, если необходимо
      // (Добавьте свой код в зависимости от потребностей)
  
      setPurchaseSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Произошла ошибка при оформлении заказа:', error);
    }
  };
  

  useEffect(() => {
    // Функция для получения списка городов с сервера
    const fetchCities = async () => {
      try {
        const response = await fetch('https://nodejska-1ae608a4fbbf.herokuapp.com/city');
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    // Вызовем функцию получения городов
    fetchCities();
  }, []); // Пустой массив означает, что useEffect сработает только при монтировании компонента


  return (
    <>
          {/* Breadcrumb Area */}
          <div className="breadcrumb-area" style={{ backgroundImage: `url(https://template.hasthemes.com/hmart/hmart/assets/images/about/breadcrunb-bg.webp)` }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 text-center">
              <h2 className="breadcrumb-title">Checkout</h2>
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active">Checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    <div className="checkout-area pt-100px pb-100px">
      <div className="container">
      {purchaseSuccess && (
        <div style={{ textAlign: 'center', color: 'green', fontSize: '72px', marginBottom: '150px' }}>
          Successful purchase!
        </div>
      )}
        <div className="row">
        <div className="col-lg-7">
                        <div className="billing-info-wrap">
                            <h3>Billing Details</h3>
                            <div className="row">
                            <div className="col-lg-6 col-md-6">
  <div className="billing-info mb-4">
    <label>First Name</label>
    <input type="text" name="firstName" value={billingDetails.firstName} onChange={handleBillingDetailsChange} />
  </div>
</div>
<div className="col-lg-6 col-md-6">
  <div className="billing-info mb-4">
    <label>Last Name</label>
    <input type="text" name="lastName" value={billingDetails.lastName} onChange={handleBillingDetailsChange} />
  </div>
</div>
<div className="col-lg-12">
  <div className="billing-select mb-4">
    <label>City</label>
    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
      <option>Select a city</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}> {/* Используем id города */}
          {city.name}
        </option>
      ))}
    </select>
  </div>
</div>
<div className="col-lg-12">
  <div className="billing-info mb-4">
    <label>Street Address</label>
    <input className="billing-address" name="streetAddress" placeholder="House number and street name" type="text" value={billingDetails.streetAddress} onChange={handleBillingDetailsChange} />
  </div>
</div>
<div className="col-lg-6 col-md-6">
  <div className="billing-info mb-4">
    <label>Phone</label>
    <input type="text" name="phone" value={billingDetails.phone} onChange={handleBillingDetailsChange} />
  </div>
</div>
<div className="col-lg-6 col-md-6">
  <div className="billing-info mb-4">
    <label>Email Address</label>
    <input type="text" name="email" value={billingDetails.email} onChange={handleBillingDetailsChange} />
  </div>
</div>
                            </div>
                        </div>
          </div>
          <div className="col-lg-5 mt-md-30px mt-lm-30px">
            <div className="your-order-area">
              <h3>Your order</h3>
              <div className="your-order-wrap gray-bg-4">
                <div className="your-order-product-info">
                  <div className="your-order-top">
                    <ul>
                      <li>Product</li>
                      <li>Total</li>
                    </ul>
                  </div>
                  <div className="your-order-middle">
                    <ul>
                      {cartItems.map((item) => (
                        <li key={item.id}>
                          <span className="order-middle-left">{item.name} X {item.quantity}</span>{' '}
                          <span className="order-price">${item.cost * item.quantity} </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="your-order-bottom">
                    <ul>
                      <li className="your-order-shipping">Shipping</li>
                      <li>Free shipping</li>
                    </ul>
                  </div>
                  <div className="your-order-total">
                    <ul>
                      <li className="order-total">Total</li>
                      <li>${cartItems.reduce((total, item) => total + item.cost * item.quantity, 0)}</li>
                    </ul>
                  </div>
                </div>
                <div className="payment-method">
                  {/* ... (остальной код) */}
                </div>
              </div>
              {cartItems.length > 0 ? (
  <div className="Place-order mt-25">
    <a className="btn-hover" href="#" onClick={handlePlaceOrder}>
      Place Order
    </a>
  </div>
) : (
  <div className="Place-order mt-25">
    <button className="btn-disabled" disabled title="Your cart is empty">
      Place Order<br></br>
      *Your cart is empty*
    </button>
  </div>
)}

            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Checkout;
