import React from 'react';

const SizeChart = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500  transition-colors duration-300 hover:bg-transparent hover:text-xl hover:text-gray-900"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">Size Chart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card p-4 rounded-lg shadow">
            <table className="min-w-full border border-border">
              <thead>
                <tr className="bg-secondary text-secondary-foreground">
                  <th className="border border-border p-2">Size</th>
                  <th className="border border-border p-2">Chest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2">S</td>
                  <td className="border border-border p-2">32-34</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">M</td>
                  <td className="border border-border p-2">34-36</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">L</td>
                  <td className="border border-border p-2">36-38</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">XL</td>
                  <td className="border border-border p-2">39-41</td>
                </tr>
                <tr>
                  <td className="border border-border p-2">XXL</td>
                  <td className="border border-border p-2">42-44</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-card p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Measuring T-Shirt Size</h3>
            <p>Not sure about your t-shirt size? Follow these simple steps to figure it out:</p>
            <ul className="list-disc list-inside mt-2">
              <li>
                <strong>Shoulder:</strong> Measure the shoulder at the back, from edge to edge with arms relaxed on both sides.
              </li>
              <li>
                <strong>Chest:</strong> Measure around the body under the arms at the fullest part of the chest with your arms relaxed at both sides.
              </li>
              <li>
                <strong>Sleeve:</strong> Measure from the shoulder seam through the outer arm to the cuff/hem.
              </li>
              <li>
                <strong>Neck:</strong> Measured horizontally across the neck.
              </li>
              <li>
                <strong>Length:</strong> Measure from the highest point of the shoulder seam to the bottom hem of the garment.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
