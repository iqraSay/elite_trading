import React from 'react';
import AddCart from './AddCart';

const ProductCard = ({ product }) => {
  const calculateDiscount = (originalPrice, offerPrice) => {
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  };

  return (
    <div className="p-2 slide-in">
      <div className="p-4 rounded shadow-lg shadow-neutral-500 bg-gradient-to-t from-yellow-100 flex flex-col items-center">
        <div className="relative w-full h-56 ">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-sm font-bold">
            New
          </div> */}
          {product.offerPrice ? (
            <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold">
              {calculateDiscount(product.originalPrice, product.offerPrice)}% OFF
            </div>
          ) : null}
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
        <AddCart product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
