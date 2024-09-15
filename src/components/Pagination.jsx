import React, { useState } from 'react';
import FilterSidebar from './FilterSideBar';

const Pagination = ({ totalProducts, onSortChange, onFilterChange }) => {
  const [activeSort, setActiveSort] = useState('popularity');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortOptions = [
    { label: 'Popularity', value: 'popularity' },
    { label: 'Price: Low to High', value: 'priceLowToHigh' },
    { label: 'Price: High to Low', value: 'priceHighToLow' },
    // { label: 'Newest First', value: 'newest' },
  ];

  const handleSortChange = (sort) => {
    setActiveSort(sort);
    if (onSortChange && typeof onSortChange === 'function') {
      onSortChange(sort);
    }
  };

  const toggleFilterPopup = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (filters) => {
    if (onFilterChange && typeof onFilterChange === 'function') {
      onFilterChange(filters);
    }
    setIsFilterOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-yellow-100 p-4 flex justify-between items-center">
      {/* Desktop Sort Buttons */}
      <div className="hidden lg:flex items-center space-x-4">
        <span className="font-bold text-brown-900">Sort By:</span>
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={`p-2 rounded text-brown-900 hover:text-yellow-500 ${
              activeSort === option.value ? 'bg-yellow-500' : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Mobile Sort Dropdown */}
      <div className="lg:hidden relative">
        <button
          className="p-2 rounded text-brown-900 bg-yellow-500 hover:text-yellow-500"
          onClick={toggleDropdown}
        >
          Sort By
        </button>
        {isDropdownOpen && (
          <div className="absolute top-10 -right-5 bg-yellow-100 shadow-lg p-2 rounded z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  handleSortChange(option.value);
                  setIsDropdownOpen(false); // Close dropdown after selection
                }}
                className={`block w-full text-left p-2 text-brown-900 hover:text-yellow-500 ${
                  activeSort === option.value ? 'bg-yellow-500' : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <span className="text-brown-900">
        {`Total ${totalProducts} products available.`}
      </span>

      <button
        className="lg:hidden p-2 text-brown-900 bg-yellow-500 rounded"
        onClick={toggleFilterPopup}
      >
        Filters
      </button>

      {isFilterOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-80 bg-yellow-100 p-4 shadow-md z-60">
            <button
              className="text-brown-900 p-2 mb-4"
              onClick={toggleFilterPopup}
            >
              X
            </button>
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Pagination;
