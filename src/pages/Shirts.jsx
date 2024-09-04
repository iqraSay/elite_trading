import React, { useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import {products} from './Array.js';


const Shirts = () => {
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
      <h1 className="text-4xl font-bold mb-8 text-center text-brown-900">Men's Shirts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-4 ">
      {products.map((product) => (
        (product.category === 'Shirt'? <Link to={`/product/${product.id}`} target="_blank"><ProductCard key={product.id} product={product} /></Link>: <></>)
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Shirts;
