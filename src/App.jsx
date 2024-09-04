import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shirts from './pages/Shirts';
import Kurtis from './pages/Kurtis';
import Hoodies from './pages/Hoodies';
import Tshirts from './pages/Tshirts';
import Gowns from './pages/Gowns';
import Suits from './pages/Suits';
import Watches from './pages/Watches';
import Shoes from './pages/Shoes';
import Jewelry from './pages/Jewelry';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Categories from './pages/Categories';
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mensclothing/Shirts' element ={<Shirts/>} />
      <Route path='/mensclothing/Tshirts' element ={<Tshirts/>} />
      <Route path='/mensclothing/Hoodies' element ={<Hoodies/>} />
      <Route path='/womensclothing/Kurtis' element ={<Kurtis/>} />
      <Route path='/womensclothing/Gowns' element ={<Gowns/>} />
      <Route path='/womensclothing/Suits' element ={<Suits/>} />
      <Route path='/mensclothing/footwear' element ={<Shoes/>} />
      <Route path='/accessories/jewelry' element ={<Jewelry/>} />
      <Route path='/accessories/watches' element ={<Watches/>} />
      <Route path='/checkout' element ={<Checkout/>} />
      <Route path='/login' element ={<LoginPage/>} />
      <Route path='/signup' element ={<Signup/>} />
      <Route path='/forgotpassword' element ={<ForgotPassword/>} />
      <Route path='/categories' element ={<Categories/>} />
      <Route path='*' element ={<ErrorPage/>} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path='/cart' element ={<Cart/>} />
      </Routes>
    </div>
  );
}

export default App;
