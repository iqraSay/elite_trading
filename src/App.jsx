import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './Firebase';
import { doc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';

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
import OrderBill from './pages/UserSide/OrderBill';
import AdminProductForm from './pages/AdminSide/AdminProductForm';
import AdminSignup from './pages/AdminSide/AdminSignup';
import AdminLogin from './pages/AdminSide/AdminLogin';
import Dashboard from './pages/AdminSide/Dashboard';
import ProductList from './pages/AdminSide/ProductList';
import UserManager from './pages/AdminSide/UserManager';
import CategoryManager from './pages/AdminSide/CategoryManager';
import Shipment from './pages/AdminSide/Shipment';
import Orders from './pages/AdminSide/Orders';


function ProtectedRoute({ children, user, requiredRole }) {
  if (!user) {
    if (requiredRole === 'admin') {
      return <Navigate to="/AdminLogin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  if (requiredRole && user.role !== requiredRole) {
    if (user.role === 'user' && requiredRole === 'admin') {
      alert("You don't have access to this page!");
      return <Navigate to="/" />;
    }
  }
  return children;
}

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersRef = collection(firestore, 'users');
        const q = query(usersRef, where('email', '==', user.email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setRole(userData.role);
          setCurrentUser({ ...user, role: userData.role });
        }
      } else {
        setCurrentUser(null);
        setRole(null);
      }
      setLoading(false);
    });
  
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
       {/* Public routes */}
      <Route path='/' element={<Home />} />
      <Route path='*' element ={<ErrorPage/>} />
      <Route path='/categories' element ={<Categories/>} />
      <Route path="/productdisplay/:category" element={<ProductDisplay />} />
      <Route path="/product/:productId" element={<ProductPage />} />

      {/* Routes accessible to all (login, signup, etc.) */}
      <Route path='/login' element ={<LoginPage/>} />
      <Route path='/signup' element ={<Signup/>} />
      <Route path='/forgotpassword' element ={<ForgotPassword/>} />
      <Route path='/AdminLogin' element ={<AdminLogin/>} />

       {/* Protected routes for logged-in users */}
      <Route path='/checkout' element ={<ProtectedRoute user={currentUser} requiredRole="user"><Checkout/></ProtectedRoute>} />
      <Route path="/order/:orderId" element={<ProtectedRoute user={currentUser} requiredRole="user"><OrderBill /></ProtectedRoute>} />
      <Route path='/cart' element ={ <ProtectedRoute user={currentUser} requiredRole="user"><Cart/></ProtectedRoute>} />
      <Route path='/AdminSignup' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><AdminSignup/></ProtectedRoute>} />
      <Route path='/AdminProductForm' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><AdminProductForm/></ProtectedRoute>} />
      <Route path='/Dashboard' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><Dashboard/></ProtectedRoute>} />
      <Route path='/ProductList' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><ProductList/></ProtectedRoute>} />
      <Route path='/UserManager' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><UserManager/></ProtectedRoute>} />
      <Route path='/CategoryManager' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><CategoryManager/></ProtectedRoute>} />
      <Route path='/Shipment' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><Shipment/></ProtectedRoute>} />
      <Route path='/Orders' element ={<ProtectedRoute user={currentUser} requiredRole="admin"><Orders/></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
