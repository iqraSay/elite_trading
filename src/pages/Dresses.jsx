import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import ProductCard from '../components/ProductCard.jsx';
import FilterSidebar from '../components/FilterSideBar.jsx';
import { products } from './Array.js';

const Dresses = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const elements = document.querySelectorAll('.clothing-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
      el.classList.add('slide-in');
    });
  }, [filteredProducts]);

  const handleFilterChange = (filters) => {
    const filtered = products.filter((product) => {
      const effectivePrice = product.offerPrice ?? product.originalPrice;
      const matchesPrice = (!filters.minPrice || effectivePrice >= filters.minPrice) && (!filters.maxPrice || effectivePrice <= filters.maxPrice);
      const matchesSize = !filters.size || product.size === filters.size;
      const matchesColor = !filters.color || product.color?.toLowerCase().includes(filters.color.toLowerCase());
      const matchesFabricType = !filters.fabricType || product.fabricType?.toLowerCase().includes(filters.fabricType.toLowerCase());
      const matchesDiscount = !filters.discount || (product.originalPrice - product.offerPrice) / product.originalPrice * 100 >= parseInt(filters.discount);

      return matchesPrice && matchesSize && matchesColor && matchesFabricType && matchesDiscount;
    });

    setFilteredProducts(filtered);
  };

  return (
    <div className="">
      <Header />
      <div className="flex">
        {/* Filter Sidebar */}
        <div className="w-1/4 hidden lg:block">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-8 text-center text-brown-900">Women's Dresses</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
            {filteredProducts.map((product) =>
              product.category === 'Dress' ? (
                <Link to={`/product/${product.id}`} target="_blank" key={product.id}>
                  <ProductCard product={product} />
                </Link>
              ) : null
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dresses;
