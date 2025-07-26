import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryItem = ({ category, onBack }) => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch items from the database for the given category
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/item/${category._id}`
        );
        setItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [category._id]);

  const addItem = async () => {
    if (!itemName.trim() || !itemDescription.trim() || !itemPrice.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const price = parseFloat(itemPrice);
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/item/${category._id}`,
        {
          name: itemName.trim(),
          description: itemDescription.trim(),
          price: price,
        }
      );

      if (response.status === 201) {
        alert("Item added successfully");
        setItems([...items, response.data.MenuItem]);
        setItemName("");
        setItemDescription("");
        setItemPrice("");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/item/${itemId}`);
      setItems(items.filter((item) => item._id !== itemId)); // Use _id instead of id
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item. Please try again.");
    }
  };

  // Filter items based on search term
  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">{category.name} Items</h1>
      </div>

      {/* Search items */}
      <div className="flex sm:mx-10 md:mx-20 lg:mx-40 mb-3">
        <input
          type="text"
          placeholder="Search items"
          className="border border-gray-400 rounded-md px-5 py-2 w-full md:mx-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setSearchTerm("")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-3"
        >
          Clear
        </button>
      </div>

      {/* Add item form */}
      <div className="sm:mx-10 md:mx-20 lg:mx-40 mb-6 p-4 border border-gray-300 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Add New Item</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Item name"
            className="border border-gray-400 rounded-md px-4 py-2"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price ($)"
            className="border border-gray-400 rounded-md px-4 py-2"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
          />
        </div>

        <textarea
          placeholder="Item description"
          className="border border-gray-400 rounded-md px-4 py-2 w-full mb-4"
          rows="3"
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
        />

        <button
          onClick={addItem}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
        >
          Add Item
        </button>
      </div>

      {/* Items list */}
      <div>
        <ul className="grid grid-cols-1 gap-y-4 mx-auto max-w-screen-lg">
          {filteredItems.map((item) => (
            <li
              key={item._id} // Use _id instead of id
              className="rounded-xl shadow-md bg-white p-6 border border-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => deleteItem(item._id)} // Use _id instead of id
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            {searchTerm
              ? "No items found matching your search."
              : "No items in this category yet."}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryItem;
