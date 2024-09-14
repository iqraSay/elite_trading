import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import Featured from '../../components/Featured.jsx';
import NewArrivals from '../../components/NewArrivals.jsx';
import Sban from '../../assets/ShirtsBanner.png';
import Hban from '../../assets/hoodiesBanner.webp';
import Shban from '../../assets/ShoesBanner.png';
import Wban from '../../assets/WatchesBanner.jpg';


const Home = () => {
  

    return (
      <div className="h-auto bg-cover bg-left ">
        <Header/>
      <div className="flex flex-col banner items-center justify-center  h-full text-center text-brown-900">
        <h1 className="text-5xl md:text-7xl font-bold mb-5">Elite Trading</h1>
        <p className="text-2xl md:text-4xl mb-10">Elevate Your Style with Exclusive Fashion and Accessories</p>
        <button className="bg-brown-900 text-yellow-200 py-2 px-4 rounded-full hover:bg-white hover:text-yellow-500 transition-colors duration-300;">Shop Now</button>
        
      </div>
      <Link to='/mensclothing/footwear'><img src={Shban} alt="banner" className='w-full md:h-[70vh]' /></Link>
      <div className=" bg-gray-200">
        <Featured  />
      </div>
      <Link to='/mensclothing/shirts'><img src={Sban} alt="banner" className='w-full ' /></Link>

      <NewArrivals/>
      <Link to='/mensclothing/hoodies'><img src={Hban} alt="banner" className='w-full ' /></Link>
      <NewArrivals/>
      <Link to='/accessories/watches'><img src={Wban} alt="banner" className='w-full ' /></Link>
      <NewArrivals/>
      <Footer/>
    </div>
    )
  }

export default Home;