import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';
import { products } from '../pages/Array.js';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import emptyCart from '../assets/EmptyCart.png';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    const items = Object.keys(storedCartItems).map(id => {
      const product = products.find(p => p.id === id);
      if (product) {
        return { ...product, quantity: storedCartItems[id] };
      }
      return null;
    }).filter(item => item !== null);
    setCartItems(items);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);

    const updatedStorageItems = JSON.parse(localStorage.getItem('cartItems'));
    delete updatedStorageItems[id];
    localStorage.setItem('cartItems', JSON.stringify(updatedStorageItems));
  };

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);

    const updatedStorageItems = JSON.parse(localStorage.getItem('cartItems'));
    updatedStorageItems[id] += 1;
    localStorage.setItem('cartItems', JSON.stringify(updatedStorageItems));
  };

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    setCartItems(updatedCartItems);

    const updatedStorageItems = JSON.parse(localStorage.getItem('cartItems'));
    if (updatedStorageItems[id] > 1) {
      updatedStorageItems[id] -= 1;
    } else {
      delete updatedStorageItems[id];
    }
    localStorage.setItem('cartItems', JSON.stringify(updatedStorageItems));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.originalPrice, 0).toFixed(2);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl text-center font-bold mb-4">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-3/4">
              <table className="min-w-full  text-center overflow-x-auto">
                <thead>
                  <tr className="bg-secondary text-secondary-foreground">
                    <th className=" p-2">Product</th>
                    <th className=" p-2">Price</th>
                    <th className=" p-2">Quantity</th>
                    <th className=" p-2">Total</th>
                    <th className=" p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="fade-in">
                      <td className=" p-2 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-20 h-20 mr-4 hidden md:flex" />
                        <div>
                          <p className="font-bold">{item.name}</p>
                        </div>
                      </td>
                      <td className=" p-2">₹{item.originalPrice.toFixed(2)}</td>
                      <td className=" p-2 flex items-center justify-center  absolute">
                        <button onClick={() => handleDecrement(item.id)} className="px-2 hover:bg-transparent lg:top-7 relative lg:ml-14">-</button>
                        <span className="mx-2 lg:top-7 relative">{item.quantity}</span>
                        <button onClick={() => handleIncrement(item.id)} className="px-2 hover:bg-transparent lg:top-7 relative ">+</button>
                      </td>
                      <td className=" p-2">₹{(item.originalPrice * item.quantity).toFixed(2)}</td>
                      <td className=" p-2">
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:bg-transparent">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-between">
                <button className="bg-brown-900 text-yellow-200 py-2 px-4 rounded hover:bg-yellow-500 hover:text-brown-900" onClick={handleClearCart}>Clear Cart</button>
            </div>
            </div>
            <div className="w-full lg:w-1/4 p-4 bg-white shadow-lg rounded-lg mt-4 lg:mt-0">
              <h2 className="text-2xl font-bold mb-4">Summary</h2>
              <ul className='justify-between'>
                {cartItems.map(item => (
                  <li key={item.id} className="mb-2 flex justify-between">
                    <span>{item.name}:</span>
                    <span> ₹{(item.originalPrice * item.quantity).toFixed(2)}</span>
                    
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between">
                <span>SUBTOTAL</span>
                <span>₹{subtotal}</span>
              </div>
              <Link to={"/checkout"}>
              <button className="w-full bg-brown-900 text-yellow-200 py-2 rounded mt-4 hover:bg-yellow-500 hover:text-brown-900 ">Check Out</button></Link>
            </div>
          </div>
        ) : (
          <div className='md:h-[55vh] h-[60vh]'>
            <img src={emptyCart} alt="empty cart" className='md:w-1/5 md:h-1/2 w-[150px] mr-auto ml-auto' />
          <p className="text-center font-bold text-3xl">Your cart is empty.</p>
          <p className="text-center text-2xl">Looks like you haven't added anythign to your cart. Go ahead and explore top categories</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
