import React, { useState, useEffect, useRef } from 'react';
import { firestore } from '../../Firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import Logo from '../../assets/logo.png';
import sign from '../../assets/sign.png';

const OrderBill = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const orderRef = useRef(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         if (!orderId) {
//           alert('No order found. Redirecting to cart.');
//           navigate('/cart');
//           return;
//         }
  
//         // Query Firestore to get the order by orderID field
//         const querySnapshot = await firestore
//           .collection('orders')
//           .where('orderID', '==', orderId) // Change 'orderID' to the exact field name in your Firestore
//           .get();
  
//         if (querySnapshot.empty) {
//           alert('Order not found.');
//           navigate('/cart');
//           return;
//         }
  
//         // Assuming there is only one document with that orderID
//         const orderData = querySnapshot.docs[0].data();
//         setOrder(orderData);
//       } catch (err) {
//         console.error('Failed to fetch order data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchOrder();
//   }, [navigate, orderId]);
  
useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (!orderId) {
          alert('No order found. Redirecting to cart.');
          navigate('/cart');
          return;
        }
  
        const ordersRef = collection(firestore, 'orders');
        const q = query(ordersRef, where('orderID', '==', orderId));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          alert('Order not found.');
          navigate('/cart');
          return;
        }
  
        const orderData = querySnapshot.docs[0].data();
        console.log("Order data retrieved:", orderData); // Log to inspect the order data
        setOrder(orderData);
      } catch (err) {
        console.error('Failed to fetch order data:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrder();
  }, [navigate, orderId]);
  

  const formatPrice = (price) => {
    if (price !== undefined && price !== null) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return 'N/A'; 
  };
  


  const handleDownloadPDF = () => {
    const element = orderRef.current;
    const options = {
      margin: 1,
      filename: `order_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(options).save();
    setTimeout(() => {
        navigate(`/`);
      }, 1000);

  };

  if (loading) return <div>Loading...</div>;

  if (!order) return <div>No order found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border border-border rounded-lg shadow-lg">
      <div ref={orderRef} className="bg-white p-8 rounded-lg shadow-md border-2 border-text-blue-800">
        <div className="text-center mb-6">
          <img src={Logo} alt="Logo" className="mx-auto mb-4 h-32 w-32" />
          <h1 className="text-3xl font-bold text-brown-900">Elite Trading</h1>
          <p className="text-2xl text-muted-foreground font-bold">INVOICE #{orderId}</p>
        </div>
          <p className="text-xl text-muted-foreground">Billed To: {order.firstName} {order.lastName}</p>
          <p className="text-xl text-muted-foreground">Billing Address: {order.address}, {order.town}, {order.state}, {order.country}</p><br />

        {/* Table for Products */}
        <table className="min-w-full border-collapse border border-border mb-4">
          <thead>
            <tr className="bg-muted text-left">
              <th className="border border-border p-2 text-gray-700">ITEM DESCRIPTION</th>
              <th className="border border-border p-2 text-gray-700">QTY</th>
              <th className="border border-border p-2 text-gray-700">PRICE</th>
              <th className="border border-border p-2 text-gray-700">TOTAL</th>
            </tr>
          </thead>
          <tbody>
  {order.cartItems?.map((item) => (
    <tr key={item.id}>
      <td className="border border-border p-2">{item.name || 'Unnamed Item'}</td>
      <td className="border border-border p-2">{item.quantity || 0}</td>
      <td className="border border-border p-2">₹{item.offerPrice ? item.offerPrice : item.originalPrice}</td>
      <td className="border border-border p-2">
  ₹{item.offerPrice ? (item.offerPrice * item.quantity) : (item.originalPrice * item.quantity) || 0}
</td>

    </tr>
  ))}
</tbody>

        </table>

        {/* Payment Summary */}
        <div className="mt-4">
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">CART SUBTOTAL</span>
            <span>₹{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">SHIPPING</span>
            <span>Flat Rate: {order.shippingRate.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">ORDER TOTAL</span>
            <span>₹{order.orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span className="text-gray-700">Payment Method</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

        {/* Paid To Section */}
        <div className='flex justify-between'>
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-700">PAID TO</h2>
          <p>Elite Trading</p>
          <p>2347, New Modikhana, Camp, Pune - 1</p>
        </div>
<div>
<img src={sign} alt="sign" className="mt-5 h-20 w-32" />
</div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-6">
          <p className="text-2xl font-semibold text-brown-900">Thank You for Shopping with Elite Trading</p>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-sm text-muted-foreground">
          Elite Trading - 1223334444 - elitetradingclothingstore@gmail.com 
        </footer>
      </div>

      {/* Button to Save as PDF */}
      <div className="mt-6 text-center">
        <button
          className="bg-brown-900 text-yellow-200 px-4 py-2 rounded-lg focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300"
          onClick={handleDownloadPDF}
        >
          Save as PDF
        </button>
      </div>
    </div>
  );
};

export default OrderBill;
