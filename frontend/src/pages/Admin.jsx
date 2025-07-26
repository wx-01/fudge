import { useState } from "react";
import MenuSection from "../components/Admin/MenuSection.jsx";
import ReservationSection from "../components/Admin/ReservationSection.jsx";
import FeaturedSection from "../components/Admin/FeaturedSection.jsx";

const sidebarItems = ["Menu", "Reservations", "Featured section"];

const Admin = () => {
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
};

export default Admin;
