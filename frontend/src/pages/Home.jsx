import React from "react";
import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";

const Home = () => {
  return (
    <div className="h-75 sm:h-100  md:h-120 w-full relative pt-20">
      <HeroSection />
      <AboutUsSection />
    </div>
  );
};

export default Home;
