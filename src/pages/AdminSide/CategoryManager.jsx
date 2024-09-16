import React, { useState, useEffect } from 'react';
import { firestore, getCategory } from '../../Firebase';
import {collection, addDoc, getDocs } from 'firebase/firestore';
import AdminSidebar from './AdminSidebar';

const CategoryManager = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categoryTypeFilter, setCategoryTypeFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryType, setCategoryType] = useState('');


  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'categories'));
      const fetchedCategories = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCategories(fetchedCategories);
      setFilteredCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  // Handle form submission
  const handleSubmit = async () => {
    if (category && categoryType) {
      try {
        await addDoc(collection(firestore, 'categories'), { category, categoryType });
        setCategory('');
        setCategoryType('');
        setShowPopup(false);
        fetchCategories(); // Fetch the updated list of categories
      } catch (error) {
        console.error("Error adding category: ", error);
      }
    }
  };
  

  useEffect(() => {
    getCategory().then(fetchedCategory => {
      const sanitizedCategory = fetchedCategory.map(cat => ({
        category: cat.category || '',
        categoryType: cat.categoryType || ''
      }));
      setCategories(sanitizedCategory);
      setFilteredCategories(sanitizedCategory);
    });
  }, []);

  useEffect(() => {
    const filtered = categories.filter(cat => 
      cat.categoryType.toLowerCase().includes(categoryTypeFilter.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categoryTypeFilter, categories]);

  return (
    <div className="flex">
      {/* AdminSidebar should be defined elsewhere in your project */}
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 p-8 text-brown-900 h-screen">
        <h1 className="text-2xl font-bold mb-4">Category Manager</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Filter by Category Type"
            className="mr-4 p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
            value={categoryTypeFilter}
            onChange={(e) => setCategoryTypeFilter(e.target.value)}
          />
          <button
            onClick={() => setShowPopup(true)}
            className="bg-brown-900 text-yellow-200 p-2 rounded mb-4 focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300"
          >
            Add Category
          </button>
        </div>

          <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-lg shadow-2xl text-center">
            <thead className='bg-brown-900 text-yellow-500 h-12 text-xl'>
              <tr>
                <th className="py-2 px-4 rounded-tl-3xl">Sr. No</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4 rounded-tr-3xl">Category Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, index) => (
                <tr key={index} className="hover:bg-yellow-500">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{cat.category}</td>
                  <td className="py-2 px-4">{cat.categoryType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-br from-white to-yellow-200 text-brown-900 text-center p-8 rounded shadow-lg">
              <h2 className="text-xl font-bold mb-4">Add New Category</h2>
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="placeholder-brown-900 p-2 mb-4 w-full"
              />
              <input
                type="text"
                placeholder="Category Type"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="placeholder-brown-900 p-2 mb-4 w-full"
              />
              <button
                onClick={handleSubmit}
                className="bg-brown-900 text-yellow-200 focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300 p-2 rounded mr-4"
              >
                Submit
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-brown-900 text-yellow-200 focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryManager;
