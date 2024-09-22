import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../Firebase";

const AddShipmentModal = ({ isOpen, onClose, refreshShipments }) => {
  const [formData, setFormData] = useState({
    shipmentID: "",
    orderID: "",
    vendorName: "",
    shipmentDate: "",
    deliveryDate: "",
    shipmentStatus: "Pending",
    trackingNumber: "",
    destinationAddress: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(firestore, "shipments"), formData);
      onClose();
      refreshShipments();
    } catch (error) {
      console.error("Error adding shipment: ", error);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-lg p-6 shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add Shipment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">Shipment ID</label>
              <input
                type="text"
                name="shipmentID"
                value={formData.shipmentID}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg text-brown-900 placeholder-brown-900"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Order ID</label>
              <input
                type="text"
                name="orderID"
                value={formData.orderID}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg text-brown-900 placeholder-brown-900"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Vendor Name</label>
              <input
                type="text"
                name="vendorName"
                value={formData.vendorName}
                onChange={handleInputChange}
                className="w-full p-2 rounded-lg text-brown-900 placeholder-brown-900"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Shipment Status
              </label>
              <select
                name="shipmentStatus"
                value={formData.shipmentStatus}
                onChange={handleInputChange}
                className="w-full p-2 text-brown-900 placeholder-brown-900 rounded-lg"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Shipment Date</label>
              <input
                type="date"
                name="shipmentDate"
                value={formData.shipmentDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Estimated Delivery Date
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Tracking Number
              </label>
              <input
                type="text"
                name="trackingNumber"
                value={formData.trackingNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">
                Destination Address
              </label>
              <textarea
                name="destinationAddress"
                value={formData.destinationAddress}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
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
                {loading ? "Adding..." : "Add Shipment"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShipmentModal;
