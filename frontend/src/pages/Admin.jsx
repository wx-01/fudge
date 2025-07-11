import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryTab from "../components/Admin/CategoryTab.jsx";
import StoryTab from "../components/Admin/Itme.jsx";

export default function AdminTabsPanel() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ["Create Category", "Create Story"];

  const tabContentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 px-4 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      {/* Custom Tabs */}
      <div className="flex justify-center gap-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border 
              ${
                activeTab === index
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Box */}
      <div className="min-h-[300px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabContentVariants}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 0 && <CategoryTab />}
            {activeTab === 1 && <StoryTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
