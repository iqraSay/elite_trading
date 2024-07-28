import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddCart = ({ product }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
    return savedCart;
  });

  const handleAddToCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart, [id]: (prevCart[id] || 0) + 1 };
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleIncrement = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart, [id]: prevCart[id] + 1 };
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else {
        delete updatedCart[id];
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div className="flex mt-4">
      {cart[product.id] ? (
        <div className="flex items-center">
          <button
            onClick={() => handleDecrement(product.id)}
            className="bg-brown-900 hover:bg-yellow-500 text-yellow-200 hover:text-brown-900 py-2 px-4 rounded-full font-bold flex items-center"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span className="text-3xl font-bold mx-4">{cart[product.id]}</span>
          <button
            onClick={() => handleIncrement(product.id)}
            className="bg-brown-900 hover:bg-yellow-500 text-yellow-200 hover:text-brown-900 py-2 px-4 rounded-full font-bold flex items-center"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => handleAddToCart(product.id)}
          className="bg-brown-900 hover:bg-yellow-500 text-yellow-200 hover:text-brown-900 py-2 px-4 rounded-full font-bold flex items-center"
        >
          <FontAwesomeIcon icon={faCartPlus} className="mr-3" />
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddCart;
