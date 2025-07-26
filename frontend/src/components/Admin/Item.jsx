import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EpisodeTab() {
  const [subTab, setSubTab] = useState("create");
  const [storyId, setStoryId] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
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
    // handle form submission
  };

  const handelDelete = async (episodeId) => {
    // handle delete logic
  };

  const AllCatehory = [
    { _id: "1", title: "hello" },
    { _id: "2", title: "hello1" },
    { _id: "3", title: "hello2" },
    { _id: "4", title: "hello3" },
    { _id: "5", title: "hello4" },
  ];

  const AllEpisodes = [
    { _id: "1", title: "episode" },
    { _id: "2", title: "episode1" },
    { _id: "3", title: "episode2" },
    { _id: "4", title: "episode3" },
    { _id: "5", title: "episode4" },
  ];

  return (
    <div className="w-full">
      {/* Custom Tabs */}
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

      <AnimatePresence mode="wait">
        {subTab === "create" ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handelSubmitForm} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Add New Episode
              </h2>

              <select
                onChange={(e) => setStoryId(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option disabled selected>
                  Choose Story
                </option>
                {AllCatehory.map((story) => (
                  <option key={story._id} value={story._id}>
                    {story.title}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Episode Title"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />

              <input
                type="file"
                accept="image/*"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-0 hover:file:bg-blue-700"
                onChange={handleImageChange}
                required
              />

              <textarea
                placeholder="Episode Description"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all"
              >
                Create Episode
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="delete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Delete Episodes
            </h2>

            {false ? (
              <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center p-2 border border-gray-300 rounded-lg animate-pulse"
                  >
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="bg-red-500 text-white px-4 py-1 rounded opacity-50 pointer-events-none">
                      Delete
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2">
                {AllEpisodes.map((ep) => (
                  <li
                    key={ep._id}
                    className="flex justify-between items-center p-3 border border-gray-300 rounded-lg"
                  >
                    <span className="text-gray-700">{ep.title}</span>
                    <button
                      onClick={() => handelDelete(ep._id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-md transition-all"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
