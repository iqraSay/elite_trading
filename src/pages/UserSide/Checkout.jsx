import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/navbar.jsx';
import Footer from '../../components/Footer.jsx';
import { firestore, auth} from '../../Firebase.js';
import { collection, getDocs, addDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Checkout() {
  const [formData, setFormData] = useState({
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    addressOptional: "",
    town: "",
    postcode: "",
    state: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [products, setProducts] = useState([]); 
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(""); // Store username

  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
  //   const items = Object.keys(storedCartItems).map(id => {
  //     const product = products.find(p => p.id === id);
  //     if (product) {
  //       return { ...product, quantity: storedCartItems[id] };
  //     }
  //     return null;
  //   }).filter(item => item !== null);
  //   setCartItems(items);
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const usersRef = collection(firestore, 'users');
        const userQuery = query(usersRef, where('email', '==', currentUser.email));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          setUsername(userDoc.data().username);
        } else {
          console.error('No matching user found with the email.');
        }
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  console.error(`User is: ${username}`);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(firestore, 'products');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (storedProduct) {
      const product = products.find(p => p.id === storedProduct.id);
      if (product) {
        setCartItems([{ ...product, quantity: 1 }]);
        localStorage.removeItem('selectedProduct');
      }
    } else {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
      const items = Object.keys(storedCartItems).map(id => {
        const product = products.find(p => p.id === id);
        if (product) {
          return { ...product, quantity: storedCartItems[id] };
        }
        return null;
      }).filter(item => item !== null);
      setCartItems(items);
    }
  }, [products]);
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.originalPrice * item.quantity,
    0
  );
  const shippingRate = subtotal * 0.3;
  const orderTotal = subtotal + shippingRate;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (
        !formData[field] &&
        field !== "addressOptional"
      ) {
        newErrors[field] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to place an order.');
      return;
    }
  
    if (validateForm()) {
      try {
        const date = new Date();
        const orderID = `order-${cartItems.length}-${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const orderDate = date.toLocaleDateString('en-US', options);
  
        const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
        const orderData = {
          userID: user.uid,
          username: user.email,
          ...formData,
          cartItems,
          orderTotal,
          shippingRate,
          subtotal,
          totalItems,
          status: 'pending',
          orderDate,
          date: serverTimestamp(),
        };
  
        const ordersCollectionRef = collection(firestore, 'orders');
        await addDoc(ordersCollectionRef, { ...orderData, orderID });
  
        setCartItems([]);
        localStorage.removeItem('cartItems');
        setOrderPlaced(true);
  
        setTimeout(() => {
          navigate('/');
        }, 10000);
  
      } catch (error) {
        console.error('Error placing order:', error);
      }
    }
  };
    


  if (orderPlaced) {
    return (
      <div className="text-center p-6">
        <h1 className="text-4xl font-bold mb-4">Thank You for Shopping with Elite Trading!</h1>
        <p className="text-xl">Your order has been placed successfully. You will be redirected to the home page in 10 seconds.</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row p-6 space-x-4">
        <div className="w-full md:w-2/3 bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-center">BILLING DETAILS</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium">
                Country *
              </label>
              <input
                type="text"
                id="country"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium">
              Address *
            </label>
            <input
              type="text"
              id="address"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="addressOptional"
              className="block text-sm font-medium"
            >
              Apartment, suite, unit etc. (optional)
            </label>
            <input
              type="text"
              id="addressOptional"
              className="mt-1 block w-full border rounded-md p-2"
              value={formData.addressOptional}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="town" className="block text-sm font-medium">
                Town / City *
              </label>
              <input
                type="text"
                id="town"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.town ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.town}
                onChange={handleChange}
              />
              {errors.town && (
                <p className="text-red-500 text-sm">{errors.town}</p>
              )}
            </div>
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium">
                Postcode / Zip *
              </label>
              <input
                type="text"
                id="postcode"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.postcode ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.postcode}
                onChange={handleChange}
              />
              {errors.postcode && (
                <p className="text-red-500 text-sm">{errors.postcode}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="state" className="block text-sm font-medium">
                State / Region *
              </label>
              <input
                type="text"
                id="state"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.state ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.state}
                onChange={handleChange}
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className={`mt-1 block w-full border rounded-md p-2 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              className={`mt-1 block w-full border rounded-md p-2 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

            <button
              type="submit"
              className="bg-yellow-500 text-brown-900 hover:bg-brown-900 hover:text-yellow-500 w-full py-2 rounded-md"
            >
              PLACE ORDER
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/3 bg-gradient-to-t from-yellow-200 p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold mb-4">YOUR ORDER</h2>
          <div className="mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{item.originalPrice.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold mb-4">
            <span>CART SUBTOTAL</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <span className="block text-sm font-medium">SHIPPING</span>
            <p>Flat Rate: ₹{shippingRate.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold mb-4">
            <span>ORDER TOTAL</span>
            <span className="text-red-600">₹{orderTotal.toFixed(2)}</span>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Payment Method
            </label>
            <p className="text-red-600">Only Cash on Delivery is available.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
