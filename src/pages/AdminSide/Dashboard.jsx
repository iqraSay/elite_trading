import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoneyBill1Wave, faUsers, faBoxes, faShippingFast, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import AdminSidebar from './AdminSidebar'; // Import the AdminSidebar component

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100 h-screen">
        <h1 className="text-3xl font-bold mb-4 md:text-left text-center">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Example Dashboard Cards */}
          <div className="bg-brown-900 text-yellow-200 p-6 shadow rounded-lg text-center">
          <FontAwesomeIcon icon={faUsers} className='w-12 h-12' />
            <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
            <p className="text-3xl">350</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow rounded-lg text-center">
          <FontAwesomeIcon icon={faClipboardList} className='w-12 h-12' />
            <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
            <p className="text-3xl">1200</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow rounded-lg text-center">
          <FontAwesomeIcon icon={faBoxes} className='w-12 h-12' />
            <h2 className="text-xl font-semibold mb-2">Products Available</h2>
            <p className="text-3xl">530</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow rounded-lg text-center">
          <FontAwesomeIcon icon={faShippingFast} className='w-12 h-12' />
            <h2 className="text-xl font-semibold mb-2">Pending Shipments</h2>
            <p className="text-3xl">45</p>
          </div>
          <div className="bg-brown-900 text-yellow-200 p-6 shadow rounded-lg text-center">
          <FontAwesomeIcon icon={faMoneyBill1Wave} className='w-12 h-12' />
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-3xl">$120,000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
