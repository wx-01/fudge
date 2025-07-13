import React, { useEffect, useState } from "react";
import { AlignJustify, MenuIcon, X } from "lucide-react";

const navItems = [
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed w-screen z-40 bg-transparent rounded-b-xl px-5 md:px-10 transition-all duration-300 ${
        isScrolled ? `pt-0  ${!isMenuOpen ? "backdrop-blur-md" : ""} ` : "pt-5"
      }`}
    >
      <div className="container flex items-center justify-between px-0 border-t-3 border-t-fudge-500">
        <a
          className="text-3xl text-fudge-500 agbalumo-regular font-bold flex items-center p-3 pt-1 border-t-0 border-3 border-fudge-500 rounded-b-2xl hover:text-white hover:bg-fudge-500 transition-all ease-in-out duration-300"
          href="/"
        >
          <h1 className="">FUDGE</h1>
        </a>
        {/*desktop navbar*/}
        <div className="hidden md:flex space-x-2 md:space-x-8 pr-4 md:pr-6 py-0 translate-y-[-8%]">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className=" md:text-xl text-fudge-500 agbalumo-regular font-bold flex items-center p-3 pt-1 border-t-0 border-3 border-fudge-500 rounded-b-2xl hover:text-white hover:bg-fudge-500 transition-all ease-in-out duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
        {/*mobile navbar*/}

        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`flex md:hidden text-3xl text-fudge-500 agbalumo-regular font-bold items-center p-3 pt-1 rounded-b-2xl hover:text-white hover:bg-fudge-500 transition-all ease-in-out duration-100 translate-y-[-15%] z-50  ${
            isMenuOpen ? "" : " border-t-0 border-3 border-fudge-500"
          }`}
        >
          {isMenuOpen ? <X /> : <MenuIcon />}{" "}
        </button>

        <div
          className={`fixed top-0 left-0 w-full h-screen z-40 bg-background/60 flex flex-col items-center justify-center transition-opacity  duration-300 ease-in-out
            will-change-[transform,opacity] ${
              isMenuOpen
                ? "opacity-100 translate-y-0 pointer-events-auto visible"
                : "opacity-0 -translate-y-2 pointer-events-none invisible"
            }`}
        >
          <div className="flex flex-col space-y-8 text-xl">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
