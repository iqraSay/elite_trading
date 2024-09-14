// FilterSidebar.jsx
import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [fabricType, setFabricType] = useState('');
  const [discount, setDiscount] = useState('');


  const handleFilterChange = () => {
    onFilterChange({ minPrice, maxPrice, size, color, fabricType, discount });
  };

  return (
    <div className="lg:block">
     
      <div className= "bg-yellow-100 p-4 rounded-lg shadow-md text-brown-900">
        <h2 className="text-2xl font-bold mb-4">Filters</h2>

        {/* Price Range Filter */}
        <div className="mb-4">
          <label>Price Range:</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 border border-brown-900 rounded"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 border border-brown-900 rounded"
            />
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-4">
          <label>Size:</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 border border-brown-900 rounded"
          >
            <option value="">All</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            <option value="XL">Extra Large</option>
          </select>
        </div>

        {/* Color Filter */}
        <div className="mb-4">
          <label>Color:</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full p-2 border border-brown-900 rounded"
          />
        </div>

        {/* Fabric Type Filter */}
        <div className="mb-4">
          <label>Fabric Type:</label>
          <input
            type="text"
            value={fabricType}
            onChange={(e) => setFabricType(e.target.value)}
            className="w-full p-2 border border-brown-900 rounded"
          />
        </div>

        {/* Discount Filter */}
        <div className="mb-4">
          <label>Discount (Min %):</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full p-2 border border-brown-900 rounded"
          />
        </div>

        <button
          onClick={handleFilterChange}
          className="bg-brown-900 text-yellow-500 hover:text-brown-900 p-2 rounded hover:bg-yellow-500"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
