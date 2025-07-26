import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryTab from "../components/Admin/CategoryTab.jsx";
import StoryTab from "../components/Admin/Itme.jsx";
import MenuSection from "../components/Admin/MenuSection.jsx";
import ReservationSection from "../components/Admin/ReservationSection.jsx";
import FeaturedSection from "../components/Admin/FeaturedSection.jsx";

const sidebarItems = ["Menu", "Reservations", "Featured section"];

export default function AdminTabsPanel() {
  // const [activeTab, setActiveTab] = useState(0);

  // const tabs = ["Create Category", "Create Story"];

  // const tabContentVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: { opacity: 1, y: 0 },
  //   exit: { opacity: 0, y: -20 },
  // };

  // return (
  //   <div className="w-full max-w-4xl mx-auto px-4 space-y-8 pt-20">
  //     <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-fudge-500">
  //       Admin Dashboard
  //     </h1>

  //     {/* Custom Tabs */}
  //     <div className="flex justify-center gap-4">
  //       {tabs.map((tab, index) => (
  //         <button
  //           key={index}
  //           onClick={() => setActiveTab(index)}
  //           className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
  //             ${
  //               activeTab === index
  //                 ? "bg-blue-600 text-white border-blue-600 shadow-md"
  //                 : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
  //             }
  //           `}
  //         >
  //           {tab}
  //         </button>
  //       ))}
  //     </div>

  //     {/* Content Box */}
  //     <div className="min-h-screen bg-white dark:bg-blue-100 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow">
  //       <AnimatePresence mode="wait">
  //         <motion.div
  //           key={activeTab}
  //           initial="hidden"
  //           animate="visible"
  //           exit="exit"
  //           variants={tabContentVariants}
  //           transition={{ duration: 0.4 }}
  //         >
  //           {activeTab === 0 && <CategoryTab />}
  //           {activeTab === 1 && <StoryTab />}
  //         </motion.div>
  //       </AnimatePresence>
  //     </div>
  //   </div>
  // );

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div className="pt-20 w-full h-full flex ">
      {/* sidebar */}
      <div className="h-full w-30  md:w-40 lg:w-70 xl:w-90 flex flex-col transition-all duration-300 border-3 border-fudge-500 rounded-md">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className=" text-black w-full md:text-2xl xl:text-3xl  agbalumo-regular"
            onClick={() => setActiveTabIndex(index)}
          >
            <div
              className={`p-2 lg:p-3 xl:p-4 hover:py-4 hover:bg-blue-200 hover:text-3xl xl:hover:text-4xl cursor-pointer border-b-3 border-fudge-500  transition-all duration-300 ease-in-out
              ${activeTabIndex == item && "bg-blue-300"}`}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
      {/* Main section */}
      <div className="flex-1 p-4 ">
        {activeTabIndex === 0 && <MenuSection />}
        {activeTabIndex === 1 && <ReservationSection />}
        {activeTabIndex === 2 && <FeaturedSection />}
      </div>
    </div>
  );
}
