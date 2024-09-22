import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import AddCart from './AddCart';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { firestore } from '../Firebase';

const Arrow = ({ className, onClick, icon }) => (
  <div className={className} onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
  </div>
);

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <Arrow icon={faArrowRight} />,
    prevArrow: <Arrow icon={faArrowLeft} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const calculateDiscount = (originalPrice, offerPrice) => {
    return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
  };

  // Fetch random products from Firestore
  const fetchRandomProducts = async () => {
    const productsRef = collection(firestore, 'products');
    const productQuery = query(productsRef, limit(10));
    const productSnapshot = await getDocs(productQuery);
    const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Shuffle and set the products
    const shuffled = productList.sort(() => 0.5 - Math.random());
    setProducts(shuffled);
  };

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  return (
    <div className="py-10 bg-white">
      <h2 className="text-4xl font-bold text-center text-brown-900 mb-8">New Arrivals</h2>
      <p className="text-center text-lg text-brown-700 mb-10">Discover the latest trends and must-have styles</p>
      <div className="px-4">
        {products.length > 0 ? (
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id} className="p-2">
                <div className="bg-gradient-to-t from-yellow-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                  <div className="relative w-full h-56 ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-sm font-bold">
                      New
                    </div>
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
                    <p className="text-brown-900 font-bold">₹{product.offerPrice ? product.offerPrice.toFixed(2) : product.originalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <p className="text-yellow-700 mr-2">{product.rating}★</p>
                    <p className="text-brown-700">({product.reviews} reviews)</p>
                  </div>
                  <AddCart product={product} />
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;
