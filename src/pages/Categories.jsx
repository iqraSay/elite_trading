import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/navbar.jsx';
import Footer from '../components/Footer.jsx';

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
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoShirt.png?alt=media&token=053b1389-597c-46ae-b78c-c398f1f10f6c' alt="Shirts" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Shirts</p>
              </Link>
              <Link to="/mensclothing/tshirts" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoTshirt.png?alt=media&token=7b197eaf-ddca-4cdc-b650-48e004fb1241' alt="T-Shirts" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">T-Shirts</p>
              </Link>
              <Link to="/mensclothing/hoodies" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoHoodie.png?alt=media&token=30cec7ce-398d-4e44-b420-5c43c3bb2bd3' alt="Hoodies" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Hoodies</p>
              </Link>
              <Link to="/mensclothing/footwear" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoShoes.png?alt=media&token=d7273417-4a14-417e-b192-7fd0d696e7b6' alt="Footware" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Footware</p>
              </Link>
            </div>
          </div>
        
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#2a0000]">Womens</h2>
            <div className="grid grid-cols-4 gap-4">
            <Link to="/womensclothing/dresses" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoDress.png?alt=media&token=076cf605-4ede-4a83-8988-7111e801295c' alt="Dresses" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Dresses</p>
              </Link>
              <Link to="/womensclothing/suits" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoSuit.png?alt=media&token=92990edb-a202-4e24-84d5-9d6ebf99fbeb' alt="Suits" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Suits</p>
              </Link>
              <Link to="/womensclothing/kurtis" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoKurti.png?alt=media&token=41bcc46a-2dc6-49b6-9c02-31a99175adee' alt="Kurtis" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Kurtis</p>
              </Link>
              <Link to="/womensclothing/gowns" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoGown.png?alt=media&token=81d50213-e04d-4dbb-a04f-cd4df369d40e' alt="Gowns" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Gowns</p>
              </Link>
            </div>
          </div>
        
          <div>
            <h2 className="text-2xl font-semibold text-[#2a0000]">Accessories</h2>
            <div className="grid grid-cols-4 gap-4">
              <Link to="/accessories/watches" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoWatch.jpeg?alt=media&token=51b18e93-f30c-49df-927a-ed15f4faf5f1' alt="Watches" className="w-full h-auto rounded-md" />
                <p className="text-center text-xl mt-2">Watches</p>
              </Link>
              <Link to="/accessories/jewelry" className="bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg transition-transform transform hover:scale-90">
                <img src='https://firebasestorage.googleapis.com/v0/b/elitetrading-72e.appspot.com/o/products%2FdemoNeclace.png?alt=media&token=bec8d844-2194-4e4c-a5b8-c636015fcc77' alt="Jewelry" className="w-full h-auto rounded-md" />
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
