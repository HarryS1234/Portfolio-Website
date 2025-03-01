"use client";

import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { ModeToggle } from "./theme-mode";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-[#3182ce] dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between w-full items-center h-16">
          <Link href="/">
            <div className="text-white text-xl hover:text-2xl font-bold">My Portfolio</div>
          </Link>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex justify-center items-center gap-8">
            {navItems.map((item, index) => (
              <Link key={index} href={item.path}>
                <li className="text-white font-semibold text-lg cursor-pointer relative group">
                  {item.name}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-white transition-all duration-300 group-hover:w-full" />
                </li>
              </Link>
            ))}
            <li><ModeToggle /></li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              className="text-white p-2 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <IoClose size={28} /> : <GiHamburgerMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-[#3182ce] dark:bg-gray-800 shadow-md rounded-b-lg flex flex-col py-3 md:hidden">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} onClick={toggleMenu} className="block">
                <div className="text-white text-center font-semibold hover:bg-blue-500 dark:hover:bg-gray-600 py-3 cursor-pointer">
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;