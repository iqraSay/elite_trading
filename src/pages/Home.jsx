import React,{useState} from 'react';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import Featured from '../components/Featured.jsx';
import NewArrivals from '../components/NewArrivals.jsx';

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