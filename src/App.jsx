import logo from '../src/assets/eliteTradingLogo.png';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MensClothing from './pages/MensClothing';
import WomensClothing from './pages/WomensClothing';
import Shoes from './pages/Shoes';
import Acc from './pages/Accessories';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mensclothing' element ={<MensClothing/>} />
      <Route path='/womensclothing' element ={<WomensClothing/>} />
      <Route path='/shoes' element ={<Shoes/>} />
      <Route path='/accessories' element ={<Acc/>} />
      </Routes>
    </div>
  );
}

export default App;
