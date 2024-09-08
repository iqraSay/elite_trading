import React, { useState } from 'react';
import { storage, firestore } from '../Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const AdminProductForm = () => {
  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [originalPrice, setOriginalPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [fabricType, setFabricType] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Upload images to Firebase Storage
      const imageRef = ref(storage, `products/${image.name}`);
      const backImageRef = ref(storage, `products/${backImage.name}`);
      
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      
      await uploadBytes(backImageRef, backImage);
      const backImageUrl = await getDownloadURL(backImageRef);

      // Store product data in Firestore
      const productData = {
        productId,
        name,
        imageUrl,
        backImageUrl,
        originalPrice,
        offerPrice,
        category,
        description,
        size,
        color,
        fabricType
      };

      await addDoc(collection(firestore, 'products'), productData);

      alert('Product added successfully!');
      // Reset form
      setProductId('');
      setName('');
      setImage(null);
      setBackImage(null);
      setOriginalPrice('');
      setOfferPrice('');
      setCategory('');
      setDescription('');
      setSize('');
      setColor('');
      setFabricType('');
    } catch (error) {
      console.error("Error:", error);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-yellow-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-brown-900">Add New Product</h2>

      {/* Product ID Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Product ID</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Image Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Back Image Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Back Image</label>
        <input
          type="file"
          onChange={(e) => setBackImage(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Original Price Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Original Price</label>
        <input
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Offer Price Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Offer Price (optional)</label>
        <input
          type="number"
          value={offerPrice}
          onChange={(e) => setOfferPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Category Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Description Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        ></textarea>
      </div>

      {/* Size Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Size</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Color Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Color</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Fabric Type Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Fabric Type</label>
        <input
          type="text"
          value={fabricType}
          onChange={(e) => setFabricType(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default AdminProductForm;
