import React, { useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import demo from '../assets/demoShirt.png';
import ProductCard from '../components/ProductCard.jsx';
import {products} from '../pages/Array.js';


const MensClothing = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.clothing-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
      el.classList.add('slide-in');
    });
  }, []);

  return (
    <div className="">
        <Header/>
      <h1 className="text-4xl font-bold mb-8 text-center text-brown-900">Men's Clothing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-4 ">
      {products.map((product) => (
        (product.category === 'Shirt'? <ProductCard key={product.id} product={product} />: <></>)
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default MensClothing;
