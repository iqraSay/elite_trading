import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faDashboard, faUser, faUsers, faBoxes, faShippingFast, faTags, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminName, setAdminName] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const firestore = getFirestore();

  // Fetch admin name from Firestore
  useEffect(() => {
    const fetchAdminName = async () => {
        if (user) {
          try {
            const adminCollection = collection(firestore, 'admin');
            const q = query(adminCollection, where('email', '==', user.email));
            const querySnapshot = await getDocs(q);
  
            if (!querySnapshot.empty) {
              const adminDoc = querySnapshot.docs[0].data();
              setAdminName(adminDoc.adminName);
            } else {
              console.error(`No such admin document for email: ${user.email}`);
            }
          } catch (error) {
            console.error('Error fetching admin name:', error);
          }
        }
      };
  

    fetchAdminName();
  }, [user, firestore]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/adminlogin');
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=' w-1/5 text-2xl'>
      {/* Hamburger Button for medium screens */}
      <button
        className="md:hidden p-2 text-brown-900"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} className=' md:h-12 md:w-12' />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-brown-900 z-10 text-white px-12 py-6 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static transition-transform duration-300 ease-in-out`}
      >
        {/* Close button for medium screens */}
        <button
          className="md:hidden p-2 text-white bg-brown-900 absolute top-4 right-4"
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="flex items-center mb-6">
          <img src={logo} alt="Admin Avatar" className="w-36 h-36 rounded-full mr-2" />
        </div>
          <span className="lg:text-3xl  font-semibold">Hello, {adminName}</span>

        <nav className="flex flex-col space-y-2">
          <Link
            to="/Dashboard"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/Dashboard'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faDashboard} />
            <span className="ml-2">Dashboard</span>
          </Link>
          <Link
            to="/ProductList"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/ProductList'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faBoxes} />
            <span className="ml-2">Products</span>
          </Link>
          <Link
            to="/CategoryManager"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/CategoryManager'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faTags} />
            <span className="ml-2">Category</span>
          </Link>
          <Link
            to="/UserManager"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/UserManager'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span className="ml-2">Customers</span>
          </Link>
          <Link
            to="/Orders"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/Orders'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            <span className="ml-2">Orders</span>
          </Link>
          <Link
            to="/Shipment"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/Shipment'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faShippingFast} />
            <span className="ml-2">Shipment</span>
          </Link>
          <Link
            to="/AdminSignup"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/AdminSignup'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="ml-2">Add Admin</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 rounded hover:bg-yellow-500 hover:text-brown-900"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="ml-2">Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
