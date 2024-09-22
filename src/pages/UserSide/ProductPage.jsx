import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { firestore } from '../../Firebase'; // Make sure to import Firestore
import { collection, query, where, getDocs } from 'firebase/firestore';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import SizeChart from '../../components/SizeChart.jsx';
import AddCart from '../../components/AddCart.jsx';
import { auth } from '../../Firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';

const ProductPage = () => {
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null); // Initialize product as null
  const [mainImage, setMainImage] = useState(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const { productId } = useParams(); // Get productId from the URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Query Firestore to get the product where 'id' matches the productId from the URL
        const q = query(collection(firestore, 'products'), where('id', '==', productId));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const productData = querySnapshot.docs[0].data(); // Get the first matched product
          setProduct(productData); // Set product data to state
          setMainImage(productData.image); // Set main image initially
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [productId]); // Re-run the effect when productId changes

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

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 shadow-2xl rounded-lg flex flex-col items-center mx-auto my-8 p-4 w-full max-w-6xl">
        <div className="flex flex-col md:flex-row w-full bg-background ">
          <div className="flex flex-col items-center md:w-1/2 p-4">
            <div className="flex space-x-4">
              <div className="flex flex-col w-full space-y-2">
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
                <h2 className="text-2xl font-semibold text-center">{product.name}</h2>
                <div className="flex space-x-4 mt-2 justify-between">
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
                    <span className="text-lg line-through text-gray-500 text-muted-foreground ml-2">₹{product.originalPrice}</span>
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
              
              <div className="mt-6 flex space-x-4">
                <h2 className="text-lg font-bold text-primary">Size:</h2>
                <p className="text-lg text-muted-foreground">{product.size || '-'}</p>
                <button className="text-brown-900 hover:bg-transparent" onClick={toggleSizeChart}>
                  Size Chart
                </button>
              </div>

              <div className="mt-6 flex space-x-4">
                <h2 className="text-lg font-bold text-primary">Color:</h2>
                <p className="text-lg text-muted-foreground">{product.color || '-'}</p>
              </div>

              <div className="mt-6 flex space-x-4">
                <h2 className="text-lg font-semibold text-primary">Material:</h2>
                <p className="text-lg text-muted-foreground">{product.Material || '-'}</p>
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
