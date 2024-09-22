import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../Firebase"; // Make sure your Firebase setup is correctly configured
import AdminSidebar from "./AdminSidebar"; // Import your Sidebar component

import { FaTrash } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    orderID: "",
    customerName: "",
    country: "",
    status: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "orders"),
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Replace null values with '-'
        const sanitizedOrders = fetchedOrders.map((order) => {
          return {
            ...order,
            orderID: order.orderID || "-",
            firstName: order.firstName || "-",
            lastName: order.lastName || "-",
            phone: order.phone || "-",
            address: order.address || "-",
            state: order.state || "-",
            country: order.country || "-",
            subtotal: order.subtotal || "-",
            shippingRate: order.shippingRate || "-",
            orderTotal: order.orderTotal || "-",
            orderDate: order.orderDate || "-",
            totalItems: order.totalItems || "-",
            status: order.status || "-",
          };
        });

        setOrders(sanitizedOrders);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (orderId, newStatus) => {
    const orderRef = doc(firestore, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await deleteDoc(doc(firestore, "orders", orderId));
    }
  };

  // Filter logic for orders
  const filteredOrders = orders.filter((order) => {
    // return (
    //   (filters.orderID === '' || order.orderID.includes(filters.orderID)) &&
    //   (filters.customerName === '' ||
    //     ((order.firstName + ' ' + order.lastName).toLowerCase().includes(filters.customerName.toLowerCase()))) &&
    //   (filters.country === '' || (order.country && order.country.toLowerCase().includes(filters.country.toLowerCase()))) &&
    //   (filters.status === '' || (order.status && order.status.toLowerCase().includes(filters.status.toLowerCase())))
    // );
    // return true;
    const matchesOrderID =
      filters.orderID === "" ||
      (order.orderID && order.orderID.includes(filters.orderID));
    const matchesCustomerName =
      filters.customerName === "" ||
      `${order.firstName} ${order.lastName}`
        .toLowerCase()
        .includes(filters.customerName.toLowerCase());
    const matchesCountry =
      filters.country === "" ||
      (order.country &&
        order.country.toLowerCase().includes(filters.country.toLowerCase()));
    const matchesStatus =
      filters.status === "" ||
      (order.status &&
        order.status.toLowerCase().includes(filters.status.toLowerCase()));

    return (
      matchesOrderID && matchesCustomerName && matchesCountry && matchesStatus
    );
  });

  return (
    <div className="flex min-h-screen text-brown-900">
      {/* Sidebar */}
      <AdminSidebar />
      <div className="container mx-auto p-4 ">
        <h1 className="text-3xl font-bold mb-4">Orders Manager</h1>
        {/* Filters */}
        <div className=" flex-col space-x-4 mb-4 md:flex-row space-y-4">
          <input
            type="text"
            placeholder="Order ID"
            className="bg-yellow-300 ml-4 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.orderID}
            onChange={(e) =>
              setFilters({ ...filters, orderID: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Customer Name"
            className="bg-yellow-300 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.customerName}
            onChange={(e) =>
              setFilters({ ...filters, customerName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Country"
            className="bg-yellow-300 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.country}
            onChange={(e) =>
              setFilters({ ...filters, country: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Status"
            className="bg-yellow-300 text-brown-900 placeholder-brown-900 px-4 py-2 rounded-lg focus:outline-none"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          />
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto shadow-2xl">
          <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 shadow-2xl rounded-2xl text-center">
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
                <th className="rounded-tr-3xl">Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-brown-900 ">{order.orderID}</td>
                  <td className="border border-brown-900 ">
                    {order.firstName} {order.lastName}
                  </td>
                  {/* <td>{order.email}</td> */}
                  <td className="border border-brown-900 ">{order.phone}</td>
                  <td className="border border-brown-900 ">{order.address}</td>
                  {/* <td>{order.town}</td> */}
                  <td className="border border-brown-900 ">{order.state}</td>
                  <td className="border border-brown-900 ">{order.country}</td>
                  <td className="border border-brown-900 ">{order.subtotal}</td>
                  <td className="border border-brown-900 ">
                    {order.shippingRate}
                  </td>
                  <td className="border border-brown-900 ">
                    {order.orderTotal}
                  </td>
                  <td className="border border-brown-900 ">
                    {order.orderDate}
                  </td>
                  <td className="border border-brown-900 ">
                    {order.totalItems}
                  </td>
                  <td className="border border-brown-900">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleUpdateStatus(order.id, e.target.value)
                      }
                      className="bg-transparent text-brown-900 px-2 py-1 rounded-lg"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="border border-brown-900">
                    <button onClick={() => handleDelete(order.id)}
                      className="text-brown-900 hover:bg-yellow-500 hover:scale-110 p-2 rounded"
                      >
                        <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
