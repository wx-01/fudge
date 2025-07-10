import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryTab() {
  const [subTab, setSubTab] = useState("create");

  return (
    <div className="w-full">
      {/* Custom Sub-tabs */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 border 
            ${
              subTab === "create"
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          onClick={() => setSubTab("create")}
        >
          ➕ Create
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 border 
            ${
              subTab === "delete"
                ? "bg-red-600 text-white border-red-600 shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          onClick={() => setSubTab("delete")}
        >
          ❌ Delete
        </button>
      </div>

      {/* Animated Switch */}
      <AnimatePresence mode="wait">
        {subTab === "create" ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CreateCategoryForm />
          </motion.div>
        ) : (
          <motion.div
            key="delete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DeleteCategoryList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ========================== FORMS ===============================

function CreateCategoryForm() {
  const [formData, setFormData] = useState({
    img: null,
    title: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handelSubmitForm = async (e) => {
    e.preventDefault();
    // await createCategory(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handelSubmitForm}>
      <h2 className="text-xl font-semibold text-gray-800">Add New Category</h2>

      <input
        type="text"
        placeholder="Category title"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="text"
        placeholder="Category description"
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 hover:file:bg-blue-700"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
      >
        Create Category
      </button>
    </form>
  );
}

function DeleteCategoryList() {
  const storyTypes = [
    { _id: 1, title: "hello" },
    { _id: 2, title: "lol" },
    { _id: 3, title: "boom" },
  ];

  const handleDelete = async (id) => {
    // await deleteCategory(id);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Delete Categories</h2>
      <ul className="space-y-3">
        {storyTypes.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center p-3 border border-gray-300 rounded-lg shadow-sm"
          >
            <span className="text-gray-700">{cat.title}</span>
            <button
              onClick={() => handleDelete(cat._id)}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md transition-all"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
