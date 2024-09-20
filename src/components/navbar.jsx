import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/eliteTradingLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menDropdownOpen, setMenDropdownOpen] = useState(false);
  const [womenDropdownOpen, setWomenDropdownOpen] = useState(false);
  const [accessoriesDropdownOpen, setAccessoriesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/');
  };

  const toggleDropdown = (setDropdownOpen) => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleMenDropdown = () => {
    setMenDropdownOpen(!menDropdownOpen);
    setWomenDropdownOpen(false);
    setAccessoriesDropdownOpen(false);
  };

  const toggleWomenDropdown = () => {
    setWomenDropdownOpen(!womenDropdownOpen);
    setMenDropdownOpen(false);
    setAccessoriesDropdownOpen(false);    
  };

  const toggleAccessoriesDropdown = () => {
    setAccessoriesDropdownOpen(!accessoriesDropdownOpen);
    setMenDropdownOpen(false);
    setWomenDropdownOpen(false);
  };

  const handleCartClick = () => {
    navigate(user ? '/cart' : '/login');
  };

  const handleClick = (dropdownType) => {
    toggleMenu();
    switch (dropdownType) {
      case 'men':
        toggleMenDropdown();
        break;
      case 'women':
        toggleWomenDropdown();
        break;
      case 'accessories':
        toggleAccessoriesDropdown();
        break;
      default:
        console.log('No dropdown function called');
    }
  };



  return (
    <div>
      <nav className="flex items-center justify-between px-5 bg-brown-900">
        <div className='items-center '>
          <Link to="/"><img src={logo} alt="Elite Trading Logo" className="h-24 lg:pl-10"/></Link>
        </div>
        <div className=" space-x-6 hidden lg:flex relative">
          <div className="relative">
            <button onClick={toggleMenDropdown} className="text-yellow-500 hover:bg-brown-900 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">
              Men's Outfits
            </button>
            {menDropdownOpen && (
              <div className="absolute left-7 bg-yellow-100 z-50 rounded-lg shadow-lg p-2">
                <Link to="/productdisplay/Hoodie" onClick={toggleMenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Hoodies</Link>
                <Link to="/productdisplay/T-Shirt" onClick={toggleMenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">T-Shirts</Link>
                <Link to="/productdisplay/Shirt" onClick={toggleMenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Shirts</Link>
                <Link to="/productdisplay/Shoes" onClick={toggleMenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Footwear</Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={toggleWomenDropdown} className="text-yellow-500 hover:bg-brown-900 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">
              Women's Outfits
            </button>
            {womenDropdownOpen && (
              <div className="absolute left-14 bg-yellow-100 z-50 rounded-lg shadow-lg p-2">
                <Link to="/productdisplay/Dress" onClick={toggleWomenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Dresses</Link>
                <Link to="/productdisplay/Gown" onClick={toggleWomenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Gowns</Link>
                <Link to="/productdisplay/Kurti" onClick={toggleWomenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Kurtis</Link>
                <Link to="/productdisplay/Suit" onClick={toggleWomenDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Suits</Link>
              </div>
            )}
          </div>
          <div className="relative">
          <button onClick={toggleAccessoriesDropdown} className="text-yellow-500 hover:bg-brown-900 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">Accessories</button>
          {accessoriesDropdownOpen && (
            <div className="absolute left-5 bg-yellow-100 z-50 rounded-lg shadow-lg p-2">
              <Link to="/productdisplay/Watch" onClick={toggleAccessoriesDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Watches</Link>
              <Link to="/productdisplay/Jewelry"onClick={toggleAccessoriesDropdown} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Jewelry</Link>
            </div>
          )}
          </div>
          <Link to="/categories" className="text-yellow-500 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">Categories</Link>
          {/* <Link to="/accessories" className="text-yellow-500 font-bold text-2xl hover:text-yellow-100 transition-colors duration-300">Accessories</Link> */}
        </div>
        <div className="hidden lg:flex space-x-6 justify-between items-center">
          <div className=" space-x-2 flex items-center">
            {/* <div className="relative focus:shadow-yellow-500 focus:shadow-lg bg-yellow-300 px-1 rounded-md">
              <input type="text" placeholder="Search..." className="focus:outline-none w-32 p-2 bg-yellow-300 placeholder-brown-900"/>
              <FontAwesomeIcon icon={faSearch} className="text-yellow-500 pl-2 pr-1 cursor-pointer" />
            </div> */}
            {user ? (
              <div className="relative">
                <button onClick={() => toggleDropdown(setUserDropdownOpen)} className="text-yellow-500 font-bold text-lg hover:text-yellow-100 transition-colors duration-300">
                <FontAwesomeIcon icon={faUser}  />
                <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 bg-yellow-100 z-50 rounded-lg shadow-lg p-2">
                    {/* <Link to="/orders" className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Order History</Link> */}
                    {/* <Link to="/wishlist" className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Wishlist</Link> */}
                    {/* <Link to="/profile" className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Profile</Link> */}
                    <button onClick={handleSignOut} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-yellow-500 font-bold text-lg hover:text-yellow-100 transition-colors duration-300">Login
                <FontAwesomeIcon icon={faUser} className="pl-3" />
              </Link>
            )}
            <button onClick={handleCartClick} className='text-yellow-500 transition-colors duration-300 cursor-pointer font-bold text-lg px-2 hover:text-yellow-100'>
            Cart
            <FontAwesomeIcon icon={faShoppingCart} className="pl-3" />
          </button>
          </div>
        </div>
        <div className="lg:hidden flex items-center space-x-5">
        {user ? (
              <div className="relative">
                <button onClick={() => toggleDropdown(setUserDropdownOpen)} className="text-yellow-500 font-bold text-lg hover:text-yellow-100 transition-colors duration-300">
                <FontAwesomeIcon icon={faUser} className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300 cursor-pointer" />
                <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {userDropdownOpen && (
                  <div className="absolute right-0 bg-yellow-100 z-50 rounded-lg shadow-lg p-2">
                    {/* <Link to="/orders" className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Order History</Link> */}
                    {/* <Link to="/wishlist" className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Wishlist</Link> */}
                    {/* <Link to="/profile" className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Profile</Link> */}
                    <button onClick={handleSignOut} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Logout</button>
                  </div>
                )}
              </div>
            ) : (
          <Link to="/login">
          <FontAwesomeIcon icon={faUser} className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300 cursor-pointer" />
          </Link>
            )}
          <button onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} className="text-yellow-500 hover:text-yellow-100 transition-colors duration-300 cursor-pointer" />
          </button>
          <button className="text-3xl text-yellow-500" onClick={toggleMenu}>☰</button>
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden flex flex-col h-screen text-2xl font-bold space-y-8 items-center px-5 py-20  bg-brown-900 ">
           <button onClick={toggleMenDropdown} className="text-yellow-500 hover:bg-brown-900 hover:text-yellow-100  transition-colors duration-300">Men's Outfits</button>
          {menDropdownOpen && (
            <div className="bg-yellow-100 z-50 rounded-lg shadow-lg p-2 w-full">
              <Link to="/productdisplay/Hoodie" onClick={() => handleClick('men')}  className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Hoodies</Link>
              <Link to="/productdisplay/T-Shirt" onClick={() => handleClick('men')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">T-Shirts</Link>
              <Link to="/productdisplay/Shirt" onClick={() => handleClick('men')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Shirts</Link>
              <Link to="/productdisplay/Shoes" onClick={() => handleClick('men')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Footwear</Link>
            </div>
          )}
          <button onClick={toggleWomenDropdown} className="text-yellow-500 hover:bg-brown-900 hover:text-yellow-100  transition-colors duration-300">Women's Outfits</button>
          {womenDropdownOpen && (
            <div className="bg-yellow-100 z-50 rounded-lg shadow-lg p-2 w-full">
              <Link to="/productdisplay/Dress" onClick={() => handleClick('women')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Dresses</Link>
              <Link to="/productdisplay/Gown" onClick={() => handleClick('women')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Gowns</Link>
              <Link to="/productdisplay/Kurti" onClick={() => handleClick('women')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Kurtis</Link>
              <Link to="/productdisplay/Suit" onClick={() => handleClick('women')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Suits</Link>
            </div>
          )}
          <button onClick={toggleAccessoriesDropdown} className="text-yellow-500 hover:bg-brown-900 hover:text-yellow-100  transition-colors duration-300">Accessories</button>
          {accessoriesDropdownOpen && (
            <div className="bg-yellow-100 z-50 rounded-lg shadow-lg p-2 w-full">
              <Link to="/productdisplay/Watch" onClick={() => handleClick('accessories')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Watches</Link>
              <Link to="/productdisplay/Jewelry" onClick={() => handleClick('accessories')} className="block text-brown-900 hover:bg-yellow-200 p-2 rounded">Jewelry</Link>
            </div>
          )}
          <Link to="/categories" className="text-yellow-500 hover:text-yellow-100  transition-colors duration-300">Categories</Link>
          {/* <div className="relative  w-full px-1 rounded-md flex lg:hidden bg-brown-900">
            <input type="text" placeholder="Search..." className="focus:outline-none placeholder-yellow-300 w-full p-2 border-b text-yellow-500 bg-brown-900 border-b-3 border-b-yellow-500"/>
            <button className="text-yellow-500 p-2  cursor-pointer">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div> */}

        </div>
      )}
    </div>
  )
}

export default Header;
