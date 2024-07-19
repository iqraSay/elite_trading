import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/eliteTradingLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faBars } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // const toggleSearch = () => {
  //   setSearchVisible(!searchVisible);
  // };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
    return (
      <div>
        <nav className="flex items-center justify-between px-5 bg-brown-900">
      <div className='items-center '>
          <Link to="/"><img src={logo} alt="Elite Trading Logo" className="h-24 lg:pl-10"/></Link>
        </div>
          <div className=" space-x-6 hidden lg:flex">
          <Link to="/mensclothing" className="text-yellow-500 font-bold text-2xl hover:text-yellow-100  transition-colors duration-300">Men's Clothes</Link>
          <Link to="/womensclothing" className="text-yellow-500 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">Women's Clothes</Link>
          <Link to="/shoes" className="text-yellow-500 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">Shoes</Link>
          <Link to="/accessories" className="text-yellow-500 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">Accessories</Link>
          {/* <a href="#" className="text-yellow-500 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">Contact Us</a> */}
          {/* <button className="text-yellow-500 hover:text-yellow-100 transition-colors duration-300;">Search</button> */}
          </div>
        <div className="hidden lg:flex space-x-6 justify-between items-center">
          <div className=" space-x-6 flex items-center">
          <div className="relative focus:shadow-yellow-500 focus:shadow-lg bg-yellow-300 px-1 rounded-md">
            <input type="text" placeholder="Search..." className="focus:outline-none  w-32 p-2 bg-yellow-300"/>
            <FontAwesomeIcon icon={faSearch} className="text-yellow-500 pl-2 pr-1 cursor-pointer" />
          </div>
          <button className='text-yellow-500 border-yellow-500 hover:border-white border-2  transition-colors duration-300 cursor-pointer rounded-md font-bold text-lg px-2 hover:text-yellow-100 '>Login
          <FontAwesomeIcon icon={faUser} className=" pl-3 " />
          </button>
          <button className='text-yellow-500 border-yellow-500 hover:border-white  transition-colors duration-300 cursor-pointer border-2 rounded-md font-bold text-lg px-2 hover:text-yellow-100 '>Cart
          <FontAwesomeIcon icon={faShoppingCart} className="pl-3" />
          </button>
          {/* <button className="text-yellow-500 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300;">Login</button> */}
          </div>
        </div>
        <div className="lg:hidden flex items-center space-x-5">
          <FontAwesomeIcon icon={faUser} className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300 cursor-pointer" />
          <FontAwesomeIcon icon={faShoppingCart} className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300 cursor-pointer" />
          <button className="text-3xl text-yellow-500" onClick={toggleMenu}>☰</button>
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden flex flex-col h-screen text-2xl font-bold space-y-8 items-center px-5 py-32  bg-brown-900 ">
          <Link to="/mensclothing" className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Men's Clothes</Link>
          <Link to="/womensclothing" className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Women's Clothes</Link>
          <Link to="/shoes" className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Shoes</Link>
          <Link to="/accessories" className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Accessories</Link>
          {/* <a href="#contact" className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Contact Us</a> */}
          {/* <a href="#cart" className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Cart</a>
          <button className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Login</button> */}
          <div className="relative  w-full px-1 rounded-md flex lg:hidden bg-brown-900">
              <input type="text" placeholder="Search..." className="focus:outline-none placeholder-yellow-300 w-full p-2 border-b text-yellow-500 bg-brown-900 border-b-3 border-b-yellow-500"/>
              <button className="text-yellow-500 p-2  cursor-pointer">
              <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
        </div>
      )} 
      {/* <div className={`search-bar bg-yellow-300 ${searchVisible ? 'block' : 'hidden'} p-2`}>
      </div> */}
      </div>
    )
  }

export default Header;