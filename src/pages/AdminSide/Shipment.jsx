import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import { firestore } from '../../Firebase';
import { FaEdit, FaTrash } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import EditShipmentModal from '../../components/EditShipmentModal';
import AddShipmentModal from '../../components/AddShipmentModal';

const Shipment = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    shipmentID: '',
    orderID: '',
    vendorName: '',
    shipmentStatus: 'All',
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false); 
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);

  useEffect(() => {
    fetchShipments();
  }, [filters]);

  const fetchShipments = async () => {
    setLoading(true);
    try {
        const q = query(collection(firestore, 'shipments'));
        const querySnapshot = await getDocs(q);
        const allShipmentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
        // Apply local filtering
        const filteredShipments = allShipmentsData.filter(shipment => {
          return (
            (filters.shipmentID === '' || shipment.shipmentID.toString().toLowerCase().includes(filters.shipmentID.toLowerCase())) &&
        (filters.orderID === '' || shipment.orderID.toString().toLowerCase().includes(filters.orderID.toLowerCase())) &&
       (filters.vendorName === '' || shipment.vendorName?.toLowerCase().includes(filters.vendorName.toLowerCase())) &&
            (filters.shipmentStatus === 'All' || shipment.shipmentStatus === filters.shipmentStatus)
          );
        });
    
        setShipments(filteredShipments);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      } finally {
        setLoading(false);
      }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this shipment?');
    if (confirmDelete) {
      await deleteDoc(doc(firestore, 'shipments', id));
      fetchShipments();
    }
  };

  const handleEdit = (id) => {
    setSelectedShipmentId(id);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedShipmentId(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false); 
  };


  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='flex'>
        <AdminSidebar/>
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-brown-900 text-2xl font-bold mb-4">Shipment Details</h1>

      {/* Filters Section */}
      <div className="flex space-x-4 mb-4">
      <button
          className="bg-brown-900 text-yellow-200 px-4 py-2 rounded-lg focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300"
          onClick={openAddModal}
        >
          Add Shipment
        </button>
      <input
          type="text"
          name="shipmentID"
          placeholder="Shipment ID"
          value={filters.shipmentID}
          onChange={handleFilterChange}
          className="p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
        />
        <input
        type="text"
        name="orderID"
        placeholder="Order ID"
        value={filters.orderID}
        onChange={handleFilterChange}
        className="p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
      />
        <input
          type="text"
          name="vendorName"
          placeholder="Vendor Name"
          value={filters.vendorName}
          onChange={handleFilterChange}
          className="p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
        />
        <select
          name="shipmentStatus"
          value={filters.shipmentStatus}
          onChange={handleFilterChange}
          className="p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      
      </div>

      {/* Shipment Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-2xl shadow-2xl border-none">
          <thead className='bg-brown-900 text-yellow-500 h-12 text-xl'>
            <tr>
              <th className="px-4 py-2 rounded-tl-3xl">Shipment ID</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Vendor Name</th>
              <th className="px-4 py-2">Shipment Status</th>
              <th className="px-4 py-2">Shipment Date</th>
              <th className="px-4 py-2">Estimated Delivery Date</th>
              <th className="px-4 py-2">Tracking Number</th>
              <th className="px-4 py-2">Destination Address</th>
              <th className="px-4 py-2 rounded-tr-3xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id} className='text-center hover:bg-yellow-500'>
                <td className=" px-4 py-2">{shipment.shipmentID}</td>
                <td className=" px-4 py-2">{shipment.orderID}</td>
                <td className=" px-4 py-2">{shipment.vendorName}</td>
                <td className=" px-4 py-2">{shipment.shipmentStatus}</td>
                <td className=" px-4 py-2">{shipment.shipmentDate}</td>
                <td className=" px-4 py-2">{shipment.deliveryDate}</td>
                <td className=" px-4 py-2">{shipment.trackingNumber}</td>
                <td className=" px-4 py-2">{shipment.destinationAddress}</td>
                <td className=" px-4 py-2 flex space-x-2">
                  <button
                    className=" text-brown-900 hover:bg-yellow-500 hover:scale-110 p-2 rounded"
                    onClick={() => handleEdit(shipment.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className=" text-brown-900 hover:bg-yellow-500 hover:scale-110 p-2 rounded"
                    onClick={() => handleDelete(shipment.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <AddShipmentModal
        isOpen={addModalOpen}
        onClose={closeAddModal}
        refreshShipments={fetchShipments}
      />
        <EditShipmentModal
        shipmentId={selectedShipmentId}
        isOpen={editModalOpen}
        onClose={closeEditModal}
        refreshShipments={fetchShipments}
      />
    </div>
    </div>
  );
};

export default Shipment;
