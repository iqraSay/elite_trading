import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faUsers,
  faBoxes,
  faShippingFast,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import AdminSidebar from "./AdminSidebar";
import { firestore } from "../../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
} from "chart.js";

// Register necessary components
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController
);

const Dashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [productsAvailable, setProductsAvailable] = useState(0);
  const [pendingShipments, setPendingShipments] = useState(0);
  const [profit, setProfit] = useState(0);
  const [weeklySalesData, setWeeklySalesData] = useState([]);
  const [weeklyOrdersData, setWeeklyOrdersData] = useState([]);
  const [onlineVisitors, setOnlineVisitors] = useState([]);
  const [profitData, setProfitData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const customersSnapshot = await getDocs(collection(firestore, "users"));
      setTotalCustomers(customersSnapshot.size);

      const ordersSnapshot = await getDocs(collection(firestore, "orders"));
      setTotalOrders(ordersSnapshot.size);

      const productsSnapshot = await getDocs(collection(firestore, "products"));
      setProductsAvailable(productsSnapshot.size);

      const pendingOrdersQuery = query(
        collection(firestore, "orders"),
        where("status", "==", "pending")
      );
      const pendingOrdersSnapshot = await getDocs(pendingOrdersQuery);
      setPendingShipments(pendingOrdersSnapshot.size);

      // const profitValue = ordersSnapshot.docs.reduce(
      //   (acc, order) => acc + order.data().profit,
      //   0
      // );
      const profitValue = ordersSnapshot.docs.reduce((acc, order) => {
        const profit = order.data().profit;
        return acc + (typeof profit === 'number' ? profit : 0);
    }, 0);
    
      setProfit(profitValue);

      // Dummy data for graphs
      setWeeklySalesData([
        { date: "Week 1", sales: 1000 },
        { date: "Week 2", sales: 1500 },
      ]);
      setWeeklyOrdersData([
        { date: "Week 1", orders: 40 },
        { date: "Week 2", orders: 50 },
      ]);
      setOnlineVisitors([
        { date: "Day 1", visitors: 150 },
        { date: "Day 2", visitors: 200 },
      ]);
      setProfitData([
        { date: "Week 1", profit: 800 },
        { date: "Week 2", profit: 1200 },
      ]);

      const recentOrdersSnapshot = await getDocs(
        collection(firestore, "orders")
      );
      const orders = recentOrdersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 5);
      setRecentOrders(orders);

      const recentShipmentsSnapshot = await getDocs(
        collection(firestore, "shipments")
      );
      const shipments = recentShipmentsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .slice(0, 5);
      setRecentShipments(shipments);
    };

    fetchData();
  }, []);

  const salesChartData = {
    labels: weeklySalesData.map((data) => data.date),
    datasets: [
      {
        label: "Weekly Sales",
        data: weeklySalesData.map((data) => data.sales),
        borderColor: "rgba(42, 0, 0, 1)", // Yellow
        backgroundColor: "rgba(42, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const ordersChartData = {
    labels: weeklyOrdersData.map((data) => data.date),
    datasets: [
      {
        label: "Weekly Orders",
        data: weeklyOrdersData.map((data) => data.orders),
        borderColor: "rgba(42, 0, 0, 1)",
        backgroundColor: "rgba(42, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const profitChartData = {
    labels: profitData.map((data) => data.date),
    datasets: [
      {
        label: "Profit Over Time",
        data: profitData.map((data) => data.profit),
        borderColor: "rgba(42, 0, 0, 1)",
        backgroundColor: "rgba(42, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  const visitorsChartData = {
    labels: onlineVisitors.map((data) => data.date),
    datasets: [
      {
        label: "Online Visitors",
        data: onlineVisitors.map((data) => data.visitors),
        borderColor: "rgba(42, 0, 0, 1)",
        backgroundColor: "rgba(42, 0, 0, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-10 h-auto">
        <h1 className="text-3xl font-bold mb-4 md:text-left text-center">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-brown-900 text-yellow-200 p-6 shadow-xl rounded-lg text-center">
            <FontAwesomeIcon icon={faUsers} className="w-12 h-12" />
            <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
            <p className="text-3xl">{totalCustomers}</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow-xl rounded-lg text-center">
            <FontAwesomeIcon icon={faClipboardList} className="w-12 h-12" />
            <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
            <p className="text-3xl">{totalOrders}</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow-xl rounded-lg text-center">
            <FontAwesomeIcon icon={faBoxes} className="w-12 h-12" />
            <h2 className="text-xl font-semibold mb-2">Products Available</h2>
            <p className="text-3xl">{productsAvailable}</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow-xl rounded-lg text-center">
            <FontAwesomeIcon icon={faShippingFast} className="w-12 h-12" />
            <h2 className="text-xl font-semibold mb-2">Pending Shipments</h2>
            <p className="text-3xl">{pendingShipments}</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow-xl rounded-lg text-center">
            <FontAwesomeIcon icon={faMoneyBill1Wave} className="w-12 h-12" />
            <h2 className="text-xl font-semibold mb-2">Profit</h2>
            <p className="text-3xl">₹{profit}</p>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 shadow-2xl p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 ">
              Weekly Sales
            </h2>
            <Line data={salesChartData} />
          </div>
          <div className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 shadow-2xl p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 ">
              Weekly Orders
            </h2>
            <Line data={ordersChartData} />
          </div>
          <div className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 shadow-2xl p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 ">
              Online Visitors
            </h2>
            <Line data={visitorsChartData} />
          </div>
          <div className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 shadow-2xl p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 ">
              Profit Over Time
            </h2>
            <Line data={profitChartData} />
          </div>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Recent Orders Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto shadow-2xl">
              <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-2xl shadow-2xl border-none">
                <thead className="bg-brown-900 text-yellow-500 h-12  uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Customer</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Date</th>
                  </tr>
                </thead>
                <tbody >
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      
                    >
                      <td className="py-3 px-6">{order.orderID}</td>
                      <td className="py-3 px-6">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="py-3 px-6">{order.status}</td>
                      <td className="py-3 px-6">{order.orderDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Shipments Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Recent Shipments</h2>
            <div className="overflow-x-auto shadow-2xl">
              <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-2xl shadow-2xl border-none">
                <thead className="bg-brown-900 text-yellow-500 h-12  uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">ID</th>
                    <th className="py-3 px-6 text-left">Order ID</th>
                    <th className="py-3 px-6 text-left">Status</th>
                    <th className="py-3 px-6 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentShipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6">{shipment.shipmentID}</td>
                      <td className="py-3 px-6">{shipment.orderID}</td>
                      <td className="py-3 px-6">{shipment.shipmentStatus}</td>
                      <td className="py-3 px-6">{shipment.shipmentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
