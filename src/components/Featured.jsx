import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { products } from '../pages/Array';
import '../App.css';
import AddCart from './AddCart.jsx';
import { getAuth } from 'firebase/auth';

const getRandomProducts = (num) => {
  const shuffled = products.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const Featured = () => {
  const [user, setUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProducts, setCurrentProducts] = useState(getRandomProducts(5));
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % currentProducts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentProducts]);

  const unsubscribe = auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  const handleBuyNow = () => {
    localStorage.setItem('selectedProduct', JSON.stringify(currentProduct));
    navigate('/checkout'); 
  };

  const handleSeeDetails = () => {
    navigate(`/product/${currentProduct.id}`);
  };

  const handleClick = () => {
    if (user) {
        handleBuyNow();
    } else {
        navigate('/login');
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % currentProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + currentProducts.length) % currentProducts.length);
  };

  const currentProduct = currentProducts[currentIndex];

  return (
    <div className="flex justify-center items-center bg-white md:py-10 lg:pt-40 lg:pb-40 w-full h-full md:h-4/5 relative">
      <div className="bg-gradient-to-br from-yellow-200 to-red-700 text-yellow-100 p-12 rounded-lg shadow-lg flex flex-col md:flex-row items-center w-full sm:w-4/5 md:w-3/4 lg:w-2/3 relative ">
        <div className="relative w-full md:w-1/2">
          <img src={currentProduct.image} alt={currentProduct.name} className="relative z-10 mx-auto w-full h-[500px] object-contain rounded-lg p-7" />
        </div>
        <div className="w-full md:w-1/2 mt-10 md:mt-0 md:ml-10">
          <h2 className="md:text-3xl text-2xl font-bold text-yellow-500">FEATURED PRODUCTS</h2>
          <h1 className="md:text-5xl text-3xl font-bold mt-4">{currentProduct.name}</h1>
          <div className="text-left font-thin text-lg flex space-x-5 my-3">
            {currentProduct.offerPrice ? (
              <>
                <div className="badge absolute top-2 right-2 bg-red-500 text-yellow-300 rounded-full px-2 py-1 text-lg font-bold">
                  {Math.round(((currentProduct.originalPrice - currentProduct.offerPrice) / currentProduct.originalPrice) * 100)}% OFF
                </div>
                <p className="line-through text-slate-400">₹{currentProduct.originalPrice.toFixed(2)}</p>
                <p className="text-yellow-500 font-bold">₹{currentProduct.offerPrice.toFixed(2)}</p>
              </>
            ) : (
              <p>₹{currentProduct.originalPrice.toFixed(2)}<br /><br /></p>
            )}
          </div>
          <div className="flex space-x-2 lg:space-x-6 mt-10 w-full">
            <button onClick={handleClick} className="bg-brown-900 hover:text-brown-900 hover:bg-yellow-500 text-yellow-200 py-2 px-4 rounded-full font-bold flex items-center mt-4">
              <FontAwesomeIcon icon={faBagShopping} className="mr-3" />
              BUY NOW
            </button>
            <AddCart product={currentProduct} />
            <button onClick={handleSeeDetails} className="bg-brown-900 hover:text-brown-900 hover:bg-yellow-500 text-yellow-200 py-2 px-4 rounded-full font-bold flex items-center mt-4">
              See Details
            </button>
          </div>

          {/* See Details Button */}
          <div className="mt-4">
          </div>
        </div>
      </div>
      <button className="absolute left-0 bg-yellow-200 text-brown-900 text-bold p-2 pl-3 pr-3 rounded-full" onClick={handlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button className="absolute right-0 bg-yellow-200 text-brown-900 p-2 pl-3 pr-3 rounded-full" onClick={handleNext}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
  );
};

export default Featured;
