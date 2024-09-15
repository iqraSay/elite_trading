import React, { useState, useEffect, useCallback } from 'react';
import '../../App.css';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import ProductCard from '../../components/ProductCard.jsx';
import FilterSidebar from '../../components/FilterSideBar.jsx';
import Pagination from '../../components/Pagination.jsx';
import { firestore } from '../../Firebase'; // Import Firestore
import { collection, getDocs, query, where } from 'firebase/firestore';

const ProductDisplay = () => {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const productsCollection = collection(firestore, 'products');
      const q = category ? query(productsCollection, where('category', '==', category)) : productsCollection;
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFilteredProducts(productsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); // Include fetchProducts in the dependency array

  const categoryProducts = filteredProducts.filter((product) => product.category === category);
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);

  // Determine which products to show on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = categoryProducts.slice(startIndex, startIndex + productsPerPage);

  useEffect(() => {
    const elements = document.querySelectorAll('.clothing-item');
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`;
      el.classList.add('slide-in');
    });
  }, [filteredProducts, currentPage]);

  const handleSortChange = (sortOption) => {
    let sortedProducts = [...categoryProducts];

    switch (sortOption) {
      case 'popularity':
        sortedProducts = sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceLowToHigh':
        sortedProducts = sortedProducts.sort((a, b) => (a.offerPrice ?? a.originalPrice) - (b.offerPrice ?? b.originalPrice));
        break;
      case 'priceHighToLow':
        sortedProducts = sortedProducts.sort((a, b) => (b.offerPrice ?? b.originalPrice) - (a.offerPrice ?? a.originalPrice));
        break;
      // case 'newest':
      //   sortedProducts = sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming `date` field exists
      //   break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  const handleFilterChange = (filters) => {
    const filtered = filteredProducts.filter((product) => {
      const effectivePrice = product.offerPrice ?? product.originalPrice;
      const matchesPrice =
        (!filters.minPrice || effectivePrice >= filters.minPrice) &&
        (!filters.maxPrice || effectivePrice <= filters.maxPrice);
      const matchesSize = !filters.size || product.size === filters.size;
      const matchesColor = !filters.color || product.color?.toLowerCase().includes(filters.color.toLowerCase());
      const matchesMaterial = !filters.material || product.Material?.toLowerCase().includes(filters.material.toLowerCase());
      const matchesDiscount = !filters.discount || (product.originalPrice - product.offerPrice) / product.originalPrice * 100 >= parseInt(filters.discount);

      return matchesPrice && matchesSize && matchesColor && matchesMaterial && matchesDiscount;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

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
        totalProducts={categoryProducts.length}
      />
      <div className="flex">
        {/* Filter Sidebar */}
        <div className="w-1/4 hidden lg:block">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <h1 className="text-4xl font-bold mb-8 text-center text-brown-900">{category} Products</h1>
          {loading ? (
            <p className="text-center text-brown-900">Loading...</p>
          ) : currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
              {currentProducts.map((product) => (
                <Link to={`/product/${product.id}`} target="_blank" key={product.id}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-900">No products available.</p>
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

export default ProductDisplay;
