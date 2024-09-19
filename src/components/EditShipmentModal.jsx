import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';

const EditShipmentModal = ({ shipmentId, isOpen, onClose, refreshShipments }) => {
  const [formData, setFormData] = useState({
    vendorName: '',
    shipmentStatus: '',
    trackingNumber: '',
    destinationAddress: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && shipmentId) {
      fetchShipmentDetails(shipmentId);
    }
  }, [isOpen, shipmentId]);

  const fetchShipmentDetails = async (id) => {
    setLoading(true);
    const docRef = doc(firestore, 'shipments', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFormData(docSnap.data());
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const docRef = doc(firestore, 'shipments', shipmentId);
    await updateDoc(docRef, formData);

    setLoading(false);
    onClose(); // Close the modal after successful update
    refreshShipments(); // Refresh the shipments table after update
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-lg p-6 shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Shipment</h2>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Vendor Name</label>
              <input
                type="text"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-brown-900 placeholder-brown-900"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Shipment Status</label>
              <select
                name="shipmentStatus"
                value={formData.shipmentStatus}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-brown-900 placeholder-brown-900"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Tracking Number</label>
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-brown-900 placeholder-brown-900"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Destination Address</label>
              <textarea
                name="destinationAddress"
                value={formData.destinationAddress}
                onChange={handleInputChange}
                className="w-full p-2 rounded text-brown-900 placeholder-brown-900"
                rows="3"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="bg-brown-900 text-yellow-200 px-4 py-2 rounded-lg focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300 mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-brown-900 text-yellow-200 px-4 py-2 rounded-lg focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditShipmentModal;
