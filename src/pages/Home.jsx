import React,{useState} from 'react';
// import logo from '../assets/eliteTradingLogo.png';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import Featured from '../components/Featured.jsx';
import NewArrivals from '../components/NewArrivals.jsx';
import AddCart from '../components/AddCart.jsx';
import demo1 from '../assets/demoShirt.png';
import demo2 from '../assets/demoDress.png';
import demo3 from '../assets/demoShoes.png';
import demo4 from '../assets/demoAcc.png';

// const products = [
//   { id: 1, name: 'New Product 1', image: demo1, price: 129.99, originalPrice: 159.99, rating: 4.5, reviews: 10 },
//   { id: 2, name: 'New Product 2', image: demo2, price: 179.99, rating: 4.0, reviews: 8 },
//   { id: 3, name: 'New Product 3', image: demo3, price: 149.99, originalPrice: 199.99, rating: 4.8, reviews: 15 },
//   { id: 4, name: 'New Product 4', image: demo4, price: 149.99, originalPrice: 199.99, rating: 4.8, reviews: 15 },
//   { id: 5, name: 'New Product 1', image: demo1, price: 129.99, originalPrice: 159.99, rating: 4.5, reviews: 10 },
//   { id: 6, name: 'New Product 2', image: demo2, price: 179.99, rating: 4.0, reviews: 8 },
//   { id: 7, name: 'New Product 3', image: demo3, price: 149.99, originalPrice: 199.99, rating: 4.8, reviews: 15 },
//   { id: 8, name: 'New Product 4', image: demo4, price: 149.99, originalPrice: 199.99, rating: 4.8, reviews: 15 },
//   // Add more new arrivals as needed
// ];

const Home = () => {
  

    return (
      <div className="h-auto bg-cover bg-left ">
        <Header/>
      <div className="flex flex-col banner items-center justify-center h-screen text-center text-brown-900">
        <h1 className="text-5xl md:text-7xl font-bold mb-5">Elite Trading</h1>
        <p className="text-2xl md:text-4xl mb-10">Elevate Your Style with Exclusive Fashion and Accessories</p>
        <button className="bg-brown-900 text-yellow-200 py-2 px-4 rounded-full hover:bg-white hover:text-yellow-500 transition-colors duration-300;">Shop Now</button>
        
      </div>
      <div className=" bg-gray-200">
        <Featured  />
      </div>
      <NewArrivals/>
      <Footer/>
    </div>
    )
  }

export default Home;