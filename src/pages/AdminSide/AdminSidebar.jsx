import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faDashboard, faUsers, faBoxes, faShippingFast, faTags, faClipboardList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/eliteTradingLogo.png';

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for sidebar visibility
  const [adminName, setAdminName] = useState(''); // State for admin name
  const [user, setUser] = useState(null); // State for current user
  const navigate = useNavigate();
  const location = useLocation(); // Get current route location
  const auth = getAuth();
  const firestore = getFirestore();

  // Fetch admin name from Firestore
  useEffect(() => {
    const fetchAdminName = async () => {
        if (user) {
          try {
            // Query for the document with a field matching the current user's email or other unique identifier
            const adminCollection = collection(firestore, 'admin');
            const q = query(adminCollection, where('email', '==', user.email));
            const querySnapshot = await getDocs(q);
  
            if (!querySnapshot.empty) {
              // Assuming there is only one document matching the query
              const adminDoc = querySnapshot.docs[0].data();
              setAdminName(adminDoc.adminName); // Adjust field name as per your Firestore structure
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
        navigate('/adminlogin'); // Redirect to AdminLogin after logging out
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Button for medium screens */}
      <button
        className="md:hidden p-2 text-white bg-brown-900"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Sidebar - sliding effect on medium screens */}
      <div
        className={`fixed top-0 left-0 h-full bg-brown-900 text-white p-4 transform ${
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
          <span className="text-lg font-semibold">Hello, {adminName}</span>

        <nav className="flex flex-col space-y-2">
          <Link
            to="/Dashboard"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/admin/dashboard'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faDashboard} />
            <span className="ml-2">Dashboard</span>
          </Link>
          <Link
            to="/admin/customers"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/admin/customers'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span className="ml-2">Customers</span>
          </Link>
          <Link
            to="/admin/category"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/admin/category'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faTags} />
            <span className="ml-2">Category</span>
          </Link>
          <Link
            to="/admin/shipment"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/admin/shipment'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faShippingFast} />
            <span className="ml-2">Shipment</span>
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/admin/products'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faBoxes} />
            <span className="ml-2">Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center p-2 rounded ${
              location.pathname === '/admin/orders'
                ? 'bg-yellow-200 text-brown-900'
                : 'hover:bg-yellow-500 hover:text-brown-900'
            }`}
          >
            <FontAwesomeIcon icon={faClipboardList} />
            <span className="ml-2">Orders</span>
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
