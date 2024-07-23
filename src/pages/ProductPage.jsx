// src/pages/ProductDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import {products} from '../pages/Array.js';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto my-8 p-4">
        <div className="flex flex-col md:flex-row items-center">
          <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-lg shadow-lg" />
          <div className="mt-4 md:mt-0 md:ml-8">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl mt-2">${product.offerPrice || product.originalPrice}</p>
            <p className="mt-4">{product.description || 'No description available.'}</p>
            <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-yellow-500 hover:bg-yellow-600 rounded shadow-md transition-transform transform hover:-translate-y-1">
              Add to Cart
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
