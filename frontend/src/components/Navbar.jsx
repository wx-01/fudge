import React from "react";

const navItems = [
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
  { name: "Gallery", href: "/gallery" },
];

const Navbar = () => {
  return (
    <nav
      className={`fixed w-screen z-40 bg-transparent rounded-b-xl pt-5 px-5 md:px-10`}
    >
      <div className="container flex items-center justify-between px-0 border-t-3 border-t-fudge-500">
        <a
          className="text-3xl text-fudge-500 agbalumo-regular font-bold flex items-center p-3 pt-1 border-t-0 border-3 border-fudge-500 rounded-b-2xl hover:text-white hover:bg-fudge-500 transition-all ease-in-out duration-300"
          href="/"
        >
          <h1 className="">FUDGE</h1>
        </a>

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
        <div className="flex md:hidden">
          <button className="text-3xl text-fudge-500 agbalumo-regular font-bold flex items-center p-3 pt-1 border-t-0 border-3 border-fudge-500 rounded-b-2xl hover:text-white hover:bg-fudge-500 transition-all ease-in-out duration-300"></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
