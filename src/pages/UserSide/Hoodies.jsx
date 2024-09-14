import React, { useState, useEffect } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import ProductCard from '../../components/ProductCard.jsx';
import FilterSidebar from '../../components/FilterSideBar.jsx';
import Pagination from '../../components/Pagination.jsx';
import { products } from '../Array.js';

const Hoodies = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalProds = filteredProducts.filter((product) => product.category === 'Hoodie').length;

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.filter((product) => product.category === 'Hoodie').length / productsPerPage);

  // Determine which products to show on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts
    .filter((product) => product.category === 'Hoodie')
    .slice(startIndex, startIndex + productsPerPage);

  useEffect(() => {
    const elements = document.querySelectorAll('.clothing-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
      el.classList.add('slide-in');
    });
  }, [filteredProducts, currentPage]);

  const handleSortChange = (sortOption) => {
    let sortedProducts = [...filteredProducts];

    switch (sortOption) {
      case 'popularity':
        sortedProducts = sortedProducts.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'priceLowToHigh':
        sortedProducts = sortedProducts.sort((a, b) => (a.offerPrice ?? a.originalPrice) - (b.offerPrice ?? b.originalPrice));
        break;
      case 'priceHighToLow':
        sortedProducts = sortedProducts.sort((a, b) => (b.offerPrice ?? b.originalPrice) - (a.offerPrice ?? a.originalPrice));
        break;
      case 'newest':
        sortedProducts = sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming `date` field exists
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  const handleFilterChange = (filters) => {
    const filtered = products.filter((product) => {
      const effectivePrice = product.offerPrice ?? product.originalPrice;
      const matchesPrice =
        (!filters.minPrice || effectivePrice >= filters.minPrice) &&
        (!filters.maxPrice || effectivePrice <= filters.maxPrice);
      const matchesSize = !filters.size || product.size === filters.size;
      const matchesColor = !filters.color || product.color?.toLowerCase().includes(filters.color.toLowerCase());
      const matchesFabricType = !filters.fabricType || product.fabricType?.toLowerCase().includes(filters.fabricType.toLowerCase());
      const matchesDiscount = !filters.discount || (product.originalPrice - product.offerPrice) / product.originalPrice * 100 >= parseInt(filters.discount);

      return matchesPrice && matchesSize && matchesColor && matchesFabricType && matchesDiscount;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="">
      <Header />
      <Pagination
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        totalProducts={totalProds}
      />
      <div className="flex">
        {/* Filter Sidebar */}
        <div className="w-1/4 hidden lg:block">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-8 text-center text-brown-900">Men's Hoodies</h1>
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
              {currentProducts.map((product) => (
                <Link to={`/product/${product.id}`} target="_blank" key={product.id}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-900">No hoodies available.</p>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 bg-yellow-500 text-brown-900 rounded ${currentPage === 1 ? 'opacity-50' : 'hover:bg-yellow-600'}`}
            >
              Previous
            </button>
            <span className="text-brown-900">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 bg-yellow-500 text-brown-900 rounded ${currentPage === totalPages ? 'opacity-50' : 'hover:bg-yellow-600'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hoodies;
