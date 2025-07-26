import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";

const MenuSection = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories from the database
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(
          Array.isArray(response.data.allCategory)
            ? response.data.allCategory
            : []
        );
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Fallback to an empty array
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (categoryName) => {
    if (!categoryName.trim()) {
      alert("You cannot enter an empty value");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/category", {
        name: categoryName.trim(),
      });
      setCategories((prevCategories) =>
        Array.isArray(prevCategories)
          ? [...prevCategories, response.data.category]
          : [response.data.category]
      );
      setCategoryName("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:5000/api/category/${categoryId}`);
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  // Filter categories based on search term
  const filteredCategories = (categories || []).filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };
  // If a category is selected, show the CategoryItem component
  if (selectedCategory) {
    return (
      <CategoryItem
        category={selectedCategory}
        onBack={handleBackToCategories}
      />
    );
  }

  return (
    <>
      <h1 className="text-center text-2xl mb-3">Menu Categories</h1>
      {/* categories*/}
      <div>
        {/* search category*/}
        <div className="flex sm:mx-10 md:mx-20 lg:mx-40 mb-3">
          <input
            type="text"
            placeholder="Search categories"
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
        {/* add category*/}
        <div className="flex sm:mx-10 md:mx-20 lg:mx-40 mb-3">
          <input
            type="text"
            placeholder="Add category"
            className="border border-gray-400 rounded-md px-5 py-2 w-full md:mx-8"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <button
            onClick={() => addCategory(categoryName)}
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded ml-3"
          >
            Add
          </button>
        </div>
      </div>
      <div>
        <ul className="grid grid-cols-1  gap-y-4 mx-auto max-w-screen-lg">
          {filteredCategories.map((category) => (
            <li
              key={category._id}
              className="rounded-xl shadow-md bg-[#e0f3f3] p-4 flex items-center justify-between cursor-pointer transition duration-300 ease-in-out transform hover:-translate-y-0.3 hover:scale-103  "
            >
              <p
                className="font-semibold text-lg cursor-pointer flex-1"
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCategory(category._id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MenuSection;
