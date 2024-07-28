import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MensClothing from './pages/MensClothing';
import WomensClothing from './pages/WomensClothing';
import Shoes from './pages/Shoes';
import Acc from './pages/Accessories';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Categories from './pages/Categories';
import ErrorPage from './pages/ErrorPage';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mensclothing' element ={<MensClothing/>} />
      <Route path='/womensclothing' element ={<WomensClothing/>} />
      <Route path='/shoes' element ={<Shoes/>} />
      <Route path='/accessories' element ={<Acc/>} />
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
