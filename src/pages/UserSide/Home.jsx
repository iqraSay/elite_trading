import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import Featured from '../../components/Featured.jsx';
import NewArrivals from '../../components/NewArrivals.jsx';
import MayLike from '../../components/MayLike.jsx';
import RelatedItems from '../../components/RelatedItems.jsx';
import Sban from '../../assets/ShirtsBanner.png';
import Hban from '../../assets/hoodiesBanner.webp';
import Shban from '../../assets/ShoesBanner.png';
import Wban from '../../assets/WatchesBanner.jpg';


const Home = () => {

  const newArrivalsRef = useRef(null);

  const scrollToNewArrivals = () => {
    if (newArrivalsRef.current) {
      newArrivalsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

    return (
      <div className="h-auto bg-cover bg-left ">
        <Header/>
      <div className="flex flex-col banner items-center justify-center  h-full text-center text-brown-900">
        <h1 className="text-5xl md:text-7xl font-bold mb-5">Elite Trading</h1>
        <p className="text-2xl md:text-4xl mb-10">Elevate Your Style with Exclusive Fashion and Accessories</p>
        <button
          className="bg-brown-900 text-yellow-500 py-2 px-4 rounded-full hover:bg-yellow-500 hover:text-brown-900 transition-colors duration-300"
          onClick={scrollToNewArrivals}
        >Shop Now</button>
        
      </div>
      <Link to='/productdisplay/Shoes'><img src={Shban} alt="banner" className='w-full md:h-[70vh]' /></Link>
      <div className=" bg-gray-200">
        <Featured  />
      </div>
      <Link to='/productdisplay/Shirt'><img src={Sban} alt="banner" className='w-full ' /></Link>

      <div ref={newArrivalsRef}>
        <NewArrivals />
      </div>
      <Link to='/productdisplay/Hoodie'><img src={Hban} alt="banner" className='w-full ' /></Link>
      <RelatedItems/>
      <Link to='/productdisplay/Watch'><img src={Wban} alt="banner" className='w-full ' /></Link>
      <MayLike/>
      <Footer/>
    </div>
    )
  }

export default Home;