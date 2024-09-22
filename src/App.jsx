import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/UserSide/Home';
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
import UserManager from './pages/AdminSide/UserManager';
import CategoryManager from './pages/AdminSide/CategoryManager';
import Shipment from './pages/AdminSide/Shipment';
import Orders from './pages/AdminSide/Orders';



function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />} />
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
      <Route path='/UserManager' element ={<UserManager/>} />
      <Route path='/CategoryManager' element ={<CategoryManager/>} />
      <Route path='/Shipment' element ={<Shipment/>} />
      <Route path='/Orders' element ={<Orders/>} />
      </Routes>
    </div>
  );
}

export default App;
