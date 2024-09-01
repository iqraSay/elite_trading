import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faBagShopping, faArrowLeft, faArrowRight, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import demo1 from '../assets/demoShirt.png';
import demo2 from '../assets/demoDress.png';
import demo3 from '../assets/demoShoes.png';
import demo4 from '../assets/demoAcc.png';

const products = [
  { id: 1, name: 'Product 1', image: demo1, originalPrice: 159.99, offerPrice: 129.99 },
  { id: 2, name: 'Product 2', image: demo2, originalPrice: 179.99 },
  { id: 3, name: 'Product 3', image: demo3, originalPrice: 199.99, offerPrice: 149.99},
//   { id: 4, name: 'Product 4', image: demo1, originalPrice: 219.99, offerPrice: 159.99},
  { id: 5, name: 'Product 5', image: demo4, originalPrice: 159.99},
  // Add more products as needed
];
// eddy_dzs ni.tesh64x
const Featured = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const handleAddToCart = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: 1,
    }));
  };

  const handleIncrement = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] + 1,
    }));
  };

  const handleDecrement = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const calculateDiscount = (originalPrice, offerPrice) => {
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="flex justify-center items-center bg-white md:py-10 lg:pt-40 lg:pb-40 w-full h-full  md:h-4/5 relative">
      <div className="bg-custom-gradient md:bg-custom-gradient-md  text-yellow-100 p-12 rounded-lg shadow-lg flex flex-col md:flex-row items-center w-full sm:w-4/5 md:w-3/4 lg:w-2/3 relative ">
        <div className="relative w-full md:w-1/2">
          <div className="absolute inset-0 bg-accent rounded-full -left-20 -top-20 w-112 h-112"></div>
          <img src={currentProduct.image} alt={currentProduct.name} className="relative z-10 mx-auto w-full h-[500px]  object-contain p-7" />
        </div>
        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10">
          <h2 className="md:text-3xl text-2xl font-bold text-yellow-500">FEATURED PRODUCTS</h2>
          <h3 className="md:text-2xl text-xl mt-4">Elite Trading Special Collection</h3>
          <h1 className="md:text-5xl text-3xl font-bold mt-4">{currentProduct.name}</h1>
          <div className="text-left font-thin text-lg flex space-x-5 my-3">
            {currentProduct.offerPrice ? (
              <>
                <div className="badge absolute top-2 right-2 bg-red-500 text-yellow-300 rounded-full px-2 py-1 text-lg font-bold">
                  {calculateDiscount(currentProduct.originalPrice, currentProduct.offerPrice)}% OFF
                </div>
                <p className="line-through text-slate-400">₹{currentProduct.originalPrice.toFixed(2)}</p>
                <p className="text-yellow-500 font-bold">₹{currentProduct.offerPrice.toFixed(2)}</p>
              </>
            ) : (
              <p>₹{currentProduct.originalPrice.toFixed(2)}<br /><br /></p>
            )}
          </div>
          {/* <div className="mt-6">
            <p className="text-xl">COLOR</p>
            <div className="flex space-x-4 mt-4">
              <span className="w-10 h-10 bg-yellow-500 rounded-full inline-block"></span>
              <span className="w-10 h-10 bg-white rounded-full inline-block"></span>
              <span className="w-10 h-10 bg-slate-500 rounded-full inline-block"></span>
            </div>
          </div> */}
          <div className="flex space-x-2 lg:space-x-6 mt-10 w-full">
            <button className="text-yellow-300 hover:text-yellow-500 lg:py-4 lg:px-8 font-bold flex items-center text-xl">
              <FontAwesomeIcon icon={faBagShopping} className="mr-3" />
              Buy Now
            </button>
            {cart[currentProduct.id] ? (
              <div className="flex items-center">
                <button onClick={() => handleDecrement(currentProduct.id)} className="text-yellow-300 hover:text-yellow-500 py-2 px-4 font-bold flex items-center text-xl">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="text-3xl font-bold mx-4">{cart[currentProduct.id]}</span>
                <button onClick={() => handleIncrement(currentProduct.id)} className="text-yellow-300 hover:text-yellow-500 py-2 px-4 font-bold flex items-center text-xl">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            ) : (
              <button onClick={() => handleAddToCart(currentProduct.id)} className="text-yellow-300 hover:text-yellow-500 py-4 px-8 font-bold flex items-center text-xl">
                <FontAwesomeIcon icon={faCartPlus} className="mr-3" />
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div>
      <button className="absolute left-0 bg-yellow-200 text-brown-900 text-bold  p-2 pl-3 pr-3 rounded-full" onClick={handlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className="absolute right-0 bg-yellow-200 text-brown-900 p-2 pl-3 pr-3 rounded-full" onClick={handleNext}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Featured;
