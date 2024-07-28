import React, { useEffect } from 'react';
import '../App.css';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import demo from '../assets/demoAcc.png';
import ProductCard from '../components/ProductCard.jsx';

const products = [
    { id: 1, name: 'New Product 1', image: demo, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10 },
    { id: 2, name: 'New Product 2', image: demo, originalPrice: 179.99,  rating: 4.0, reviews: 8 },
    { id: 3, name: 'New Product 3', image: demo, originalPrice: 199.99, offerPrice: 149.99, rating: 4.8, reviews: 15 },
    { id: 4, name: 'New Product 4', image: demo, originalPrice: 199.99, rating: 4.8, reviews: 15 },
    // { id: 5, name: 'New Product 5', image: demo, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10 },
    // { id: 6, name: 'New Product 6', image: demo, originalPrice: 179.99,  rating: 4.0, reviews: 8 },
    // { id: 7, name: 'New Product 7', image: demo, originalPrice: 199.99, rating: 4.8, reviews: 15 },
    // { id: 8, name: 'New Product 8', image: demo, originalPrice: 199.99, offerPrice: 149.99, rating: 4.8, reviews: 15 },
    // Add more new arrivals as needed
];

const Accessories = () => {
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
        <h1 className="text-4xl font-bold mb-8 text-center text-brown-900">Accessories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-4 ">
      {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Accessories;
