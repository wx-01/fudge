import React, { useRef, useEffect } from "react";

const HeroSection = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let scrollSpeed = 1; // Adjust speed here

    const scroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += scrollSpeed;

        // Reset scroll position for infinite loop
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  return (
    <div className="flex  flex-row justify-center  items-center h-full text-white font-bold">
      <div
        ref={scrollRef}
        className="w-full overflow-hidden whitespace-nowrap absolute"
        style={{ display: "flex" }}
      >
        <img
          src="/images/hero.PNG"
          alt="bg1"
          className="w-full object-cover"
          style={{ flexShrink: 0 }}
        />
        <img
          src="/images/hero.PNG"
          alt="bg2"
          className="w-full object-cover"
          style={{ flexShrink: 0 }}
        />
      </div>
      {/*try to make this bg-image an auto scroll type ,,,will work on that later */}
      {/* <div className="p-2 mt-5 md:mr-18 lg:mr-25 z-20">
        <h1 className="text-4xl md:text-5xl lg:text-7xl text-text-primary text-shadow-lg text-wrap">
          Sweet moments, freshly baked with
          <span className=" text-fudge-800"> love</span>
        </h1>
        <p className="ml-3 mt-5 mb-10 text-lg md:text-4xl text-fudge-200">
          We are the best in town
        </p>
      </div>
      <img
        src="../../images/coffe.png"
        className="h-full  right-2  top-15   object-cover z-20"
      ></img> */}
    </div>
  );
};

export default HeroSection;
