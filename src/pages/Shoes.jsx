import React, { useEffect } from 'react';
import '../App.css';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import demo from '../assets/demoShoes.png';
import AddCart from '../components/AddCart.jsx';


const products = [
  { id: 1, name: 'New Product 1', image: demo, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10 },
  { id: 2, name: 'New Product 2', image: demo, originalPrice: 179.99,  rating: 4.0, reviews: 8 },
  { id: 3, name: 'New Product 3', image: demo, originalPrice: 199.99, offerPrice: 149.99, rating: 4.8, reviews: 15 },
  { id: 4, name: 'New Product 4', image: demo, originalPrice: 199.99, rating: 4.8, reviews: 15 },
  // { id: 5, name: 'New Product 5', image: demo, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10 },
  // { id: 6, name: 'New Product 6', image: demo, originalPrice: 179.99,  rating: 4.0, reviews: 8 },
  // { id: 7, name: 'New Product 7', image: demo, originalPrice: 199.99, rating: 4.8, reviews: 15 },
  // { id: 8, name: 'New Product 8', image: demo, originalPrice: 199.99, offerPrice: 149.99, rating: 4.8, reviews: 15 },
  // Add more clothes as needed
];

const Shoes = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.clothing-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
      el.classList.add('slide-in');
    });
  }, []);
  const calculateDiscount = (originalPrice, offerPrice) => {
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  };

  return (
    <div className="">
        <Header/>
        <h1 className="text-4xl font-bold mb-8 text-center text-brown-900">Shoes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 m-4 ">

        {products.map((product) => (
            <div key={product.id} className="p-2 slide-in">
              <div className="p-4 rounded shadow-lg shadow-neutral-500 bg-gradient-to-t from-yellow-100 flex flex-col items-center">
                <div className="relative w-full h-56 ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover  rounded-lg"
                  />
                  {/* <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-sm font-bold">
                    New
                  </div> */}
                  {product.offerPrice ? (
                <>
            <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold">
              {calculateDiscount(product.originalPrice, product.offerPrice)}% OFF
            </div>
                </>
              ) : (
                  <></>
                )}
                </div>
                <h3 className="text-xl font-bold text-brown-900 mt-4">{product.name}</h3>
                <div className="flex items-center mt-2">
                  {product.offerPrice && (
                    <p className="text-slate-500 line-through mr-2">₹{product.originalPrice.toFixed(2)}</p>
                  )}
                  <p className="text-brown-900 font-bold">₹{product.offerPrice ? product.offerPrice : product.originalPrice}</p>
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-yellow-600 mr-2">{product.rating}★</p>
                  <p className="text-brown-700">({product.reviews} reviews)</p>
                </div>
                < AddCart product={products}/>
              </div>
            </div>
          ))}
      </div>
      <Footer/>
    </div>
  );
};

export default Shoes;
