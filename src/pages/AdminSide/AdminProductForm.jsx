import React, { useState } from 'react';
import { storage, firestore } from '../../Firebase';
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
  const [material, setMaterial] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!productId) newErrors.productId = 'Product ID is required.';
    if (!name) newErrors.name = 'Product name is required.';
    if (!image) newErrors.image = 'Product image is required.';
    if (!backImage) newErrors.backImage = 'Back image is required.';
    if (!originalPrice) newErrors.originalPrice = 'Original price is required.';
    if (!description) newErrors.description = 'Description is required.';
    if (!size) newErrors.size = 'Size is required.';
    if (!color) newErrors.color = 'Color is required.';
    if (!material) newErrors.material = 'Material is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const imageRef = ref(storage, `products/${image.name}`);
      const backImageRef = ref(storage, `products/${backImage.name}`);

      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await uploadBytes(backImageRef, backImage);
      const backImageUrl = await getDownloadURL(backImageRef);

      const productData = {
        productId,
        name,
        imageUrl,
        backImageUrl,
        originalPrice: parseInt(originalPrice),
        offerPrice: offerPrice ? parseInt(offerPrice) : 0,
        category,
        description,
        size,
        color,
        material,
      };

      await addDoc(collection(firestore, 'products'), productData);
      alert('Product added successfully!');
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
      setMaterial('');
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding product');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-lg lg:max-w-full lg:w-4/5 mx-auto p-6 bg-gradient-to-b from-white to-yellow-200 rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-4 fade-in"
    >
      <h2 className="col-span-1 lg:col-span-2 text-center text-2xl font-bold mb-4 text-brown-900">Add New Product</h2>

      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Product ID</label>
        <input
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.productId && <p className="text-red-500">{errors.productId}</p>}
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
        {errors.name && <p className="text-red-500">{errors.name}</p>}
      </div>

      {/* Image Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full px-4 py-2 cursor-pointer"
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}
      </div>

      {/* Back Image Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Back Image</label>
        <input
          type="file"
          onChange={(e) => setBackImage(e.target.files[0])}
          className="w-full px-4 py-2 cursor-pointer"
        />
        {errors.backImage && <p className="text-red-500">{errors.backImage}</p>}
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
        {errors.originalPrice && <p className="text-red-500">{errors.originalPrice}</p>}
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
  <select
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
  >
    <option value="" disabled>Select a category</option>
    <option value="Hoodie">Hoodie</option>
    <option value="Shirt">Shirt</option>
    <option value="Tshirt">Tshirt</option>
    <option value="Shoes">Shoes</option>
    <option value="Jewelry">Jewelry</option>
    <option value="Gown">Gown</option>
    <option value="Watch">Watch</option>
    <option value="Dress">Dress</option>
    <option value="Kurti">Kurti</option>
    <option value="Suit">Suit</option>
  </select>
  {errors.category && <p className="text-red-500">{errors.category}</p>}
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
        {errors.size && <p className="text-red-500">{errors.size}</p>}
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
        {errors.color && <p className="text-red-500">{errors.color}</p>}
      </div>

      {/* Material Field */}
      <div className="mb-4">
        <label className="block text-brown-900 mb-2">Material</label>
        <input
          type="text"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        {errors.material && <p className="text-red-500">{errors.material}</p>}
      </div>

      {/* Description Field */}
      <div className="mb-4 lg:col-span-2">
        <label className="block text-brown-900 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        ></textarea>
        {errors.description && <p className="text-red-500">{errors.description}</p>}
      </div>
      {/* Submit Button */}
      <div className="mb-4 col-span-1 lg:col-span-2">
        <button 
          type="submit"
          className="w-full py-2 bg-brown-900 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-brown-900 border-brown-900"
        >
          Add Product
        </button>
      </div>
    </form>
  );
};

export default AdminProductForm;
