import React, { useState, useEffect } from "react";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../Firebase"; // Make sure your Firebase setup is correctly configured
import AdminSidebar from "./AdminSidebar"; // Import your Sidebar component

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: "",
    customerName: "",
    orderTotal: "",
    status: "",
    itemCount: ""
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, "orders"), (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await deleteDoc(doc(firestore, "orders", orderId));
    }
  };

  // Filter logic for date, customer name, etc. will go here
  const filteredOrders = orders.filter(order => {
    // Apply filters based on the filter state variables
    
    return true; // Modify this to apply actual filtering logic
  });

  return (
    <div className="flex min-h-screen text-brown-900">
      {/* Sidebar */}
      <AdminSidebar />
      <div className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-4">Orders Manager</h1>
        {/* Filters */}
        <div className="mb-6 space-y-4 space-x-2">
          <input
            type="text"
            placeholder="Order ID"
            className="bg-yellow-300 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.orderID}
            onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="bg-yellow-300 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.customerName}
            onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Country"
            className="bg-yellow-300 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Status"
            className="bg-yellow-300 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
          />
        </div>
        

        {/* Orders Table */}
        <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-2xl shadow-2xl text-center">
          <thead className="bg-brown-900 text-yellow-500 h-12 text-xl">
            <tr>
              <th className="rounded-tl-3xl">Order ID</th>
              <th>Customer Name</th>
              {/* <th>Email</th> */}
              <th>Phone</th>
              <th>Address</th>
              {/* <th>Town</th> */}
              <th>State</th>
              <th>Country</th>
              <th>Subtotal</th>
              <th>Shipping Rate</th>
              <th>Order Total</th>
              <th>Order Date</th>
              <th>Items Count</th>
              <th>Status</th>
              <th className="rounded-tr-3xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t border-brown-900 ">
                <td className="border border-brown-900 ">{order.orderID}</td>
                <td className="border border-brown-900 ">{order.firstName} {order.lastName}</td>
                {/* <td>{order.email}</td> */}
                <td className="border border-brown-900 ">{order.phone}</td>
                <td className="border border-brown-900 ">{order.address}</td>
                {/* <td>{order.town}</td> */}
                <td className="border border-brown-900 ">{order.state}</td>
                <td className="border border-brown-900 ">{order.country}</td>
                <td className="border border-brown-900 ">{order.subtotal}</td>
                <td className="border border-brown-900 ">{order.shippingRate}</td>
                <td className="border border-brown-900 ">{order.orderTotal}</td>
                <td className="border border-brown-900 ">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="border border-brown-900 ">{order.itemsCount}</td>
                <td className="border border-brown-900">{order.status}</td>
                <td>
                  <button
                    className="bg-brown-900 text-yellow-200 px-4 py-2 rounded-lg focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300"
                    onClick={() => handleDelete(order.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
