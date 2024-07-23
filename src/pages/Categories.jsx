import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';
import demoSh from '../assets/demoShirt.png';
import demoT from '../assets/demoTshirt.png';
import demoH from '../assets/demoHoodie.jpg';
import demoK from '../assets/demoKurti.jpg';
import demoG from '../assets/demoGown.jpg';
import demoS from '../assets/demoShoes.png';
import demoA from '../assets/demoAcc.png';
import demoW from '../assets/demoWatch.jpeg';
import demoSt from '../assets/demoSuit.png';



const Categories = () => {
  return (
    <div>
        <Header/>
        <div className="p-4 bg-white min-h-screen">
          <h1 className="text-4xl text-center font-bold text-[#2a0000] mb-4">Categories</h1>
        
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#2a0000]">Mens</h2>
            <div className="grid grid-cols-4 gap-4">
              <Link to="/mensclothing/shirts" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoSh} alt="Shirts" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Shirts</p>
              </Link>
              <Link to="/mensclothing/tshirts" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoT} alt="T-Shirts" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">T-Shirts</p>
              </Link>
              <Link to="/mensclothing/hoodies" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoH} alt="Hoodies" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Hoodies</p>
              </Link>
              <Link to="/mensclothing/footwear" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoS} alt="Footware" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Footware</p>
              </Link>
            </div>
          </div>
        
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#2a0000]">Womens</h2>
            <div className="grid grid-cols-4 gap-4">
              <Link to="/womensclothing/suits" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoSt} alt="Suits" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Suits</p>
              </Link>
              <Link to="/womensclothing/kurtis" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoK} alt="Kurtis" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Kurtis</p>
              </Link>
              <Link to="/womensclothing/gowns" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoG} alt="Gowns" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Gowns</p>
              </Link>
            </div>
          </div>
        
          <div>
            <h2 className="text-2xl font-semibold text-[#2a0000]">Accessories</h2>
            <div className="grid grid-cols-4 gap-4">
              <Link to="/accessories/watches" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoW} alt="Watches" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Watches</p>
              </Link>
              <Link to="/accessories/jewelry" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src={demoA} alt="Jewelry" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Jewelry</p>
              </Link>
            </div>
          </div>
        </div>
        <Footer/>
        {/* <script>
          // Add any dynamic behavior here
          document.querySelectorAll('.bg-[#ffd500]').forEach(item => {
            item.addEventListener('mouseenter', () => {
              item.classList.add('shadow-xl');
            });
            item.addEventListener('mouseleave', () => {
              item.classList.remove('shadow-xl');
            });
          });
        </script> */}
    </div>
  )
}

export default Categories
