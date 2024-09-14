import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import demo1 from '../assets/demoTshirt.png';
import demo2 from '../assets/demoDress.png';
import demo3 from '../assets/demoGown.png';
import demo4 from '../assets/demoNeclace.png';
import AddCart from './AddCart';



const products = [
    { id: 1, name: 'Product 1', image: demo1, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10 },
    { id: 2, name: 'Product 2', image: demo2, originalPrice: 179.99,  rating: 4.0, reviews: 8 },
    { id: 3, name: 'Product 3', image: demo3, originalPrice: 199.99, offerPrice: 149.99, rating: 4.8, reviews: 15 },
    { id: 4, name: 'Product 4', image: demo4, originalPrice: 199.99, rating: 4.8, reviews: 15 },
    { id: 5, name: 'Product 5', image: demo1, originalPrice: 159.99, offerPrice: 129.99, rating: 4.5, reviews: 10 },
    { id: 6, name: 'Product 6', image: demo2, originalPrice: 179.99,  rating: 4.0, reviews: 8 },
    { id: 7, name: 'Product 7', image: demo3, originalPrice: 199.99, rating: 4.8, reviews: 15 },
    { id: 8, name: 'Product 8', image: demo4, originalPrice: 199.99, offerPrice: 149.99, rating: 4.8, reviews: 15 },
    // Add more new arrivals as needed
  ];

const Arrow = ({ className, onClick, icon }) => (
  <div className={className} onClick={onClick}>
    <FontAwesomeIcon icon={icon} />
  </div>
);

const MayLike = () => {

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


  return (
    <div className="py-10 bg-white">
      <h2 className="text-4xl font-bold text-center text-brown-900 mb-8">You may also like</h2>
      <p className="text-center text-lg text-brown-700 mb-10">Find the perfect piece to update your wardrobe.</p>
      <div className="px-4">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="p-2">
              <div className="bg-gradient-to-t from-yellow-200 rounded-lg shadow-lg p-4 flex flex-col items-center">
                <div className="relative w-full h-56 ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover  rounded-lg"
                  />
                  {product.offerPrice ? (
                <>
            <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold">
              {calculateDiscount(product.originalPrice, product.offerPrice)}% OFF
            </div>
                    {/* <p className="line-through text-slate-400 ">₹{product.originalPrice.toFixed(2)}</p>
                    <p className="text-brown-900 ">₹{product.offerPrice.toFixed(2)}</p> */}
                </>
              ) : (
                  <></>
                )}
                  {/* {product.originalPrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-sm font-bold">
                      {calculateDiscount(product.originalPrice, product.offerPrice)}% OFF
                    </div>
                  )} */}
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
                < AddCart product={products}/>
              </div>
            </div>
          ))}
        </Slider>
        
      </div>
    </div>
  );
};

export default MayLike;
