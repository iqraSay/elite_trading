import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    return savedWishlist;
  });

  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems')) || {};
    return savedCart;
  });

  const navigate = useNavigate();

  // Load wishlist items from localStorage on component mount
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    setWishlist(storedWishlist);
  }, []);

  // Function to remove an item from wishlist
  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
  };

  // Function to add an item from wishlist to the cart
  const handleAddToCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart, [id]: (prevCart[id] || 0) + 1 };
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
    // Remove from wishlist after adding to cart
    handleRemoveFromWishlist(id);
  };

  // If wishlist is empty, show a message
  if (wishlist.length === 0) {
    return (
      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <p>Your wishlist is currently empty!</p>
        <button
          className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Wishlist</h2>
      <div className="mb-4">
        <button
          className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="w-1/6 px-4 py-2">Product Image</th>
            <th className="w-2/6 px-4 py-2">Product Name</th>
            <th className="w-1/6 px-4 py-2">Price</th>
            <th className="w-1/6 px-4 py-2">Add to Cart</th>
            <th className="w-1/6 px-4 py-2">Remove</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              </td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
