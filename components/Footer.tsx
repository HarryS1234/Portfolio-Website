"use client";

import Link from "next/link";
import React from "react";
import { FaGithub,FaLinkedin } from "react-icons/fa"; // Example social icons

const Footer = () => {
  const footerItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { name: "GitHub", path: "https://github.com/HarryS1234", icon: <FaGithub size={24} /> },
    { name: "LinkedIn", path: "https://www.linkedin.com/in/hargobind1234/", icon: <FaLinkedin size={24} /> },
  ];

  return (
    <footer className="bg-[#3182ce] dark:bg-gray-800  text-white w-full py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Footer Navigation */}
          <ul className="flex flex-col md:flex-row justify-center items-center gap-6">
            {footerItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <li className="font-semibold text-lg cursor-pointer hover:text-gray-200  dark:hover:bg-gray-600 transition-colors duration-200">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.path}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition-colors duration-200"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-sm font-light">
          &copy; {new Date().getFullYear()} My Portfolio. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;