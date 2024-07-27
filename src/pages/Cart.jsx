import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../App.css';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Retrieve cart items from local storage or state management
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="container ">
        <Header />
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="flex">
          <div className="w-2/3">
            <div className="bg-yellow-100 p-4 rounded-lg shadow-lg">
              <TransitionGroup>
                {cartItems.map((item, index) => (
                  <CSSTransition key={index} timeout={300} classNames="fade">
                    <div className="flex justify-between items-center mb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16" />
                      <div className="flex-1 ml-4">
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p className="text-sm">Color: {item.color}</p>
                        <p className="text-sm">Weight: {item.weight}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg">{item.price} x {item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="bg-red-500 text-white p-2 rounded-full"
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          </div>
          <div className="w-1/3 bg-yellow-100 p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Summary</h3>
            <div className="mb-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>{calculateTotal()}</span>
            </div>
            <Link
              to="/checkout"
              className="block bg-yellow-500 text-white text-center p-2 mt-4 rounded"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Cart;
