// src/pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate,useParams, Link } from 'react-router-dom';
import { products } from '../Array.js';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import SizeChart from '../../components/SizeChart.jsx';
import AddCart from '../../components/AddCart.jsx';
import { auth } from '../../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1Wave, faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductPage = () => {
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate(); 
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);
  const [mainImage, setMainImage] = useState(product.image);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);


  if (!product) {
    return <div>Product not found</div>;
  }
  const handleBuyNow = () => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    navigate('/checkout'); 
  };

  const handleClick = () => {
    if (user) {
      handleBuyNow();
    } else {
      navigate('/login');
    }
  };


  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const toggleSizeChart = () => {
    setShowSizeChart(!showSizeChart);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col items-center mx-auto my-8 p-4 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row w-full bg-background rounded-lg shadow-md">
          <div className="flex flex-col items-center md:w-1/2 p-4">
            <div className="flex space-x-4">
              <div className="flex flex-col space-y-2">
                <img
                  src={product.image}
                  alt="Thumbnail 1"
                  className={`cursor-pointer border-2 ${mainImage === product.image ? 'border-yellow-500' : 'border-zinc-300'} h-20 w-20 rounded`}
                  onClick={() => handleImageClick(product.image)}
                />
                <img
                  src={product.imageB}
                  alt="Thumbnail 2"
                  className={`cursor-pointer border-2 ${mainImage === product.imageB ? 'border-yellow-500' : 'border-zinc-300'} h-20 w-20 rounded`}
                  onClick={() => handleImageClick(product.imageB)}
                />
              </div>
              <div className="relative">
                <img src={mainImage} alt="Product Main" className="w-full h-auto rounded-lg" />
                <button onClick={toggleWishlist} className={`absolute top-2 right-2 hover:bg-transparent text-${isWishlisted ? 'red-600' : 'slate-400'}`}>
                  <FontAwesomeIcon icon={faHeart} size="2x" />
                </button>
            <h2 className="text-2xl font-semibold text-center">{product.name}</h2>
            <div className="flex space-x-4 mt-2">
              <AddCart product={product} />
              <button onClick={handleClick} className="bg-brown-900 hover:text-brown-900 hover:bg-yellow-500 text-yellow-200 py-2 px-4 rounded-full font-bold flex items-center mt-4">
                <FontAwesomeIcon icon={faMoneyBill1Wave} className="mr-3" />
                BUY NOW
              </button>
            </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center md:w-1/2 p-4">
            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
              <p className="text-lg text-muted-foreground">{product.description || 'No description available.'}</p>
              <div className="mt-4">
                {product.offerPrice ? (
                  <div className="flex items-center mt-2">
                    <span className="text-2xl font-bold text-primary">₹{product.offerPrice}</span>
                    <span className="text-lg line-through text-muted-foreground ml-2">₹{product.originalPrice}</span>
                  </div>
                ) : (
                  <div className="flex items-center mt-2">
                    <span className="text-lg ml-2">₹{product.originalPrice}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center mt-4">
                <span className="text-lg text-muted-foreground">{product.rating}⭐</span>
                <span className="text-muted-foreground ml-2">
                  {product.reviews} ratings and {Math.floor(product.reviews / 2)} reviews
                </span>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-primary">Color</h2>
                <div className="flex space-x-2 mt-2">
                  {/* Example color links, adjust as needed */}
                  <Link to={`/product/1`} className="w-20 h-20 border-2 border-primary rounded-lg">
                    <img className="w-full h-full rounded-lg" src="/path/to/image1.jpg" alt="Color option 1" />
                  </Link>
                  <Link to={`/product/2`} className="w-20 h-20 border-2 border-zinc-300 rounded-lg hover:border-primary">
                    <img className="w-full h-full rounded-lg" src="/path/to/image2.jpg" alt="Color option 2" />
                  </Link>
                  <Link to={`/product/3`} className="w-20 h-20 border-2 border-zinc-300 rounded-lg hover:border-primary">
                    <img className="w-full h-full rounded-lg" src="/path/to/image3.jpg" alt="Color option 3" />
                  </Link>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-primary">Size</h2>
                <div className="flex space-x-2 mt-2">
                  <button className="bg-secondary hover:bg-transparent text-secondary-foreground px-4 py-2 rounded-lg">S</button>
                  <button className="bg-secondary hover:bg-transparent text-secondary-foreground px-4 py-2 rounded-lg">M</button>
                  <button className="bg-secondary hover:bg-transparent text-secondary-foreground px-4 py-2 rounded-lg">L</button>
                  <button className="bg-secondary hover:bg-transparent text-secondary-foreground px-4 py-2 rounded-lg">XL</button>
                  <button className="bg-secondary hover:bg-transparent text-secondary-foreground px-4 py-2 rounded-lg">XXL</button>
                  <button className="text-blue-500 hover:bg-transparent ml-4" onClick={toggleSizeChart}>
                    Size Chart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {showSizeChart && <SizeChart onClose={toggleSizeChart} />}
    </div>
  );
};

export default ProductPage;
