import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/UserSide/Home';
import Shirts from './pages/UserSide/Shirts';
import Kurtis from './pages/UserSide/Kurtis';
import Hoodies from './pages/UserSide/Hoodies';
import Tshirts from './pages/UserSide/Tshirts';
import Gowns from './pages/UserSide/Gowns';
import Dresses from './pages/UserSide/Dresses';
import Suits from './pages/UserSide/Suits';
import Watches from './pages/UserSide/Watches';
import Shoes from './pages/UserSide/Shoes';
import Jewelry from './pages/UserSide/Jewelry';
import LoginPage from './pages/UserSide/LoginPage';
import Signup from './pages/UserSide/Signup';
import ForgotPassword from './pages/UserSide/ForgotPassword';
import Categories from './pages/UserSide/Categories';
import ErrorPage from './pages/UserSide/ErrorPage';
import ProductPage from './pages/UserSide/ProductPage';
import ProductDisplay from './pages/UserSide/ProductDisplay';
import Cart from './pages/UserSide/Cart';
import Checkout from './pages/UserSide/Checkout';
import AdminProductForm from './pages/AdminSide/AdminProductForm';
import AdminSignup from './pages/AdminSide/AdminSignup';
import AdminLogin from './pages/AdminSide/AdminLogin';
import Dashboard from './pages/AdminSide/Dashboard';
import ProductList from './pages/AdminSide/ProductList';


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
      <Route path='/womensclothing/Dresses' element ={<Dresses/>} />
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
      <Route path="/productdisplay/:category" element={<ProductDisplay />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path='/cart' element ={<Cart/>} />
      <Route path='/AdminProductForm' element ={<AdminProductForm/>} />
      <Route path='/AdminSignup' element ={<AdminSignup/>} />
      <Route path='/AdminLogin' element ={<AdminLogin/>} />
      <Route path='/Dashboard' element ={<Dashboard/>} />
      <Route path='/ProductList' element ={<ProductList/>} />
      </Routes>
    </div>
  );
}

export default App;
