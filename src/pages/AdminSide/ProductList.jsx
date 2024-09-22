import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../../Firebase";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [filters, setFilters] = useState({ category: "", name: "", size: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const productList = querySnapshot.docs.map((doc) => {
        const productData = doc.data();
        return {
          pid: productData.id,
          docID: doc.id,
          ...productData,
        };
      });
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleSaveChanges = async () => {
    if (selectedProduct) {
      const { docID, ...productData } = selectedProduct;
      const productRef = doc(firestore, "products", docID);
  
      const validProductData = Object.fromEntries(
        Object.entries(productData).filter(([_, v]) => v !== undefined)
      );
  
      try {
        const docSnap = await getDoc(productRef);
  
        if (docSnap.exists()) {
          await updateDoc(productRef, validProductData);
          console.log("Product updated successfully.");
        } else {
          console.error("No document found with ID:", docID);
        }
  
        setShowPopup(false);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };
  

  const handleRemove = async (docID) => {
    await deleteDoc(doc(firestore, "products", docID));
    setProducts(products.filter((product) => product.docID !== docID));
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (filters.category === "" || product.category?.includes(filters.category)) &&
      (filters.name === "" || product.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (filters.size === "" || product.size?.includes(filters.size))
    );
  });

  return (
    <div className="flex">
      <AdminSidebar />
      <div className=" text-brown-900 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>

        {/* Filter Section */}
        <div className="mb-4 space-y-2">
          <input
            type="text"
            name="category"
            placeholder="Filter by Category"
            value={filters.category}
            onChange={handleFilterChange}
            className="mr-4 p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mb-2"
          />
          <input
            type="text"
            name="name"
            placeholder="Filter by Name"
            value={filters.name}
            onChange={handleFilterChange}
            className="mr-4 p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mt-4"
          />
          <input
            type="text"
            name="size"
            placeholder="Filter by Size"
            value={filters.size}
            onChange={handleFilterChange}
            className="mr-4 p-2 rounded bg-yellow-300 text-brown-900 placeholder-brown-900 mt-4"
          />

          <button className="bg-brown-900 text-yellow-200 px-4 py-2 rounded-lg focus:outline-none hover:bg-yellow-500 hover:text-brown-900 transition duration-300">
            <Link to="/AdminProductForm">Add Product</Link>
          </button>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto shadow-2xl">
          <table className="min-w-full bg-gradient-to-br from-white to-yellow-200 text-brown-900 rounded-lg shadow-2xl">
            <thead className="bg-brown-900 text-yellow-500 h-12 text-xl">
              <tr>
                <th className="py-2 rounded-tl-3xl">Sr. No.</th>
                <th className="py-2">Product ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Category</th>
                <th className="py-2">Size</th>
                <th className="py-2">Color</th>
                <th className="py-2">Price</th>
                <th className="py-2">Edit</th>
                <th className="py-2 rounded-tr-3xl">Remove</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={product.docID} className="text-center hover:bg-yellow-500">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{product.pid}</td>
                  <td className="py-2">{product.name}</td>
                  <td className="py-2">{product.category}</td>
                  <td className="py-2">{product.size == null ? "-" : product.size}</td>
                  <td className="py-2">{product.color == null ? "-" : product.color}</td>
                  <td className="py-2">₹{product.offerPrice ?? product.originalPrice}</td>
                  <td className="py-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-transparent text-brown-900 hover:bg-yellow-500 hover:scale-110 p-2 rounded"
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => handleRemove(product.docID)}
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

        {/* Popup for Editing Product */}
        {showPopup && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-yellow-200 p-6 rounded text-brown-900">
              <h2 className="text-xl font-bold mb-4">Edit Product</h2>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-brown-900">Category</label>
                <select
                  value={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
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
              </div>
              <div className="mb-4">
                <label className="block mb-2">Size</label>
                <input
                  type="text"
                  value={selectedProduct.size ?? ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      size: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Color</label>
                <input
                  type="text"
                  value={selectedProduct.color ?? ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      color: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Original Price</label>
                <input
                  type="number"
                  value={selectedProduct.originalPrice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      originalPrice: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Offer Price</label>
                <input
                  type="number"
                  value={selectedProduct.offerPrice ?? ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      offerPrice: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white w-full"
                />
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={!selectedProduct.offerPrice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      offerPrice: e.target.checked ? "" : selectedProduct.offerPrice,
                    })
                  }
                  className="mr-2"
                />
                <label>Remove Offer Price</label>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleSaveChanges}
                  className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
